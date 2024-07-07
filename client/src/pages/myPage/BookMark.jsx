import "css/myPage.css";
import BookMarkItem from "./BookMarkItem";

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Bookmark = () => {

  const [bookmarkAry, setBookmarkAry] = useState([]);


  const getBookmark = async () => {
    await axios
      .get('/api/user/mypageBookmark', {
      })
      .then((res) => {
        const data = res.data;
        if (data.success) {
          console.log(data);
          setBookmarkAry(data.bookmarkAry);
          
        } 
      })
      .catch(
        (err) => { 
          console.log(err);
        },
        [bookmarkAry]
      );
  };


  const fnCreateBookMark = () => { 
    let elements = [];
     
    bookmarkAry.forEach((val, idx) => {
      elements.push(<BookMarkItem prop={bookmarkAry[idx]} key={idx}/>);
    });
  
    return elements; 
  }

  useEffect (() => {
    getBookmark();
  }, [])

  return (
    <>
      <p className="pin">저장된여행글</p>
      <div className="container">
        {fnCreateBookMark()}
      </div>
    </>
  );
};

export default Bookmark;