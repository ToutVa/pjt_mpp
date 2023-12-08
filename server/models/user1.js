const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../config/dev');

const userSchema = new mongoose.Schema({
  // _id 부분은 기본적으로 생략. 알아서 Object.id를 넣어줌
  id : {
    type : String,
    maxlength : 50,
    required: true, // null 여부
  },
  password : {
    type : String,
    maxlength : 100,
    required: true // null 여부
  },
  name: {
    type: String,
    required: true, // null 여부
  },
  birth: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    maxlength : 1
  },
  cellPhone: {
    type: Number,
    required: true,
    maxlength : 11
  },
  email: {
    type: String,
    required: true,
    maxlength : 30
  },
  token : {
    type : String
  },
  tokenExp : {
    type : Number
  }
});

userSchema.pre('save', function(next) {
  let user = this;
  console.log(user)

  if(user.isModified('password')) {
    // 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) return next(err);
      
      bcrypt.hash(user.password, salt, function(err, hash){
        if(err) return next(err);
        user.password = hash;
        next()
      })
    })
  } else {
    next()
  }
})

userSchema.method('comparePassword', function(plainPassword, callback) {
  console.log(plainPassword, this);
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return callback(err);
    callback(null, isMatch);
  })
});

// accessToken 생성
userSchema.method('getAccessToken', function () {

  let user = this;

  // jwt accessToken 생성
  const accessToken = jwt.sign({
      id : user.id,
      name : user.name,
      email : user.email,
    }, 
    ACCESS_TOKEN_SECRET,
    { expiresIn : '1m',
      issuer : 'pjtMpp',
    }
  );

  return accessToken;
});

// accessToken 생성
userSchema.method('getRefreshToken', function () {

  let user = this;

  // jwt accessToken 생성
  const refreshToken = jwt.sign({
      id : user.id,
      name : user.name,
      email : user.email,
    }, 
    REFRESH_TOKEN_SECRET,
    { expiresIn : '24h',
      issuer : 'pjtMpp',
    }
  );

  return refreshToken;
});



const User = mongoose.model('User', userSchema);

module.exports = {User} 