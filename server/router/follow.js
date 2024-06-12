const express = require("express");
const route = express.Router();
const dayjs = require("dayjs");
const ObjectId = require("mongoose").Types.ObjectId;

const { authValidator } = require("../middleware/auth");

// data Model
const { Follow } = require("../models/follow");

/**
 * 팔로우 수 조회
 * param  : toUser
 * return : 팔로우 목록
 */

route.post("/getFollowCnt", async(req,res) => {
    const toUser = req.body.toUser;
    const fromUser = req.body.fromUser;

    const toUserCnt = await Follow.countDocuments({toUser : fromUser})
        .catch((err) => {
            res.json({result : false, message : err});
    }); // 팔로우 수

    const fromUserCnt = await Follow.countDocuments({fromUser : fromUser})
        .catch((err) => {
            res.json({result : false, message : err});
    }); // 팔로워 수

    const toFromUserCnt = await Follow.countDocuments({toUser : toUser , fromUser : fromUser})
        .catch((err) => {
            res.json({result : false, message : err});
    }); // 팔로우 여부

    res.status(200).json({
        success : true,
        toUserCnt : toUserCnt,
        fromUserCnt : fromUserCnt,
        toFromUserCnt : toFromUserCnt
    });
});


/**
 * 사용자가 팔로우 하는 유저들 조회(팔로우)
 * param  : toUser
 * return : 팔로우 목록
 */

route.post("/getFollow", async(req,res) => {
    const toUser = req.body.toUser;
    console.log(req.body.toUser)

    const commentJson = await Follow.find({toUser : toUser})
        .catch((err) => {
            res.json({result : false, message : err});
    });

    res.status(200).json({
        success : true,
        comments : commentJson
    });
});

/**
 * 사용자를 팔로우 하는 유저들 조회(팔로워)
 * param  : fromUser
 * return : 팔로우 목록
 */

route.post("/getFollower", async(req,res) => {
    const fromUser = req.body.fromUser;
    console.log(req.body.fromUser)

    const commentJson = await Follow.find({fromUser : fromUser})
        .catch((err) => {
            res.json({result : false, message : err});
    });

    res.status(200).json({
        success : true,
        comments : commentJson
    });
});

/**
 * 팔로우 생성 api
 * param  : toUser, fromUser
 * return : message
 */
route.post("/createFollow", authValidator, async(req, res) => {
    const data = req?.body;
    console.log(data);
    // const date = dayjs().format("YYYY/MM/DD HH:mm:ss");

    // data.registDate = date;
    data._followId = new ObjectId(data._followId);
    console.log(data);

    const follow = new Follow(data);

    const result = await follow.save().then((e) => {
        res.status(200).json({
            result : true,
            message : "팔로우되었습니다.",
            data : e
        });
    }).catch((err) => {
        res.json({result : false
                , message : err});
    })
});

/**
 * 팔로우 삭제 api
 * param  : toUser, fromUser
 * return : message
 */
route.post("/deleteFollow", authValidator, async(req, res) => {
    const data = req?.body;

    Follow.deleteOne(data).then((e) => {
        console.log('팔로우 삭제 : ', e);
        res.status(200).json({
            result : true,
            message : "팔로우가 삭제되었습니다."
        });
    }).catch((err) => {
        res.json({result : false
                , message : err});
    });

});


module.exports = route;
