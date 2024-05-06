const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path");
const { authValidator } = require("../middleware/auth");
const dayjs = require("dayjs");
const { upload, deleteImage } = require("../config/s3");

// data Model
const { Post } = require("../models/post");

route.get("/", authValidator, async (req, res) => {
  let postJson;
  postJson = await Post.find({}).catch((err) => {
    res.json({ success: false, err });
  });

  res.status(200).json({
    success: true,
    post: postJson,
  });
});

/**
 * 게시글 조회 api
 * param  : 게시글 id
 * return : 게시글 목록
 */
route.post("/", authValidator, async (req, res) => {
  let postJson;
  let filter = {};
  let limitCnt = 10;

  if (req.body.lastId !== undefined) {
    filter._id = { $lt: req.body.lastId };
  }

  if (req.body.myFeedYn) {
    limitCnt = 15;
    filter.userEmail = req.userInfo.  email;
  }

  postJson = await Post.aggregate([
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "_postId",
        as: "likes",
      },
    },
    { $sort: { registDate: -1 } },
    { $limit: limitCnt },
  ]);

  res.status(200).json({
    success: true,
    post: postJson,
  });
});

/**
 * 게시글 상세조회 api
 * param  : 게시글 id
 * return : 게시글 목록
 */
route.post("/getPostDtl", authValidator, async (req, res) => {
  let postJson;
  let filter = {};
  console.log(">>>>", req);
  if (req.body.id !== undefined) {
    filter._id = req.body.id;
    postJson = await Post.find(filter)
      .sort({ registDate: -1 })
      .limit(10)
      .catch((err) => {
        res.json({ success: false, err });
      });
    res.status(200).json({
      success: true,
      post: postJson,
    });
  } else {
    res.status(503).json({
      success: true,
      post: postJson,
    });
  }
});

/**
 * 게시글 조회 api
 * 권한이 없는 사용자가 게시글을 조회할 때 사용된다.
 * param  : 게시글 id
 * return : 게시글 목록
 */
route.post("/guestFeed", async (req, res) => {
  let postJson;
  let filter = {};
  if (req.body.lastId !== undefined) {
    filter._id = { $gt: req.body.lastId };
  }

  console.log("guestPost");
  postJson = await Post.find(filter)
    .limit(10)
    .catch((err) => {
      res.json({ success: false, err });
    });

  res.status(200).json({
    success: true,
    post: postJson,
  });
});

// 게시글 생성
route.post(
  "/create",
  authValidator,
  upload.array("image"),
  async (req, res) => {
    console.log("req.body =>", req.body);

    console.log("req.files =>", req.files);

    console.log(req.body.imgMeta);

    // 이용자 Email, 등록일시 셋팅
    const post = new Post(JSON.parse(req.body.fileInfo));
    const d = dayjs();

    post.userEmail = req.userInfo.email;
    post.registDate = d.format("YYYY/MM/DD HH:mm:ss");

    const metaAry = req.body.imgMeta;
    const fileAry = req.files;

    for (let i = 0; i < fileAry.length; i++) {
      const meta = JSON.parse(metaAry[i]);
      if ((meta.fileName = fileAry[i]?.originalname)) {
        fileAry[i] = Object.assign(fileAry[i], meta);
      }
    }

    console.log(fileAry);

    // 저장
    post.imgList = fileAry;

    const result = await post
      .save()
      .then(() => {
        res.status(200).json({
          success: true,
          message: "게시물이 저장되었습니다.",
        });
      })
      .catch((err) => {
        res.json({ success: false, err });
      });
  }
);

module.exports = route;
