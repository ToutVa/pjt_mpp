import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import '../../css/signup.css';
import TextBox from '../register/TextBox.jsx';
import SubmitButton from './SubmitButton.jsx';
import LinkButton from './LinkButton.jsx';

const Signup = () => {
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [birth, setBirth] = useState();
  const [gender, setGender] = useState();
  const [cellPhone, setCellPhone] = useState();
  const [email, setEmail] = useState();

  //const setAccessToken = useSetRecoilState();
  //const isLogin = useRecoilValue(isLoginSelector);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.redirectedFrom?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/auth/sign', {
        id: id,
        password: password,
        name: name,
        birth: birth,
        gender: gender,
        cellPhone: cellPhone,
      })
      .then((res) => {
        console.log(res);
        alert(res.data.message);
        navigate(from);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className='signup-main' onSubmit={handleSubmit}>
      가입하기 위한 정보를 입력해주세요.<br/><br/>
      <TextBox
        id='inputId'
        type='text'
        placeholder='아이디를 입력해주세요'
        autoFocus
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <TextBox
        id='inputPw'
        type='password'
        placeholder='패스워드를 입력해주세요'
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></TextBox>
      <TextBox
        id='inputName'
        type='name'
        placeholder='이름을 입력해주세요'
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <TextBox
        id='inputBirth'
        type='date'
        placeholder='생일을 입력해주세요'
        onChange={(e) => {
          setBirth(e.target.value);
        }}
      />
      <TextBox
        id='inputGender'
        type='text'
        placeholder='성별을 입력해주세요'
        onChange={(e) => {
          setGender(e.target.value);
        }}
      />
      <TextBox
        id='inputCellPhone'
        type='number'
        placeholder='전화번호를 입력해주세요'
        onChange={(e) => {
          setCellPhone(e.target.value);
        }}
      />
      <TextBox
        id='inputEmail'
        type='email'
        placeholder='이메일을 입력해주세요'
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <SubmitButton label='S I G N　U P' type='submit' />
    </form>
  );
};

export default Signup;
