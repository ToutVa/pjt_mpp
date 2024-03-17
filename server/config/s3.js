const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const uuid = require("uuid4");

const {
  S3_BUCKET_ACCESS_KEY,
  S3_BUCKET_SECRET_KEY,
  S3_BUCKET_REGION,
  S3_BUCKET_NAME,
} = require("../config/dev");

// AWS config update
AWS.config.update({
  region: S3_BUCKET_REGION,
  accessKeyId: S3_BUCKET_ACCESS_KEY,
  secretAccessKey: S3_BUCKET_SECRET_KEY,
});

// s3 클라이언트 연결
const s3 = new AWS.S3();

// AWS S3 업로드 스토리지 설정 
const storage = multerS3({
  s3,
  acl : 'public-read-write',
  bucket : S3_BUCKET_NAME,
  contentType : multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, cb) => {
    const uid = uuid();
    const day = new Date();
    const dayPath = day.getFullYear()
                 +'/' + ('0' + (day.getMonth() + 1)).slice(-2) 
                 +'/' + ('0' + day.getDate()).slice(-2);

    // 파일이름 생성 및 정보 반환
    cb(null, `${dayPath}/${uid}_${file.originalname}`);
  },
  transform : function (req, file, cb) {
    cb(null, sharp().resize(100,100));
  }
});

const limits = {
  fileSize : 10 * 1024 * 1024,  // 최대 10MB 파일 업로드 허용
}

const upload = multer({
  storage,
  limits // 최대 10MB 파일 업로드 허용
}); // 여러 파일 업로드를 지원하는 `multer.array()` 사용

// S3에서 이미지 삭제
const deleteImage = (fileKey) => {
  s3.deleteObject(
    {
      Bucket: '${버킷이름}',
      Key: fileKey,
    },
    (err, data) => {
      if (err) {
        throw err;
      } else {
        console.log('Image Deleted');
      }
    }
  );
};

module.exports = {
  upload,
  deleteImage
};
