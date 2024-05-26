const express = require("express");
const route = express.Router();
const dayjs = require("dayjs");
const ObjectId = require("mongoose").Types.ObjectId;

const { authValidator } = require("../middleware/auth");

// data Model
const { Bookmark } = require("../models/bookmark");


/**
 * 게시글 bookmark 조회
 * param  : 게시글 id
 * return : 게시글 목록
 */

route.post("/getComment", async(req,res) => {

    const _postId = req.body._postId;
    console.log(req.body._postId)

    const commentJson = await Bookmark.find({_postId : _postId})
        .catch((err) => {
            res.json({result : false, message : err});
    });

    res.status(200).json({
        success : true,
        comments : commentJson
    });
});

/**
 * 게시글 bookmark 생성 api
 * param  : 게시글 id
 * return : 게시글 목록
 */
route.post("/create", authValidator, async(req, res) => {

    const data = req?.body;
    const email = req.userInfo.email;
    const date = dayjs().format("YYYY/MM/DD HH:mm:ss");

    data.userEmail = email;
    data.registDate = date;
    data._postId = new ObjectId(data._postId);
    console.log(data);

    const bookmark = new Bookmark(data);

    const result = await bookmark.save().then((e) => {
        res.status(200).json({
            result : true,
            message : "북마크 등록되었습니다.",
            data : e
        });
    }).catch((err) => {
        res.json({result : false
                , message : err});
    })
});

/**
 * 게시글 bookmark 삭제 api
 * param  : 게시글 id
 * return : 게시글 목록
 */
route.post("/delete", authValidator, async(req, res) => {

    const data = req?.body;
    const email = req.userInfo.email;

    data.userEmail = email;

    Bookmark.deleteOne(data).then((e) => {
        console.log('북마크 삭제 : ', e);
        res.status(200).json({
            result : true,
            message : "북마크 삭제되었습니다."
        });
    }).catch((err) => {
        res.json({result : false
                , message : err});
    });

});


module.exports = route;
