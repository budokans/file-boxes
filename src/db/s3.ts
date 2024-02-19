import { S3Client } from "@aws-sdk/client-s3";

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
