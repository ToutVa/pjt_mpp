const express = require('express');
const route   = express.Router();
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const { authValidator } = require('../middleware/auth');
const dayjs = require('dayjs');
const { getSignedFileUrl } = require('../config/s3');

// data Model 
const {Post} = require("../models/post");

route.get('/', authValidator, async (req,res) => {
    let postJson;
    postJson = await Post.find({}).catch((err) => {
        res.json({success : false, err});
    });
    
    res.status(200).json({
        success : true,
        post : postJson
    })
})

route.post('/', authValidator, async (req,res) => {
  let postJson;
  let filter = {};
  if(req.body.lastId !== undefined) {
    filter._id = { $gt: req.body.lastId};
  }

  console.log("post");
  postJson = await Post.find(filter).limit(10).catch((err) => {
      res.json({success : false, err});
  });
  
  res.status(200).json({
      success : true,
      post : postJson
  })
})

route.post("/guestFeed", async (req,res) => {
  let postJson;
  let filter = {};
  if(req.body.lastId !== undefined) {
    filter._id = { $gt: req.body.lastId};
  }

  console.log("guestPost");
  postJson = await Post.find(filter).limit(10).catch((err) => {
      res.json({success : false, err});
  });
  
  res.status(200).json({
      success : true,
      post : postJson
  })
});

// fileurl 설정 
route.post('/getFileUrl', async(req,res) => {
  try {
    console.log(req.body);
    let {name, type} = (req.body);

    console.log(name,type);

    const fileParams = {
      name : name,
      type : type
    };

    console.log(name,type)

    const singedUrl = await getSignedFileUrl(fileParams);
    console.log(singedUrl);

    return (res.status(201).json({
      message : 'make url succed',
      url : singedUrl
    }))
  } catch(e) {
    return res.status(500).json({
      message : 'make url failed',
    });
  }
});

// 파일이 저장될 폴더 생성
fs.readdir('uploads', (error) => {
  if(error){
    console.log('uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req,file,cb){
      cb(null, 'uploads/');
    },
    filename(req,file,cb){
      console.log(file);
      const newFileName = file.originalname;
      cb(null, newFileName);
    }
  }),
  limits: {
    fileSize: 5*1024*1024
  }
});

// 게시글 생성
// upload.fields([{name:'file', maxCoutn :10}])
// upload.array('file', 10)
// upload.single('file')
route.post('/create', authValidator, upload.fields([{name:'file', maxCount :10}]), async (req, res) => {
  console.log("req.body =>", req.body);

  // 이용자 Email, 등록일시 셋팅
  const post = new Post(JSON.parse(req.body.fileInfo));
  const d = dayjs();

  post.userEmail  = req.userInfo.email;
  post.registDate = d.format('YYYY/MM/DD HH:mm:ss');
  
  // 저장
  const result = await post.save().then(() => {
    res.status(200).json({
        success : true
      , message : "게시물이 저장되었습니다."
    })
  }).catch((err) => {
    res.json({success : false, err})
  })
});

module.exports= route;