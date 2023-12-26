import axios from 'axios';
import React, { useEffect, useState } from 'react';


const FeedContent = (props) => {
  const [itemAry, setItemAry] = useState([]);

  useEffect(() => {
    axios
      .get('/api/user/mypage')
      .then((res) => {
        const data = res.data;
        if (data.success) {
          setItemAry(data.post);
        }
      })
      .catch((err) => {
        console.log(err);
      }, []);
  }, []);
  // await

  let elements = [];


  return elements;
};

export default FeedContent;
