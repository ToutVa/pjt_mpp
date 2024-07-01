import React, { useEffect, useState } from 'react';
import "css/follow.css";
import { useParams } from "react-router-dom";


const FollowItem = (props) => {
  const param   = useParams();
  const lgnUser = JSON.parse(localStorage.getItem('userData')).userData.email;
  const [info, setInfo] = useState();
  console.log('FollowItem', props);

  return (
    <div className='follow'>
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
          <span className='id'>{props?.targetEmail || '아이디'}</span><br/>
          <span className='profileIntro'>{info?.profileIntro}</span>
        </div>
        <div className='btn-grp'>
          <button 
            type='submit' 
            className='btn-default'>
            {param.userEmail !== undefined && param.userEmail !== lgnUser ? ("팔로우") : ("삭제")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowItem;