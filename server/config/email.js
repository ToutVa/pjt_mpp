const nodemailer = require('nodemailer');
// config 경로설정
const config = require('./dev');


const stmpTransport = nodemailer.createTransport({
    service : "naver",
    host : "smtp.naver.com",
    port : 465, 
    secure : false,
    requireTLS : true,
    auth : {
        user : config.EMAIL_AUTH_ID,
        pass : config.EMAIL_AUTH_PWD
    }
});

module.exports = {
    stmpTransport,
  };
  