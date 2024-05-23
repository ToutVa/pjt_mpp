import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isLoginSelector } from 'comm/recoil/TokenAtom';
import commUtil from 'comm/util';
import util from 'comm/util';
import { useParams, useSearchParams } from 'react-router-dom';

const { default: FeedItem } = require('./FeedItem');

const FeedContent = (props) => {
  const isLogin = useRecoilValue(isLoginSelector);
  const [itemAry] = useState([]);
  const [throttle, setThrottle] = useState(false);
  const tmp       = useParams();
  
  const getFeed = async () => {
    if (itemAry.length === 0) commUtil.scrollTop();
    let loadUrl = isLogin ? '/api/post/' : '/api/post/guestFeed';
    setThrottle(true);
    debugger;
    let paramJson = {
      lastId      : itemAry[itemAry.length - 1]?._id,
    }

    //검색조건이 있을때만
    if(!util.isEmpty(tmp)) {
      let param = tmp.search.split("&");

      paramJson.searchWord  = param[0].split("=")[1];
      paramJson.weather     = param[1].split("=")[1];
      paramJson.season      = param[2].split("=")[1];
    }
    

    await axios
      .post(loadUrl, paramJson)
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
    const scrollTop    = document.documentElement.scrollTop;
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
  }, [tmp]);

  let elements = [];
  itemAry.forEach((val, idx) => {
    elements.push(<FeedItem content={val} key={idx} />);
  });

  return elements;
};

export default FeedContent;
