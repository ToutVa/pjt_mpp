const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new mongoose.Schema({
  // _id 부분은 기본적으로 생략. 알아서 Object.id를 넣어줌
  _postId : {
    type     : Schema.Types.ObjectId
  },
  userEmail : {
    type     : String
  },
  _bookmarkTypeId : {
    type     : Schema.Types.ObjectId
  },
  bookmarkType : {
    type     : String
  },
  bookmarkTitle : {
    type     : String
  },
  registDate : {
    type     : String
  }
});

const Bookmark = mongoose.model('Bookmark', LikeSchema);

module.exports = {Bookmark} 