const express = require("express");
const route = express.Router();
const dayjs = require("dayjs");

const { authValidator } = require("../middleware/auth");

// data Model
const { User } = require("../models/user");
const { Post } = require("../models/post");
const { Bookmark } = require("../models/bookmark");

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

// 프로필 수정
route.post("/create", authValidator, async (req, res) => {
  const user = new User(req.userInfo);
  await user.updateOne({
    profileIntro: req.body.profileIntro
  }).then(() => {
    res.status(200).json({
      success: true,
      message: "프로필이 수정 되었습니다.",
    });
  }).catch((err) => {
    res.json({ success: false, err });
  });
});


// mypage bookmark
route.get("/mypageBookmark", authValidator, async (req, res) => {
  // authValidator에서 req에 userInfo 저장
  const userInfo = req.userInfo;

  // 유저정보 확인
  let userBookmark = await Bookmark.aggregate([
    {
      $match: {
        bookmarkType: "1",  //  bookmark 목록
        userEmail: userInfo.email,
      },
    },
    {
      $lookup: {
        from: "bookmarks",
        let: { bookmark_id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$$bookmark_id", "$_bookmarkTypeId"] }],
              },
            },
          },
          {
            $project: {
              _id: 0,
              _postId: 1,
            },
          },
        ],
        as: "bookmark",
      },
    },
  ]).catch((err) => {
    res.json({ success: false, err });
  });

  let bookmarkImgLst = [];

  for (let i = 0; i < userBookmark.length; i++) {
    if (userBookmark[i].bookmark.length > 0) {

      let srachOpt = [];

      for (let j = 0; j < 4; j ++) {
        srachOpt.push(userBookmark[i].bookmark.pop()?._postId);
      }

      userBookmark[i].bookmark.push(await Post.find({ _id : {$in : srachOpt} }, { imgList : 1}));
    }
  }


  res.status(200).json({
    success: true,
    bookmarkAry: userBookmark,
    bookmarkImgLst : bookmarkImgLst
  });
});

module.exports = route;
