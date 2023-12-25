import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "css/post.css";
import baseImgUrl from  "assets/icon-file.svg";
import { useLocation } from 'react-router';
import imageCompression from "browser-image-compression";


const PostTimeline = (files) => {
    const location    = useLocation();
    const selectFiles = { ...location.state.files };
    
    useEffect(()=> {
      for (let index = 0; index < Object.keys(selectFiles).length; index++) {
        var reader = new FileReader();

        reader.onload = function(){
          var dataURL = reader.result;
          var imgWrap = document.getElementById('preview');
          imgWrap.src = dataURL;
        };

        reader.readAsDataURL(selectFiles[0]);
      }
    }, []);


    return (
        <div className="time-line">
            <div className="area">
                <div className="item"></div>
                <div className="item"></div>
            </div>
            <div className="btn-grp">
            <button>사진추가</button>
            <button>사진삭제</button>
            </div>
            <div className="bar">
            <div className="point"></div>
            </div>
        </div>
    )
}

export default PostTimeline;
  