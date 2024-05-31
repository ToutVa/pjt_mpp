import React, { useEffect, useState } from 'react';
import "css/follow.css";

const FollowItem = (props) => {
  const [info, setInfo] = useState();
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
          <button type='submit' className='btn-cancel'>
            삭제
          </button>
        </div>
      </div>
    </>
  );
};

export default FollowItem;