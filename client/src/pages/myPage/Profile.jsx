import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import useModals from '../../hooks/useModals';
import { Link } from "react-router-dom";
import { modals } from '../../comm/Modals';
import { useParams } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { isLoginSelector } from 'comm/recoil/TokenAtom';
import 'css/myPage.css';
import FollowContent from "pages/follow/FollowContent";

const SelectFollow = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const param   = useParams();

  return(
    <>
      <Link className='txt-underline' onClick={() => {setModalIsOpen(true)}}>
        {props.followCnt}
      </Link>
      <Modal className="test" 
             isOpen={modalIsOpen} 
             onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false}>
        <div className="header">
          <div/>
          <div className='title ml20'>{props.popupName}</div>
          <div className="close" onClick={()=> {setModalIsOpen(false)}} />
        </div>
        <FollowContent type = {props.type} targetEmail = {param.userEmail}/>
      </Modal>
    </>
  );
};

const Profile = () => {
  const [info, setInfo] = useState();
  const [followBtnNm, setFollowBtnNm] = useState('팔로우');
  const [followerCnt, setFollowerCnt] = useState(0);
  const [followCnt, setFollowCnt] = useState(0);
  const [followTF, setFollowTF] = useState();
  const param   = useParams();
  const lgnUser = JSON.parse(localStorage.getItem('userData')).userData.email;
  const isLogin = useRecoilValue(isLoginSelector);
  const { openModal } = useModals();
  const alertModal = (msg) => {
    openModal(modals.alertModal, {
      msg: msg,
    });
  };

  const getPost = async () => {
    await axios
      .get('/api/user/myInfo')
      .then((res) => {
        if (res.data.success && res.data.info.length === 1) {
          setInfo(res.data.info[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPost();
    fnGetFollow();
  }, []);

  /* 팔로잉 */
  const fnCreateFollow = (e) => {
    if (!isLogin) alertModal('로그인을 해주세요.');
    let followUrl = '';
  
    if(followTF){
      followUrl = '/api/follow/deleteFollow';
    }else{
      followUrl = '/api/follow/createFollow';
    }
    
  
    const data = {
      toUser: lgnUser,
      fromUser : param.userEmail
    };
  
    try {
      axios
        .post(followUrl, data)
        .then((res) => {
          alertModal(res.data.message)
          fnGetFollow();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  /* 팔로잉 */
  const fnGetFollow = (e) => {  
    console.log('fnGetFollow');
    let followUrl = '/api/follow/getFollowCnt';
  
    const data = {
      toUser: lgnUser,
      fromUser : param.userEmail
    };
  
    try {
      axios
        .post(followUrl, data)
        .then((res) => {
          console.log(res.data);
          setFollowerCnt(res.data.fromUserCnt);
          setFollowCnt(res.data.toUserCnt);
          if(res.data.toFromUserCnt > 0){
            setFollowBtnNm('팔로잉');
            setFollowTF(true);
          }else{
            setFollowBtnNm('팔로우');
            setFollowTF(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className='profile'>
      <div className='info'>
        <div className='picture'>
          <img
            alt=''
            src={info?.profilePicture}
            height='80'
            width='80'
            style={{
              'border-radius': '50%'
            }}
          />
        </div>
        <div>
          게시글
          <br />
          {info?.postCnt || 4}
        </div>
        <div className='follow'>
          팔로워
          <br />
          {info?.follower || <SelectFollow popupName ={'팔로워'} followCnt = {followerCnt + '명'} type = {'follower'}/>}
        </div>
        <div className='follow'>
          팔로우
          <br />
          {info?.follow || <SelectFollow popupName ={'팔로우'} followCnt = {followCnt + '명'} type = {'follow'}/>}
        </div>
      </div>
      <div>
        <span className='name'>{info?.name || '킹왕짱내계정'}</span>
      </div>
      <div>{info?.profileIntro || '소개글인데 입력안해?'}</div>
      {(param.userEmail !== undefined) && (param.userEmail !== lgnUser) ?
       (<button id='followBtn' type='submit' className='btn-default' onClick={fnCreateFollow}>{followBtnNm}</button>) : (<></>)}
    </div>
  );
};

export default Profile;
