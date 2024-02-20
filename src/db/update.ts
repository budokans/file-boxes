"use server";

import { fileBoxesCollection } from "@/db/mongoDb";
import type { UpdateFileBoxFormData } from "@/api/schemas";

export const dbUpdateFileBox = async (
  updateData: UpdateFileBoxFormData,
  filename?: string
): Promise<void> => {
  const collection = await fileBoxesCollection();

  await collection.updateOne(
    { _id: updateData.id },
    {
      $set: {
        title: updateData.title,
        description: updateData.description,
        updated_at: new Date().toISOString(),
        ...(filename ? { storage_file_name: filename } : {})
      }
    }
  );
};
