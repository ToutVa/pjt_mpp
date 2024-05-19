const express = require("express");
const route = express.Router();

const { authValidator } = require("../middleware/auth");

// data Model
const { User } = require("../models/user");
const { Post } = require("../models/post");

// mypage api
route.get("/mypage", authValidator, async (req, res) => {
  // authValidator에서 req에 userInfo 저장
  const userInfo = req.userInfo;

  // 유저정보 확인
  const userPost = await Post.find({ id: userInfo.email }).catch((err) => {
    res.json({ success: false, err });
  });

  res.status(200).json({
    success: true,
    post: userPost,
  });
});

// mypage api
route.get("/myInfo", authValidator, async (req, res) => {
  // authValidator에서 req에 userInfo 저장
  const userInfo = req.userInfo;

  // 유저정보 확인
  const myInfo = await User.find({ email: userInfo.email }).catch((err) => {
    res.json({ success: false, err });
  });

  console.log(myInfo);

  res.status(200).json({
    success: true,
    info: myInfo,
  });
});

module.exports = route;
