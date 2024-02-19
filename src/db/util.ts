export const bucketNameOrThrow = (): string => {
  const bucketName = process.env["AWS_BUCKET_NAME"];
  if (!bucketName) throw new Error("AWS_BUCKET_NAME not found.");

  return bucketName;
};
