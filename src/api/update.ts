"use server";

import { revalidatePath } from "next/cache";
import { updateFileBoxFormData } from "@/api/schemas";
import {
  type FormActionState,
  parsedOrThrow,
  bucketFilename
} from "@/api/util";
import { dbUpdateFileBox } from "@/db/update";
import { uploadToS3 } from "@/db/s3";

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
