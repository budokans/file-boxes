"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { fileBoxesCollection } from "@/db/mongoDb";
import { s3 } from "@/db/s3";
import { CreateFileBoxFormData, createFileBoxFormData } from "@/api/schemas";
import { bucketNameOrThrow } from "@/db/util";
import { type FormActionState, parsedOrThrow } from "@/api/util";

export const createFileBox = async (
  _: FormActionState,
  formData: FormData
): Promise<FormActionState> => {
  try {
    const parsedData = parsedOrThrow(
      {
        title: formData.get("title"),
        description: formData.get("description"),
        file: formData.get("file")
      },
      createFileBoxFormData
    );

    const filename = bucketFilename(parsedData.file.name);
    await uploadToS3(parsedData.file, filename);
    await dbCreateFileBox(parsedData, filename);

    return {
      success: true,
      message: "Successfully uploaded to bucket."
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Create new File Box failed."
    };
  }
};

const dbCreateFileBox = async (
  createData: CreateFileBoxFormData,
  bucketFilename: string
): Promise<void> => {
  const collection = await fileBoxesCollection();

  await collection.insertOne({
    _id: randomUUID(),
    title: createData.description,
    description: createData.description,
    storage_file_name: bucketFilename,
    created_at: new Date().toISOString(),
    updated_at: null,
    deleted_at: null
  });
};

const uploadToS3 = async (
  file: File,
  bucketFilename: string
): Promise<void> => {
  const bucketName = bucketNameOrThrow();
  const s3Client = s3();

  const fileData = await new Response(file).arrayBuffer();
  const buffer = Buffer.from(fileData);

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: bucketFilename,
      Body: buffer,
      ContentType: file.type,
      ContentLength: file.size
    })
  );
};

const bucketFilename = (filename: string): string =>
  `${randomUUID()}.${filename.slice(filename.lastIndexOf(".") + 1)}`;
