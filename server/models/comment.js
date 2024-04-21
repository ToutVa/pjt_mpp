const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
  // _id 부분은 기본적으로 생략. 알아서 Object.id를 넣어줌
  _postId : {
    type     : String
  },
  content : {
    type     : String
  },
  userEmail : {
    type     : String
  },
  registDate : {
    type     : String
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = {Comment} 