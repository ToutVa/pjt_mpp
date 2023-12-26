import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import '../../css/signup.css';
import TextBox from '../register/TextBox.jsx';
import SubmitButton from './SubmitButton.jsx';
import LinkButton from './LinkButton.jsx';

const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [birth, setBirth] = useState();
  const [gender, setGender] = useState();
  const [cellPhone, setCellPhone] = useState();

  // 이메일 인증 관련 변수
  const [authNum, setAuthNum] = useState();
  const [authNumText, setAuthNumText] = useState();
  const [isSwitch = true, setIsSwitch] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.redirectedFrom?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/auth/sign', {
        email: email,
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

  const emailAuth = (e) => {
    e.preventDefault();
    axios
      .put('/api/auth/emailAuth', {
        email: email,
      })
      .then((res) => {
        console.log(res);
        alert(res.data.message);
        setIsSwitch(false);
        setAuthNum(res.data.authNum);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fnChkAuthNum = (e) => {
    e.preventDefault();
    if (authNumText == authNum) {
      alert('인증성공');
    }
  };

  return (
    <form className='signup-main' onSubmit={handleSubmit}>
      가입하기 위한 정보를 입력해주세요.
      <br />
      <br />
      <tr>
        <td>
          <TextBox
            id='inputEmail'
            type='email'
            placeholder='이메일을 입력해주세요'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </td>
        <td>
          <button
            className='auth-button'
            style={{ display: isSwitch ? '' : 'none' }}
            onClick={emailAuth}
          >
            메일발송
          </button>
        </td>
      </tr>
      <tr>
        <td>
          <TextBox
            id='inputAuthNum'
            type='number'
            style={{ display: isSwitch ? 'none' : '' }}
            onChange={(e) => {
              setAuthNumText(e.target.value);
            }}
          ></TextBox>
        </td>
        <td>
          <button
            className='auth-button'
            style={{ display: isSwitch ? 'none' : '' }}
            onClick={fnChkAuthNum}
          >
            인증하기
          </button>
        </td>
      </tr>
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
      <SubmitButton label='S I G N　U P' type='submit' />
    </form>
  );
};

export default Signup;
