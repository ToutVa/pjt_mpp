const mongoose = require('mongoose');
const { Schema } = mongoose;

const salesSchema = new Schema({
  // _id 부분은 기본적으로 생략. 알아서 Object.id를 넣어줌
  saleDate: {
    type: Date,
    required: true, // null 여부
    unique: true, // 유니크 여부
  },
  item: {
    type: [], // Int32가 아니다. 기본 자바스크립트에는 존재하지 않으니 넘버로 해줘야 한다.
    required: true,
  },
  storeLocation: {
    type: String,
    required: true,
  },
  customer: {
    type: Object}, // 옵션에 type밖에 없을 경우 간단하게 표현 할 수 있다.
  couponUsed : {
    type : Boolean
  },
  purchaseMethod :{
    type : String
  }

});

module.exports = mongoose.model('Sales', salesSchema);