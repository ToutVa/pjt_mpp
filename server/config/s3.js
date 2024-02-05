// s3 접근하기 위해 불러옴
const { S3Client
      , PutObjectCommand
      , GetObjectCommand
      , DeleteObjectCommand} = require ('@aws-sdk/client-s3');

      // presigned url 이용하기 위해 불러옴
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { S3_BUCKET_ACCESS_KEY
    , S3_BUCKET_SECRET_KEY
    , S3_BUCKET_REGION
    , S3_BUCKET_NAME
} = require("../config/dev");

  // s3 클라이언트 연결
  const s3 = new S3Client({
    credentials: {
      accessKeyId: S3_BUCKET_ACCESS_KEY,
      secretAccessKey: S3_BUCKET_SECRET_KEY,
    },
    region: S3_BUCKET_REGION,
  });
  
  // file signedUrl 가져오기
  async function getSignedFileUrl(data) {
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: data.name,
    };
    const command = new PutObjectCommand(params);
    const url = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });
    return url;
  }
  
  // 파일 업로드
  async function uploadFile(fileBuffer, fileName, mimetype) {
    const uploadParams = {
      Bucket: awsS3Bucket,
      Key: fileName,
      Body: fileBuffer,
      ContentType: mimetype,
    };
  
    const res = await s3.send(new PutObjectCommand(uploadParams));
    return res.$metadata.httpStatusCode;
  }

module.exports = {
    getSignedFileUrl,
    uploadFile
}