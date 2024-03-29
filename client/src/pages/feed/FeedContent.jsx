import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isLoginSelector } from 'comm/recoil/TokenAtom';
import commUtil from 'comm/util';

const { default: FeedItem } = require('./FeedItem');

const FeedContent = (props) => {
  const isLogin = useRecoilValue(isLoginSelector);
  const [itemAry] = useState([]);
  const [throttle, setThrottle] = useState(false);

  const getFeed = async () => {
    if (itemAry.length === 0) commUtil.scrollTop();

    let loadUrl = isLogin ? '/api/post/' : '/api/post/guestFeed';
    setThrottle(true);
    await axios
      .post(loadUrl, { lastId: itemAry[itemAry.length - 1]?._id })
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
    elements.push(<FeedItem content={val} key={idx} />);
  });

  return elements;
};

export default FeedContent;
