const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const postSchema = new mongoose.Schema({
  // _id 부분은 기본적으로 생략. 알아서 Object.id를 넣어줌
  filmWeather : {
    type     : String
  },
  filmSeason : {
    type     : String
  },
  userEmail : {
    type     : String
  },
  registDate : {
    type     : String
  },
  imgList : {
    type     : Object
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = {Post} 