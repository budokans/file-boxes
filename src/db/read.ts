"use server";

import { fileBoxesCollection } from "@/db/mongoDb";
import type { FileBoxRow } from "@/db/schemas";

export const allFileBoxes = async (): Promise<readonly FileBoxRow[]> => {
  const collection = await fileBoxesCollection();
  return await collection.find().toArray();
};
