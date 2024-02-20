"use server";

import { revalidatePath } from "next/cache";
import { createFileBoxFormData } from "@/api/schemas";
import {
  type FormActionState,
  parsedOrThrow,
  bucketFilename
} from "@/api/util";
import { dbCreateFileBox } from "@/db/create";
import { uploadToS3 } from "@/db/s3";

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
