import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { TokenUser, isLoginSelector } from 'comm/recoil/TokenAtom';
import { loginModalState, signupModalState } from 'comm/recoil/PopupAtom';

import axios from 'axios';

// navMenu login정보에 맞게 활성화
const Header = ({ type }) => {
  const setLoginModalState = useSetRecoilState(loginModalState);
  const setSignupModalState = useSetRecoilState(signupModalState);
  const isLogin = useRecoilValue(isLoginSelector);
  const setAccessToken = useSetRecoilState(TokenUser);

  const fn_logout = () => {
    // token undefined 설정
    setAccessToken(undefined);
    // logout api 실행
    axios.post('/api/auth/logout').then((res) => {
      alert('로그아웃 되었습니다.')
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
          <Link
            className='item'
            onClick={() => {
              setLoginModalState(true);
            }}
          >
            <p className='linked-text white'>login</p>
          </Link>
          <Link
            className='item'
            onClick={() => {
              setSignupModalState(true);
            }}
          >
            <p className='linked-text white'>signup</p>
          </Link>
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
