import React, { useEffect, useState } from 'react';
import "css/follow.css";
import axios from 'axios';
import useModals from '../../hooks/useModals';
import { modals } from '../../comm/Modals';
import { useParams } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { isLoginSelector } from 'comm/recoil/TokenAtom';

const FollowItem = (props) => {
  const param   = useParams();
  const lgnUser = JSON.parse(localStorage.getItem('userData')).userData.email;
  const isLogin = useRecoilValue(isLoginSelector);
  const [info, setInfo] = useState();
  const { openModal } = useModals();
  const alertModal = (msg) => {
    openModal(modals.alertModal, {
      msg: msg,
    });
  };

  useEffect(() => {
    fnFollow();
  }, []);

  const fnFollow = (e) => {
    if (!isLogin) alertModal('로그인을 해주세요.');

    let bookmarkUrl = '/api/follow/getFollower';

    const data = {
      fromUser : param.userEmail
    };

    try {
      axios
        .post(bookmarkUrl, data)
        .then((res) => {
          console.log(res.data.comments);
          // setInfo(res.data.comments);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <>
      <div className='item'>
        <div className='picture'>
          <img
            alt=''
            src={info?.profilePicture}
            height='50px'
            width='50px'
            style={{
              'background-color' : '#F2F3F5',
              'border-radius': '50%'
            }}
          />
        </div>
        <div className='intro'>
          <span className='id'>{info?.name || '아이디'}</span><br/>
          <span className='profileIntro'>{info?.profileIntro || '이름'}</span>
        </div>
        <div className='btn-grp'>
          <button 
            type='submit' 
            className='btn-default'>
            {param.userEmail !== undefined && param.userEmail !== lgnUser ? ("팔로우") : ("삭제")}
          </button>
        </div>
      </div>
    </>
  );
};

export default FollowItem;