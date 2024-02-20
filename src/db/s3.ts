"use server";

import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client
} from "@aws-sdk/client-s3";

const awsRegion = process.env["AWS_REGION"];
const accessKeyId = process.env["AWS_ACCESS_KEY_ID"];
const secretAccessKeyId = process.env["AWS_SECRET_ACCESS_KEY"];

export const s3 = (): S3Client => {
  if (!awsRegion) throw new Error("AWS_REGION not found");
  if (!accessKeyId) throw new Error("AWS_ACCESS_KEY_ID not found");
  if (!secretAccessKeyId) throw new Error("AWS_SECRET_ACCESS_KEY not found");

  return new S3Client({
    region: awsRegion,
    credentials: {
      accessKeyId,
      secretAccessKey: secretAccessKeyId
    }
  });
};

export const bucketNameOrThrow = (): string => {
  const bucketName = process.env["AWS_BUCKET_NAME"];
  if (!bucketName) throw new Error("AWS_BUCKET_NAME not found.");

  return bucketName;
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

export const s3File = async (filename: string): Promise<string> => {
  const bucketName = bucketNameOrThrow();

  const response = await s3().send(
    new GetObjectCommand({
      Bucket: bucketName,
      Key: filename
    })
  );

  if (!response.Body) throw new Error("No response body for S3 object found.");

  return await response.Body.transformToString();
};
