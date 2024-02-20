"use server";

import { GetObjectCommand } from "@aws-sdk/client-s3";
import type { FileBox } from "@/api/schemas";
import { fileBoxesCollection } from "@/db/mongoDb";
import { s3 } from "@/db/s3";
import { bucketNameOrThrow } from "@/db/util";
import type { FileBoxRow } from "@/db/schemas";

export const getAllFileBoxes = async (): Promise<
  readonly FileBox[] | Error
> => {
  try {
    const collection = await fileBoxesCollection();
    const fileboxRows = await collection.find().toArray();

    return fileboxRows.filter(fileBoxIsNotDeleted).map(
      (fileBox): FileBox => ({
        id: fileBox._id,
        title: fileBox.title,
        description: fileBox.description,
        ...(fileBox.storage_file_name
          ? { storageFilename: fileBox.storage_file_name }
          : {})
      })
    );
  } catch (error) {
    console.error(error);
    return new Error("Sorry, we were unable to get your file boxes.");
  }
};

const fileBoxIsNotDeleted = (fileBox: FileBoxRow) =>
  fileBox.deleted_at === null;

export const s3File = async (filename: string): Promise<string> => {
  const bucketName = bucketNameOrThrow();

  const response = await s3().send(
    new GetObjectCommand({
      Bucket: bucketName,
      Key: filename
    })
  );

  if (!response.Body) throw new Error("No response body for S3 object found.");

  return await response.Body.transformToString();
};
