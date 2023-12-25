const express = require('express');
const { authValidator } = require('../middleware/auth');
const route = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const util = require('util');
const path = require('path');
const fs = require('fs');

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
    filename(req,res,cb){
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
    }
  }),
  limits: {
    fileSize: 5*1024*1024
  }
});

// 게시글 생성
route.post('/create', upload.single('img'), async (req, res) => {
  console.log('게시글 생성'+JSON.parse(req.body.fileInfo));

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