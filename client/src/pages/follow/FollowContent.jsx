import React, { useEffect, useState } from 'react';
const { default: FollowItem } = require('./FollowItem');

const FollowContent = () => {
  const [itemAry] = useState(['','','']);
  const elements = [];

  itemAry.forEach((val, idx) => {
    elements.push(<FollowItem />);
  });

  return elements;
};

export default FollowContent;