import { z } from "zod";

const readonlyNonEmptyString = z.string().min(1).readonly();

export const createFileBoxFormData = z.object({
  title: readonlyNonEmptyString,
  description: readonlyNonEmptyString,
  file: z.instanceof(File).optional()
});
export type CreateFileBoxFormData = z.infer<typeof createFileBoxFormData>;

export const updateFileBoxFormData = createFileBoxFormData.merge(
  z.object({ id: readonlyNonEmptyString })
);
export type UpdateFileBoxFormData = z.infer<typeof updateFileBoxFormData>;

export interface FileBox {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly storageFilename?: string;
}
