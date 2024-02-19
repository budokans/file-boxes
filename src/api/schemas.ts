import { z } from "zod";

const readonlyNonEmptyString = z.string().min(1).readonly();

export const createFileBoxFormData = z.object({
  title: readonlyNonEmptyString,
  description: readonlyNonEmptyString,
  file: z.instanceof(File)
});
export type CreateFileBoxFormData = z.infer<typeof createFileBoxFormData>;
