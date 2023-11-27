const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const postSchema = new mongoose.Schema({
  // _id 부분은 기본적으로 생략. 알아서 Object.id를 넣어줌
  title : {
    type      : String,
    maxlength : 200,
    required  : true, // null 여부
  },
  filmTime : {
    type      : String,
    maxlength : 200,
    required  : true, // null 여부
  },
  filmLocation: {
    type      : String,
    maxlength : 200,
    required  : true, // null 여부
  },
  token : {
    type : String
  },
  tokenExp : {
    type : Number
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = {Post} 