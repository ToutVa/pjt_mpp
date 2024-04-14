import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { TokenUser, isLoginSelector } from 'comm/recoil/TokenAtom';

import { loginModalState, signupModalState } from 'comm/recoil/PopupAtom';
import commUtil from 'comm/util';

import axios from 'axios';

// navMenu login정보에 맞게 활성화
const Header = ({ type }) => {
  const isLogin = useRecoilValue(isLoginSelector);
  const setAccessToken = useSetRecoilState(TokenUser);
  const setLoginModalState = useSetRecoilState(loginModalState);
  const setSignupModalState = useSetRecoilState(signupModalState);

  const fnLogout = () => {
    // token undefined 설정
    setAccessToken(undefined);
    // logout api 실행
    axios.post('/api/auth/logout').then((res) => {
      alert('로그아웃 되었습니다.')
    });
  };

  const fnClickMenu = (e) => {
    let classNm =
      e.currentTarget.className.indexOf('active') < 0
        ? 'btn-menu active'
        : 'btn-menu';
    e.currentTarget.className = classNm;
  };

  const fnRefreshFeed = (e) => {
    commUtil.scrollTop();
    /** 현재 페이지가 feed일때 feed 초기화후 새로고침 로직 넣어야할듯*/
  }

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
          <Link to={isLogin === true ? '/feed' : '/'}
            onClick={() => {
              fnRefreshFeed();
            }}>
            <div className='logo' />
          </Link>
        </div>
        <div className={isLogin ? 'side-menu right' : 'side-menu'}>
          <div className='btn-menu' onClick={fnClickMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav>
            <ul>
              <li>
                {' '}
                <a href='/mypage'> mypage</a>
              </li>
              <li>
                {' '}
                <a href='/setting'> setting</a>
              </li>
              <li>
                {' '}
                <a href='/' onClick={fnLogout}>
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
