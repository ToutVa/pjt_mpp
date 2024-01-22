import React from 'react';
import { useNavigate } from 'react-router';
import 'css/cover.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='cover-main'>
        <h1>지도 속 나를 기록하는 여행앱</h1>
        <h5>My Pin Point</h5>
        <div className='phone' />
      </div>
      <div className='cover-content'>
        <div className='item text'></div>
        <div className='item img'></div>
      </div>
      <div className='cover-arrow-down' onClick={() => {navigate('/guestFeed');}}/>
    </>
  );
};

export default Home;
