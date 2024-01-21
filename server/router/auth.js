const express = require("express");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const route = express.Router();

// data Model
const { User } = require("../models/user");
const CONSTS = require("../config/const");

// mail confing
const { stmpTransport } = require("../config/email");

route.post("/sign", async (req, res) => {
  // 회원가입 할때 필요한 정보들을 client 에서 가져옴

  const user = new User(req.body);
  user.level = CONSTS.USER_LEVEL_REGISTER;

  const result = await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "회원가입에 성공하셨습니다.",
      });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});

// email 발송 
route.put("/emailVerify", async (req, res) => {
  console.log("verify");
  const token = crypto.randomBytes(20).toString("hex");
  const expires = new Date();
  expires.setHours(expires.getHours() + 24); // 24시간 후 만료.

  const { email } = req.body; 

  const mailOptions = {
    from: "dudrhkd1319@naver.com",
    to: "dudrhkd1319@naver.com",
    subject: "Verify your email address",
    html: `<p> 하단 링크를 클릭하여 이메일을 인증하여 주세요. </p>
              <P> <a href="http://localhost:5000/api/auth/emailAuth/?email=${email}&token=${token}">Verify email</a></p>
              <p> 해당 이메일은 ${expires}에 만료됩니다.</p>`,
  };

  stmpTransport.sendMail(mailOptions, (err, response) => {

    if (err) {
      res.json({ result: false, message: "메일 전송에 실패하였습니다." });
      stmpTransport.close();
      return;
    } else {
      User.updateOne({ email: email }, { token: token, tokenExp: expires })
          .then((result) => {
            console.log('update succ', result);
          })
          .catch((err) => {
            console.log('update err', err)
          });
      res.json({ result: true, message: "메일 전송에 성공하였습니다. " });
      stmpTransport.close();
      return;
    }
  });
});

// 링크 email 인증 
route.get("/emailAuth", async (req, res) => {
  // param 설정 
  const { email, token } = req.query;
  const expires = new Date();

  // user email 조회
  console.log(email);
  const findUser = await User.findOne({ email });
  console.log('email-auth >>>>>>>>>>', findUser);
  console.log('email-auth >>>>>>>>>>', findUser.token);


  // 링크 유효기간이 남았을 경우, 인증성공 
  if (findUser?.tokenExp > expires) {
    // token 값이 같으면 인증성공 
    if(findUser.token === token) {
      console.log('email-auth >>>>>>>>>>update');
      User.updateOne({ email: email }, { level : CONSTS.USER_LEVEL_REGULAR })
        .then ((result => {
          res.write("<script>alert('verity-success')</script>");
          res.write("<script>window.location=\"http://localhost:3000\"</script>");
        }));
    } else { 
      res.status(200).redirect('http://localhost:3000/email-auth');
    }
     
  } else {
    res.write("<script>잘못된 접근입니다.('success')</script>");
    res.status(200).redirect('http://localhost:3000/email-auth');
  }
});

// login
route.post("/login", async (req, res) => {
  const user = new User(req.body);

  // 요청된 id가 dababase에 존재하는지 확인
  console.log(req.body);
  const findUser = await User.findOne({ email: req.body.email });

  // findOne 값 없을 시 null
  if (findUser === null) {
    return res.json({
      loginSucces: false,
      message: "제공된 이메일에 해당하는 유저가 없습니다.",
    });
  }

  // 요청된 id와 비밀번호가 맞는지 확인
  findUser.comparePassword(req.body.password, (err, isMatch) => {
    console.log(req.body);
    if (!isMatch)
      return res.json({
        loginSucces: false,
        message: "비밀번호가 틀렸습니다.",
      });

    // 비밀번호 맞다면 토큰 생성
    const accessToken = findUser.getAccessToken(user);
    const refreshToken = findUser.getRefreshToken(user);

    res.cookie("accessToken", accessToken, {
      secure: false,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      secure: false,
      httpOnly: true,
    });

    res.status(200).json({
      resultMsg: "login Succes",
      userData: { email: findUser.email , name: findUser.name, level : findUser.level },
    });
  });
});

// logout구현
route.post("/logout", async (req, res) => {
  try {
    console.log('logout');
    res.cookie("accessToken", "");
    res.cookie("refreshToken", "");
    res.status(200).json("Logout Success");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = route;
