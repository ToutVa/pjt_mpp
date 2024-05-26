import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import 'css/myPage.css';
import Follower from "pages/follow/Follower";

const SelectFollow = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
        <Follower />
      </Modal>
    </>
  );
};

const Profile = () => {
  const [info, setInfo] = useState();

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
  }, []);

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
          {info?.follower || <SelectFollow popupName ={'팔로워'} followCnt = {'100명'}/>}
        </div>
        <div className='follow'>
          팔로우
          <br />
          {info?.follow || <SelectFollow popupName ={'팔로우'} followCnt = {'10명'}/>}
        </div>
      </div>
      <div>
        <span className='name'>{info?.name || '킹왕짱내계정'}</span>
      </div>
      <div>{info?.profileIntro || '소개글인데 입력안해?'}</div>
    </div>
  );
};

export default Profile;
