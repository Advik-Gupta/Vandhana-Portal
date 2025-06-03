import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

const s3 = new AWS.S3({
  endpoint: process.env.R2_ENDPOINT,
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

export const uploadToR2 = async (fileBuffer, customFileName, mimeType) => {
  const params = {
    Bucket: process.env.R2_BUCKET,
    Key: customFileName,
    Body: fileBuffer,
    ContentType: mimeType,
  };

  await s3.putObject(params).promise();

  const fileUrl = `${process.env.R2_PUBLIC_URL}/${customFileName}`;
  return fileUrl;
};
