const express = require('express');
const route = express.Router();

// data Model 
const {User} = require("../models/user");

route.post('/sign', async (req, res) => { 
    // 회원가입 할때 필요한 정보들을 client 에서 가져옴
  
    const user = new User(req.body);
  
    const result = await user.save().then(() => {
        res.status(200).json({
          success : true
          , message : "회원가입에 성공하셨습니다."
        })
        }).catch((err) => {
          res.json({success : false, err})
        })
   
});
  
    
route.post('/login', async (req, res) => {
      const user = new User(req.body);
    
      // 요청된 id가 dababase에 존재하는지 확인
      const findUser = await User.findOne({ id : req.body.id});
      
      // findOne 값 없을 시 null
      if (findUser === null) {
        return res.json({loginSucces : false,
          message : "제공된 이메일에 해당하는 유저가 없습니다."});
      }
  
          
      // 요청된 id와 비밀번호가 맞는지 확인
      findUser.comparePassword(req.body.password, (err, isMatch) => {
        console.log(req.body);
        if (!isMatch) 
          return res.json({loginSucces : false, message : "비밀번호가 틀렸습니다."});
        
        // 비밀번호 맞다면 토큰 생성
        const accessToken = findUser.getAccessToken(user);
        const refreshToken = findUser.getRefreshToken(user);

        res.cookie("accessToken", accessToken, {
          secure : false,
          httpOnly : true,
        });

        res.cookie("refreshToken", refreshToken, {
          secure : false,
          httpOnly : true,
        });

        res.status(200).json({
          resultMsg : "login Succes",
          userData : {id : findUser.id, name : findUser.name, email : findUser.email}
        });
  
      })
  });
  
  // logout구현 
  route.post('/logout', async (req, res) => {
      try {
        res.cookie('accessToken', '');
        res.cookie('refreshToken', '');
        res.status(200).json("Logout Success");
      } catch (err) {
        res.status(500).json(err);
      }
  });


  module.exports= route;