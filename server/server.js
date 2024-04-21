// express 모듈 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// config 경로설정
const config = require('./config/key');

// router 경로설정 
const auth = require('./router/auth');
const user = require('./router/user');
const post = require('./router/post');
const comment = require('./router/comment');

// CONST 설정 
const PORT = 5000 // port 5000;

// db설정 
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI)
        .then(() => console.log('mongo-db connected'))
        .catch(() => console.log('mongo-db failed'))


// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : true}));

// json parser , cookie parser 설정 
app.use(bodyParser.json());
app.use(cookieParser());

// router 설정 
app.use('/api/auth', auth);
app.use('/api/user', user);
app.use('/api/post', post);
app.use('/api/comment', comment);


/****************************************************************************
 * app.get 표시 
 *****************************************************************************/
app.get('/', (req, res) => { //express 앱(app)을 넣고, root directory에 오면, 
  res.send('Hello World!') //"Hello World!" 를 출력되게 해준다.
})


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
}) //포트 5000번에서 이 앱을 실행한다.