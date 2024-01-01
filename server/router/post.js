const express = require('express');
const route   = express.Router();
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const { authValidator } = require('../middleware/auth');

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
route.post('/create', upload.single('file'), async (req, res) => {
  const post = new Post(JSON.parse(req.body.fileInfo));
  
  const result = await post.save().then(() => {
    res.status(200).json({
        success : true
      , message : "게시물이 저장되었습니다."
    })
  }).catch((err) => {
    res.json({success : false, err})
  })

  // res.json({
  //   url: `/img/${req.file.file}`
  // })
});

module.exports= route;