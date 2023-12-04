import axios from 'axios';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { TokenUser } from 'comm/recoil/TokenAtom';
import '../../css/login.css';
import { useLocation, useNavigate } from 'react-router';
import TextBox from '../register/TextBox';
import SubmitButton from './SubmitButton';
import LinkButton from './LinkButton';

const Login = () => {
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const setAccessToken = useSetRecoilState(TokenUser);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.redirectedFrom?.pathname || '/feed';

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/user/login', { id: id, password: password })
      .then((res) => {
        const data = res.data;
        if (data.resultMsg) {
          setAccessToken(data.userData);
          navigate(from);
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <form className="login-main" onSubmit={handleSubmit}>
      <div className="login-logo" />
      <TextBox
        id="inputId"
        type="text"
        placeholder="아이디를 입력해주세요"
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <TextBox
        id="inputPw"
        type="password"
        placeholder="패스워드를 입력해주세요"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <SubmitButton label="L O G I N" type="submit" />
      <LinkButton label="S I G N　U P" link="/sign" />
    </form>
  );
};

export default Login;
