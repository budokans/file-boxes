"use server";

import type { ZodType, ZodTypeDef } from "zod";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { s3 } from "@/db/s3";
import { bucketNameOrThrow } from "@/db/util";

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

export const uploadToS3 = async (
  file: File,
  bucketFilename: string
): Promise<void> => {
  const bucketName = bucketNameOrThrow();
  const s3Client = s3();

  const fileData = await new Response(file).arrayBuffer();
  const buffer = Buffer.from(fileData);

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: bucketFilename,
      Body: buffer,
      ContentType: file.type,
      ContentLength: file.size
    })
  );
};

export const bucketFilename = (filename: string): string =>
  `${randomUUID()}.${filename.slice(filename.lastIndexOf(".") + 1)}`;
