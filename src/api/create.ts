"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { fileBoxesCollection } from "@/db/mongoDb";
import { CreateFileBoxFormData, createFileBoxFormData } from "@/api/schemas";
import {
  type FormActionState,
  parsedOrThrow,
  bucketFilename,
  uploadToS3
} from "@/api/util";

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

    if (parsedData.file && parsedData.file.size > 0) {
      const filename = bucketFilename(parsedData.file.name);
      await uploadToS3(parsedData.file, filename);
      await dbCreateFileBox(parsedData, filename);
    } else {
      await dbCreateFileBox(parsedData);
    }

    revalidatePath("/");

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
  bucketFilename?: string
): Promise<void> => {
  const collection = await fileBoxesCollection();

  await collection.insertOne({
    _id: randomUUID(),
    title: createData.title,
    description: createData.description,
    storage_file_name: bucketFilename ?? null,
    created_at: new Date().toISOString(),
    updated_at: null,
    deleted_at: null
  });
};
