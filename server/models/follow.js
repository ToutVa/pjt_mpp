const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowSchema = new mongoose.Schema({
  // _id 부분은 기본적으로 생략. 알아서 Object.id를 넣어줌
  _followId : {
    type     : Schema.Types.ObjectId
  },
  toUser : {
    type     : String
  },
  fromUser : {
    type     : String
  }
});

const Follow = mongoose.model('Follow', FollowSchema);

module.exports = {Follow} 