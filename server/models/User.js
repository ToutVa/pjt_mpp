const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  // _id 부분은 기본적으로 생략. 알아서 Object.id를 넣어줌
  id : {
    type : String,
    maxlength : 50
  },
  password : {
    type : String,
    maxlength : 100
  },
  name: {
    type: String,
    required: true, // null 여부
  },
  age: {
    type: Number,
    required: true,
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

userSchema.method('test', function(test, cb) {
  console.log('test');
});

userSchema.method('comparePassword', function(plainPassword, cb) {
  console.log(plainPassword, this);
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch);
  })
});

userSchema.method('generateToken', function (cb) {

  let user = this;

  // jwt token
  const token = jwt.sign(user._id.toHexString(), 'sercretToken');

  user.token = token;
  user.save().then(() => {
    cb(null,user);
  }).catch((err) => {
    return cb(err);
  })
});



const User = mongoose.model('User', userSchema);

module.exports = {User} 