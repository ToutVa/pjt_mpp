import axios from 'axios';
import { React, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Modal from 'react-modal';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { TokenUser } from 'comm/recoil/TokenAtom';
import {
  loginModalState,
  signupModalState,
  alertModalState,
  confirmModalState,
  callbackSelector,
} from 'comm/recoil/PopupAtom';
import '../../css/register.css';
import TextBox from './TextBox';
import SubmitButton from './SubmitButton';
import LinkButton from './LinkButton';

const LoginModal = () => {
  const [modalState, setModalState] = useRecoilState(loginModalState);
  const setSignupModalState = useSetRecoilState(signupModalState);
  const setAlertModalState = useSetRecoilState(alertModalState);
  const [confirmState, setConfirmModalState] =
    useRecoilState(confirmModalState);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const setAccessToken = useSetRecoilState(TokenUser);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.redirectedFrom?.pathname || '/feed';

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/auth/login', { email: email, password: password })
      .then((res) => {
        const data = res.data;
        if (data.resultMsg) {
          setAccessToken(data.userData);
          setModalState(false);
          navigate(from);
        } else {
          setAlertModalState({
            msg: data.message,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  const fnCallback = () => {
    setConfirmModalState({ msg: '' });
    setSignupModalState(true);
  };

  return (
    <>
      <Modal
        className='register-popup'
        isOpen={modalState}
        onRequestClose={() => setModalState(false)}
        ariaHideApp={false}
      >
        <form className='login-main' onSubmit={handleSubmit}>
          <div className='login-logo' />
          <TextBox
            id='inputId'
            type='text'
            placeholder='아이디를 입력해주세요'
            onChange={(e) => {
              setEmail(e.target.value);
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
          <LinkButton
            label='S I G N　U P'
            onClick={() => {
              setConfirmModalState({ msg: '회원가입 하시겠습니까?' });
            }}
          />
          {confirmState === true ? fnCallback() : null}
        </form>
      </Modal>
    </>
  );
};

export default LoginModal;
