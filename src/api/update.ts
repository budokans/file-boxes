"use server";

import { revalidatePath } from "next/cache";
import { fileBoxesCollection } from "@/db/mongoDb";
import {
  type UpdateFileBoxFormData,
  updateFileBoxFormData
} from "@/api/schemas";
import {
  type FormActionState,
  parsedOrThrow,
  bucketFilename,
  uploadToS3
} from "@/api/util";

export const updateFileBox = async (
  _: FormActionState,
  formData: FormData
): Promise<FormActionState> => {
  try {
    const parsedData = parsedOrThrow(
      {
        id: formData.get("id"),
        title: formData.get("title"),
        description: formData.get("description"),
        ...(formData.get("file") ? { file: formData.get("file") } : {})
      },
      updateFileBoxFormData
    );

    if (parsedData.file && parsedData.file.size > 0) {
      const filename = bucketFilename(parsedData.file.name);
      await uploadToS3(parsedData.file, filename);
      await dbUpdateFileBox(parsedData, filename);
    } else {
      await dbUpdateFileBox(parsedData);
    }

    revalidatePath("/");

    return {
      success: true,
      message: `Successfully updated File Box ${parsedData.title}`
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Updating File Box failed."
    };
  }
};

const dbUpdateFileBox = async (
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
