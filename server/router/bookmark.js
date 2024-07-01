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

route.post("/getUsrBookmark", authValidator, async(req,res) => {
    console.log('북마크 조회')
    const email = req.userInfo.email;
    const bookmarkJson = await Bookmark.find({userEmail : email, bookmarkType : '1'})
        .catch((err) => {
            res.json({result : false, message : err});
    });

    console.log(req.body._postId);
    console.log(req.body);

    const selectedBookmark = await Bookmark.find({userEmail : email, bookmarkType : '2', _postId : req.body._postId})
        .catch((err) => {
            res.json({result : false, message : err});
    });


    console.log(bookmarkJson);
    console.log(selectedBookmark);
    res.status(200).json({
        success : true,
        bookmark : bookmarkJson,
        selectedBookmark : selectedBookmark
    });
});

/**
 * 게시글 bookmark 목록 생성 api
 * param  : 게시글 id
 * return : 게시글 목록
 */
route.post("/createBookMarkType", authValidator, async(req, res) => {

    const data = req?.body;
    const email = req.userInfo.email;
    const date = dayjs().format("YYYY/MM/DD HH:mm:ss");

    data.userEmail = email;
    data.registDate = date;
    data.bookmarkType = '1';


    const bookmark = new Bookmark(data);

    const result = await bookmark.save().then((e) => {
        console.log('북마크 타입 등록 : ', e);
        res.status(200).json({
            result : true,
            message : "북마크 타입 등록되었습니다.",
            data : e
        });
    }).catch((err) => {
        res.json({result : false
                , message : err});
    })
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
    data.bookmarkType = '2';
    data._postId = new ObjectId(data._postId);

    const bookmark = new Bookmark(data);

    const result = await bookmark.save().then((e) => {
        console.log('북마크  등록 : ', e);
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
