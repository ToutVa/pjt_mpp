import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isLoginSelector } from 'comm/recoil/TokenAtom';
import commUtil from 'comm/util';

const MyFeedContent = (props) => {
  const isLogin = useRecoilValue(isLoginSelector);
  const [itemAry] = useState([]);
  const [throttle, setThrottle] = useState(true);

  const getFeed = async () => {
    if (itemAry.length === 0) commUtil.scrollTop();
    await axios
      .post('/api/post/', {
        lastId: itemAry[itemAry.length - 1]?._id,
        myFeedYn: isLogin,
      })
      .then((res) => {
        const data = res.data;
        if (data.success) {
          data.post.forEach((item, idx) => {
            itemAry.push(item);
          });
        }
      })
      .catch(
        (err) => {
          console.log(err);
        },
        [itemAry]
      );
    setThrottle(false);
  };

  const scrollEvent = async () => {
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    if (scrollTop + clientHeight >= scrollHeight && !throttle && itemAry.length !== 0) {
      setThrottle(true);
      await getFeed();
    }
  };

  useEffect(() => {
    getFeed();
    window.addEventListener('scroll', scrollEvent);
    return () => window.removeEventListener('scroll', scrollEvent);
  }, []);

  let elements = [];
  itemAry.forEach((val, idx) => {
    elements.push(
      <img
        key={idx}
        src={val?.imgList[0].location}
        height='210'
        width='210'
        alt=''
      />
    );
  });

  return elements;
};

export default MyFeedContent;
