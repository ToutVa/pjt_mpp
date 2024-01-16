import axios from "axios";
import React, { useEffect, useState } from "react";

const {default: FeedItem } = require("./FeedItem");

const FeedContent = (props) => {
  const [page, setPage] = useState();
  const [itemAry, setItemAry] = useState([]);
  const [throttle, setThrottle] = useState(false);

  const getFeed = () => {
    axios.get("/api/post/?page="+page).then((res) => {
      const data = res.data;
      if (data.success) {
        data.post.forEach((e,idx)=> {
          itemAry.push(e);  
        })
        //setItemAry(data.post);
      }
    }).catch((err) => {
      console.log(err);
    }, []);
  }

  const scrollEvent = (e) => {
    if (throttle) return;
    if (!throttle) {
      setThrottle(true);
      if(window.innerHeight + window.scrollY > document.getElementById("feed").offsetHeight) {
        setPage((page) => page + 1);
        getFeed();
        setTimeout(async () => {
          setThrottle(false);
        }, 600);
      }
    }
  }

  useEffect(() => {
    getFeed();
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
  