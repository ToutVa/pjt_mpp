import React, { useEffect, useState } from 'react';
import FollowContent from "./FollowContent";
import { useParams } from "react-router-dom";

const Follower = () => {
  const param   = useParams();

  return (
    <>
      <div className='follow'>
        <FollowContent targetEmail = {param.userEmail}/>
      </div>
    </>
  );
};

export default Follower;