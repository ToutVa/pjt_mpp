const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { ACCESS_TOKEN_SECRET } = require("../config/dev");

const getUserEmail = async (email) => {
  const user = await User.findOne({ email });

  return user;
};

const getTokenVerify = (token) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (err) {
    return err.message;
  }
};

// accessToken 값 확인하기
const authValidator = async (req, res, next) => {
  // const token = req.headers['access-token'];
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({
      message: "Token required.",
    });
  }

  // 토큰 만료정보 확인
  const verifyToken = getTokenVerify(token);

  // access token 만료시
  if (verifyToken == "jwt expired") {
    const userInfo = jwt.decode(token, ACCESS_TOKEN_SECRET);

    // 유저정보 확인
    const findUser = await User.findOne({ id: userInfo.id });

    if (findUser === null) {
      return res.json({ resultMsg: err });
    }

    // refresh token 값 validate 설정
    // const refreshVerityToken = getTokenVerify(findUser.token);
    const refreshVerityToken = req.cookies.refreshToken;

    if (refreshVerityToken == "jwt expired") {
      res.cookie("accessToken", "");
      res.cookie("refreshToken", "");
      res.send({ err: "JWT EXPIRED" });
    } else {
      const accessToken = findUser.getAccessToken();
      res.cookie("accessToken", accessToken, {
        secure: false,
        httpOnly: true,
      });
    }
  }

  next();
};

module.exports = {
  getUserEmail,
  authValidator,
};
