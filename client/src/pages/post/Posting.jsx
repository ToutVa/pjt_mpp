import React, { useEffect, useState } from "react";
import "css/post.css";
import axios from "axios";
import baseImgUrl from  "assets/icon-file.svg";
import { useLocation } from 'react-router';
import imageCompression from "browser-image-compression";
import PostTimeline from "pages/post/PostTimeline";


const Posting = (files) => {
    const location    = useLocation();
    const selectFiles = { ...location.state.files };

    const [title       , setTitle]        = useState();
    const [filmTime    , setFilmTime]     = useState();
    const [filmLocation, setFilmLocation] = useState();
    const [filmWeather , setFilmWeather]  = useState();
    const [filmSeason  , setFilmSeason]   = useState();
    
    const userEmail   = JSON.parse(window.localStorage.getItem("userData")).userData.email;
    const registDate  = new Date().toLocaleString();
    
    useEffect(()=> {
      for (let index  = 0; index < Object.keys(selectFiles).length; index++) {
        var reader    = new FileReader();

        reader.onload = function(){
          var dataURL = reader.result;
          var imgWrap = document.getElementById('preview');
          imgWrap.src = dataURL;
        };
        
        reader.readAsDataURL(selectFiles[index]);
      }
    }, []);
    

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      const headers  = {"Content-Type": "multipart/form-data"};
    
      formData.append("fileInfo", JSON.stringify({title, filmTime, filmLocation,
                                                  filmWeather, filmSeason, userEmail, registDate}));

      try {
        axios.post("/api/post/img", formData, headers)
            .then((res) => {
              console.log(res);
              alert(res.data.message);
            }).catch((err) => {
              console.log(err);
            });
      } catch (error) {
        alert(error.response.data.errors);
      }
    };


    return (
      <div className="main-frame post">
        <div className="left"></div>
        <div className="center">
          <PostTimeline files = {files}/>
          <form className="img-contain" onSubmit={handleSubmit}>
            <div className="img-wrap">
              <img id = "preview" src = {baseImgUrl} alt = "이미지" className="img-box" />
            </div>
            <div className="img-info">
              <table>
                <thead></thead>
                <tbody>
                  <tr>
                    <td><p>제목</p></td>
                    <td><input type="text" name="title" autoFocus placeholder="제목을 입력해주세요" onChange={(e) => setTitle(e.target.value)}/></td>
                  </tr>
                  <tr>
                    <td><p>촬영시간</p></td>
                    <td><input type="filmTime" placeholder="사진 촬영한 시간을 입력해주세요" onChange={(e) => setFilmTime(e.target.value)}/></td>
                  </tr>
                  <tr>
                    <td>위치</td>
                    <td><input type="filmLocation" placeholder="사진 촬영한 위치를 입력해주세요"onChange={(e) => setFilmLocation(e.target.value)}/></td>
                  </tr>
                  <tr>
                    <td>날씨</td><td>
                    <input type="radio" id="sun" name="weather" value="sun" onChange={(e) => setFilmWeather(e.target.value)}/><label for="sun" className="icon"></label>
                    <input type="radio" id="cloud" name="weather" value="cloud" onChange={(e) => setFilmWeather(e.target.value)}/><label for="cloud" className="icon"></label>
                    <input type="radio" id="rain" name="weather" value="rain" onChange={(e) => setFilmWeather(e.target.value)}/><label for="rain" className="icon"></label>
                    <input type="radio" id="thunder" name="weather" value="thunder" onChange={(e) => setFilmWeather(e.target.value)}/><label for="thunder" className="icon"> </label>
                    </td>
                  </tr>
                  <tr>
                    <td>계절</td><td>겨울</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="map">지도영역</div>
            <input type="text" placeholder="#태그"/>
            <button type="submit" className="btn-primary mt15">게시물 등록</button>
          </form>
          
        </div>
      <div className="right"></div>
    </div>
    )
}

export default Posting;
  