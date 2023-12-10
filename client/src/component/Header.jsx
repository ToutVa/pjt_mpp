/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { TokenUser, isLoginSelector } from 'comm/recoil/TokenAtom';
import Modal from 'react-modal';
import axios from 'axios';
import Login from 'pages/register/Login';
import Signup from 'pages/register/Signup';

/* eslint-disable jsx-a11y/alt-text */

const LoginPopup = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      <Link
        className='item'
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
        <p className='linked-text white'>login</p>
      </Link>
      <Modal
        className='login-popup'
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        ariaHideApp={false}
      >
        <Login />
      </Modal>
    </>
  );
};

const SignupPopup = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      <Link
        className='item'
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
        <p className='linked-text white'>sing up</p>
      </Link>
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

// navMenu login정보에 맞게 활성화
const Header = ({ type }) => {
  const isLogin = useRecoilValue(isLoginSelector);
  const setAccessToken = useSetRecoilState(TokenUser);

  const fn_logout = () => {
    // logout api 실행
    axios.post('/api/user/logout').then((res) => {
      // token undefined 설정
      setAccessToken(undefined);
    });
  };

  const fn_clickMenu = (e) => {
    let classNm =
      e.currentTarget.className.indexOf('active') < 0
        ? 'btn-menu active'
        : 'btn-menu';
    e.currentTarget.className = classNm;
  };

  if ('cover' === type) {
    return (
      <header className='cover'>
        <Link to={'/'}>
          <div className='cover-logo' />
        </Link>
        <div className='flex'>
          <LoginPopup />
          {isLogin === false ? (
            <SignupPopup />
          ) : (
            <Link className='item' to='/'>
              <p onClick={fn_logout} className='linked-text white'>
                logout
              </p>
            </Link>
          )}
        </div>
      </header>
    );
  } else {
    return (
      <header className={type}>
        <div className='side-menu' />
        <div className='center'>
          <Link to={isLogin === true ? '/feed' : '/'}>
            <div className='logo' />
          </Link>
        </div>
        <div className={isLogin ? 'side-menu right' : 'side-menu'}>
          <a className='btn-menu' onClick={fn_clickMenu}>
            <span></span>
            <span></span>
            <span></span>
          </a>
          <nav>
            <ul>
              <li>
                {' '}
                <a href='/mypage'> mypage</a>
              </li>
              <li>
                {' '}
                <a href='/profile'> profile</a>
              </li>
              <li>
                {' '}
                <a href='/setting'> setting</a>
              </li>
              <li>
                {' '}
                <a href='' onClick={fn_logout}>
                  {' '}
                  logOut
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
};

export default Header;
