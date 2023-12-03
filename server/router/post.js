const express = require('express');
const { authValidator } = require('../middleware/auth');
const route = express.Router();

// data Model 
const {Post} = require("../models/Post");

route.get('/', authValidator, async (req,res) => {
    console.log('게시글 목록');
    let postJson;
    
    postJson = await Post.find({}).catch((err) => {
        res.json({success : false, err});
    });
    
    res.status(200).json({
        success : true,
        post : postJson
    })
})

// 게시글 생성
route.post('/create', async (req, res) => {
    console.log('게시글 생성'+req.body);
    const post = new Post(req.body);
  
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