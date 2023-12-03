import axios from "axios";
import React, { useEffect, useState } from "react";

const {default: FeedItem } = require("./FeedItem");

const FeedContent = (props) => {
  const [itemAry, setItemAry] = useState([]); 
  
  useEffect(()=> {
    axios.get("/api/post/").then((res) => {
      const data = res.data;
      if (data.success) {
        setItemAry(data.post);
      } 
    }).catch((err) => {
      console.log(err);
    }, []);
  }, []);
  // await 
  
  let elements = [];
  
  itemAry.forEach((val, idx) => {
    elements.push(<FeedItem content={val} key={idx}/>);
  });

  return elements;
};
  
export default FeedContent;
  