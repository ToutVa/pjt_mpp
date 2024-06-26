const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../config/dev");

const userSchema = new mongoose.Schema({
  // _id 부분은 기본적으로 생략. 알아서 Object.id를 넣어줌
  email: {
    type: String,
    required: true,
    maxlength: 30,
  },
  password: {
    type: String,
    maxlength: 100,
    required: true, // null 여부
  },
  name: {
    type: String,
    required: true, // null 여부
  },
  birth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    maxlength: 1,
  },
  cellPhone: {
    type: Number,
    required: true,
    maxlength: 11,
  },
  profilePicture: {
    type: Object,
  },
  profileIntro: {
    type: String,
  },
  level: {
    type: Number,
    require: true,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Date,
  },
});

userSchema.pre("save", function (next) {
  let user = this;

  if (user.isModified("password")) {
    // 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// 비밀번호 비교
userSchema.method("comparePassword", function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
});

// accessToken 생성
userSchema.method("getAccessToken", function () {
  let user = this;

  // jwt accessToken 생성
  const accessToken = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      level: user.level,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "30m", issuer: "pjtMpp" }
  );

  return accessToken;
});

// accessToken 생성
userSchema.method("getRefreshToken", function () {
  let user = this;

  // jwt accessToken 생성
  const refreshToken = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      level: user.level,
    },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "24h", issuer: "pjtMpp" }
  );

  return refreshToken;
});

// userId 가져오기
userSchema.method("getUserId", function (token) {
  console.log("this token", token);
  const userInfo = jwt.decode(this.token, ACCESS_TOKEN_SECRET);

  console.log("userinfo ;:", userInfo);

  return userInfo;
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
