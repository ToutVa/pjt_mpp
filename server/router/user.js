const express = require("express");
const route = express.Router();

// data Model
const { User } = require("../models/user");
const { Post } = require("../models/post");

route.get("/mypage", async (req, res) => {
  const token = req.cookies.accessToken;
  const userInfo = jwt.decode(token, ACCESS_TOKEN_SECRET);

  // 유저정보 확인
  const userPost = await Post.find({ id: userInfo.id });

  try {
    const findPost = await Post.find({ id: id });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = route;
