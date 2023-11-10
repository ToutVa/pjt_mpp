const express = require('express') //③번 단계에서 다운받았던 express 모듈을 가져온다.
const app = express() //가져온 express 모듈의 function을 이용해서 새로운 express 앱을 만든다. 🔥
const port = 5000 //포트는 4000번 해도되고, 5000번 해도 된다. -> 이번엔 5000번 포트를 백 서버로 두겠다.
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

const {User} = require("./models/User");
const Sales = require("./models/Test");


const mongoose = require('mongoose');
mongoose.connect(config.mongoURI)
        .then(() => console.log('connected!!!!!!!!!!!!!!!!!!'))
        .catch(() => console.log('failedbbbbbbbbbbbbbb'))


// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : true}));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => { //express 앱(app)을 넣고, root directory에 오면, 
  res.send('Hello World!') //"Hello World!" 를 출력되게 해준다.
})

app.post('/register', async (req, res) => { 
  // 회원가입 할때 필요한 정보들을 client 에서 가져옴

  const user = new User(req.body);

  const result = await user.save().then(() => {
      res.status(200).json({
        success : true
      })
      }).catch((err) => {
        res.json({success : false, err})
      })
 
  });

  
  app.post('/login', async (req, res) => {
    

    // 요청된 id가 dababase에 존재하는지 확인
    console.log("id Match");
    const findResult = User.findOne({ email: req.body.id}).then(( )=> {
     
    }).catch((err) => {
      res.json({loginSucces : false,
                message : "제공된 이메일에 해당하는 유저가 없습니다."});
    })

    console.log("id, password Match");

    // 요청된 id와 비밀번호가 맞는지 확인
    User.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) 
        return res.json({loginSucces : false, message : "비밀번호가 틀렸습니다."});
      
          // 비밀번호 맞다면 토큰 생성
      User.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // token 저장 
        res.cookie("x_auth", user.token)
          .status(200)
          .json({loginSucces : true, userId : user._id});
        
        })

    })
     
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) //포트 5000번에서 이 앱을 실행한다.

