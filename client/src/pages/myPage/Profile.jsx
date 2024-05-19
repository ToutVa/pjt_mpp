import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'css/myPage.css';

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
        <div>
          팔로워
          <br />
          {info?.follower || '33.4k'}
        </div>
        <div>
          팔로우
          <br />
          {info?.follow || 192}
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
