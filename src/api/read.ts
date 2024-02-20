"use server";

import type { FileBox } from "@/api/schemas";
import { allFileBoxes } from "@/db/read";
import type { FileBoxRow } from "@/db/schemas";

export const getAllFileBoxes = async (): Promise<
  readonly FileBox[] | Error
> => {
  try {
    const dbRows = await allFileBoxes();

    return dbRows.filter(fileBoxIsNotDeleted).map(
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
