import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useModals from '../../hooks/useModals';
import { modals } from '../../comm/Modals';
import { useParams } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { isLoginSelector } from 'comm/recoil/TokenAtom';

const { default: FollowItem } = require('./FollowItem');
const FollowContent = (props) => {
  const isLogin = useRecoilValue(isLoginSelector);
  const [itemAry, setItemAry] = useState([]);
  const { openModal } = useModals();
  const alertModal = (msg) => {
    openModal(modals.alertModal, {
      msg: msg,
    });
  };
  let elements = [];

  useEffect(() => {
    fnFollow();
  }, []);

  useEffect(() => {
    console.log(itemAry); 
  },[itemAry])

  const fnFollow = (e) => {
    if (!isLogin) alertModal('로그인을 해주세요.');

    let data = {};
    let bookmarkUrl = "";
    if(props.type === 'follower'){
      bookmarkUrl = '/api/follow/getFollower';
      data = {
        fromUser : props.targetEmail
      };
    }else{
      bookmarkUrl = '/api/follow/getFollow';
      data = {
        toUser : props.targetEmail
      };
    }

    try {
      axios
        .post(bookmarkUrl, data)
        .then((res) => {
          const data = res.data;
          if (data.success) {
            setItemAry(data.comments);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  itemAry.forEach((val, idx) => {
    console.log('val', val.toUser); 
    elements.push(<FollowItem targetEmail = {val.toUser}/>);
  }); 

  return elements;
};

export default FollowContent;