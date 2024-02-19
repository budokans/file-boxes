import type { FileBox } from "@/api/schemas";
import { fileBoxesCollection } from "@/db/mongoDb";

export const getAllFileBoxes = async (): Promise<
  readonly FileBox[] | Error
> => {
  try {
    const collection = await fileBoxesCollection();
    const fileboxRows = await collection.find().toArray();

    return fileboxRows.map(
      (fileBox): FileBox => ({
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
