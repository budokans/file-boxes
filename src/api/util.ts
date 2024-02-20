"use server";

import type { ZodType, ZodTypeDef } from "zod";
import { randomUUID } from "crypto";

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

export const bucketFilename = (filename: string): string =>
  `${randomUUID()}.${filename.slice(filename.lastIndexOf(".") + 1)}`;
