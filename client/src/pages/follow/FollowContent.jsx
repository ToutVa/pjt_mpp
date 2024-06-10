import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
const { default: FollowItem } = require('./FollowItem');

const FollowContent = () => {
  const param   = useParams();
  const [itemAry] = useState(['','','']);
  const elements = [];

  itemAry.forEach((val, idx) => {
    elements.push(<FollowItem targetEmail = {param.userEmail}/>);
  });

  return elements;
};

export default FollowContent;