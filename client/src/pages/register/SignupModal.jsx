import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Modal from 'react-modal';
import { useRecoilState } from 'recoil';
import { signupModalState } from 'comm/recoil/PopupAtom';
import '../../css/register.css';
import TextBox from './TextBox.jsx';
import SubmitButton from './SubmitButton.jsx';

const Signup = () => {
  const [modalState, setModalState] = useRecoilState(signupModalState);

  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [birth, setBirth] = useState();
  const [gender, setGender] = useState();
  const [cellPhone, setCellPhone] = useState();
  const [email, setEmail] = useState();

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
    if (authNumText === authNum) {
      alert('인증성공');
    }
  };

  return (
    <Modal
      className='register-popup'
      isOpen={modalState}
      onRequestClose={() => setModalState(false)}
      ariaHideApp={false}
    >
      <form className='signup-main' onSubmit={handleSubmit}>
        가입하기 위한 정보를 입력해주세요.
        <br />
        <br />
        <tr>
          <td style={{ display: 'flex' }}>
            <TextBox
              id='inputEmail'
              width={isSwitch ? 210 : null}
              type='email'
              placeholder='이메일을 입력해주세요'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button
              className='button submit-button ml10'
              style={{
                display: isSwitch ? '' : 'none',
                width: '80px',
                height: '30px',
              }}
              onClick={emailAuth}
            >
              <div className='button-text'>메일발송</div>
            </button>
          </td>
        </tr>
        <tr>
          <td style={{ display: 'flex' }}>
            <TextBox
              id='inputAuthNum'
              width={isSwitch ? null : 210}
              type='number'
              placeholder='인증번호를 입력해주세요'
              style={{ display: isSwitch ? 'none' : '' }}
              onChange={(e) => {
                setAuthNumText(e.target.value);
              }}
            ></TextBox>
            <button
              className='button submit-button ml10'
              style={{
                display: isSwitch ? 'none' : '',
                width: '80px',
                height: '30px',
              }}
              onClick={fnChkAuthNum}
            >
              <div className='button-text'>인증하기</div>
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
    </Modal>
  );
};

export default Signup;
