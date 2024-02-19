import { z } from "zod";

const readonlyNonEmptyString = z.string().min(1).readonly();

export const createFileBoxFormData = z.object({
  title: readonlyNonEmptyString,
  description: readonlyNonEmptyString,
  file: z.instanceof(File)
});
export type CreateFileBoxFormData = z.infer<typeof createFileBoxFormData>;

export interface FileBox {
  readonly title: string;
  readonly description: string;
  readonly storageFilename?: string;
}
