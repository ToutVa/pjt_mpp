import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { TokenUser } from 'comm/recoil/TokenAtom';
import '../../css/login.css';
import { useLocation, useNavigate } from 'react-router';
import TextBox from '../register/TextBox';
import SubmitButton from './SubmitButton';
import Modal from 'react-modal';
import LinkButton from './LinkButton';
import Signup from 'pages/register/Signup';

const SignupPopup = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      <div className='no-drag button link-button'>
        <Link
          className='links button-text'
          onClick={() => {
            setModalIsOpen(true);
          }}
        >
          S I G N　U P
        </Link>
      </div>
      <Modal
        className='signup-popup'
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        ariaHideApp={false}
      >
        <Signup />
      </Modal>
    </>
  );
};

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
      .post('/api/auth/login', { id: id, password: password })
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
    <form className='login-main' onSubmit={handleSubmit}>
      <div className='login-logo' />
      <TextBox
        id='inputId'
        type='text'
        placeholder='아이디를 입력해주세요'
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
      />
      <SubmitButton label='L O G I N' type='submit' />
      <SignupPopup />
      {/* <LinkButton label='S I G N　U P' link='/sign' /> */}
    </form>
  );
};

export default Login;
