const express = require("express");
const route = express.Router();

const { authValidator } = require("../middleware/auth");

// data Model
const { Comment } = require("../models/comment");


/**
 * 게시글 comment 조회
 * param  : 게시글 id
 * return : 게시글 목록
 */

route.get("/", async(req,res) => {

    const _postId = req.body._postId;

    const commentJson = await Comment.find({_postId : _postId})
        .catch((err) => {
            res.json({result : false, message : err});
    });



});

/**
 * 게시글 comment 생성 api
 * param  : 게시글 id
 * return : 게시글 목록
 */
route.post("/create", authValidator, async(req, res) => {

    const data = req?.body;

    console.log(req.body);

    const comment = new Comment(data);

    const result = await comment.save().then(() => {
        res.status(200).json({
            result : true,
            message : "댓글이 등록되었습니다."
        });
    }).catch((err) => {
        res.json({result : false
                , message : err});
    })
});


module.exports = route;
