import axios from "axios";
import React, { useEffect, useState } from "react";
import commUtil from "comm/util";

const {default: FeedItem } = require("./FeedItem");

const FeedContent = (props) => {
  const [itemAry, setItemAry] = useState([]);
  const [throttle, setThrottle] = useState(false);
  
  const getFeed = () => {
    axios.post("/api/post/",{lastId : itemAry[itemAry.length-1]?._id}).then((res) => {
      const data = res.data;
      if (data.success) {
        data.post.forEach((item,idx)=> {
          itemAry.push(item);
        });

        //가져오는 데이터가 10개 미만인 경우 가져오기 중지
        if(data.post.length < 10) {
          window.removeEventListener('scroll', scrollEvent);
        }

        console.log("Length Of Item : " , itemAry.length);
      }
    }).catch((err) => {
      console.log(err);
    }, [itemAry]);
  }

  const scrollEvent = async (e) => {
    if(window.innerHeight + window.scrollY > document.getElementById("feed").offsetHeight) {
      if (throttle) return;
      if (!throttle) {
        setThrottle(true);
        setTimeout(async () => {
          getFeed();
          setThrottle(false);
        }, 300);
      }
    }
  }
  useEffect(() => {
    async function init() {
      await getFeed();
      setItemAry(itemAry);
    }
    init();
    commUtil.scrollTop();
    window.addEventListener('scroll', scrollEvent);
      return () => window.removeEventListener('scroll', scrollEvent);
  }, []);
  
  let elements = [];
  itemAry.forEach((val, idx) => {
    elements.push(<FeedItem content={val} key={idx}/>);
  });
  return elements;
};
  
export default FeedContent;