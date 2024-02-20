import type { ZodType, ZodTypeDef } from "zod";

export interface FormActionState {
  readonly success: boolean;
  readonly message: string;
}

export const parsedOrThrow = <
  Input,
  Output,
  Def extends ZodTypeDef = ZodTypeDef
>(
  rawData: unknown,
  zodSchema: ZodType<Output, Def, Input>,
  errorMessage?: string
): Output => {
  const parsed = zodSchema.safeParse(rawData);
  if (!parsed.success) {
    throw new Error(errorMessage ?? parsed.error.message);
  }

  return parsed.data;
};

export const downloadFile = (file: File, filename: string): void => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
