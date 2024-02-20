"use server";

import { randomUUID } from "crypto";
import { fileBoxesCollection } from "@/db/mongoDb";
import type { CreateFileBoxFormData } from "@/api/schemas";

export const dbCreateFileBox = async (
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
