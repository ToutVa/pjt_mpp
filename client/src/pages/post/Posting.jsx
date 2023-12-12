import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import "css/post.css";
import baseImgUrl from  "assets/icon-file.svg";
import { useLocation } from 'react-router';
import imageCompression from "browser-image-compression";


const Posting = (files) => {
    const [title, setTitle] = useState();
    const [filmTime, setFilmTime] = useState();
    const [filmLocation, setFilmLocation] = useState();

    const location = useLocation();
    const selectFiles = { ...location.state.files };
    
    const setImgUrl = () => {
      var reader = new FileReader();

      reader.onload = function(){
        var dataURL = reader.result;
        var imgWrap = document.getElementById('preview');
        imgWrap.src = dataURL;
      };

      reader.readAsDataURL(selectFiles[0]);
    };
    

    const handleSubmit = async (e) => {
      e.preventDefault();

      console.log("압축 시작");

      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      try {
        // 압축 결과
        const compressedFile = await imageCompression(selectFiles[0], options);
        console.log("압축완료", compressedFile);
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => {
          const base64data = reader.result;
          handlingDataForm(base64data);
        };

      } catch (error) {
        console.log(error);
      }
    };

    const handlingDataForm = async dataURI => {
      // dataURL 값이 data:image/jpeg:base64,~~~~~~~ 이므로
      // ','를 기점으로 잘라서 ~~~~~인 데이터 부분만 다시 인코딩
      const byteString = atob(dataURI.split(",")[1]);

      const byteLength = new ArrayBuffer(byteString.length);
      const unitArray = new Uint8Array(byteLength);

      console.log(byteLength);
      console.log(unitArray);
      for (let i = 0; i < byteString.length; i++) {
        unitArray[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([unitArray], {
        type: "image/png"
      });
      const file = new File([blob], "image.png");
      console.log("file", file);

      const formData = new FormData();
      formData.append("file", file);
    
      // 필요시 더 추가합니다.
      formData.append("title", {title});
      formData.append("filmTime", {filmTime});
      formData.append("filmLocation", {filmLocation});
    
      try {
        const headers = {
          "Content-Type": "multipart/form-data"
        };

        axios.post("/api/post/create", formData, headers)
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
          <form className="img-contain" onSubmit={handleSubmit} onLoad = {setImgUrl}>
            <div className="img-wrap">
              <img id = "preview" src = {baseImgUrl} alt = "이미지" className="img-box" />
            </div>
            <div className="img-info">
              <table>
                <thead></thead>
                <tbody>
                  <tr>
                    <td>제목</td>
                    <td><input type="text" name="title" autoFocus placeholder="제목을 입력해주세요" onChange={(e) => setTitle(e.target.value)}/></td>
                  </tr>
                  <tr>
                    <td>촬영시간</td>
                    <td><input type="filmTime" placeholder="사진 촬영한 시간을 입력해주세요" onChange={(e) => setFilmTime(e.target.value)}/></td>
                  </tr>
                  <tr>
                    <td>날씨</td><td>
                    <input type="radio" id="sun" name="weather" value="sun"/><label for="sun" className="icon"></label>
                    <input type="radio" id="cloud" name="weather" value="cloud"/><label for="cloud" className="icon"></label>
                    <input type="radio" id="rain" name="weather" value="rain"/><label for="rain" className="icon"></label>
                    <input type="radio" id="thunder" name="weather" value="thunder"/><label for="thunder" className="icon"> </label>
                    </td>
                  </tr>
                  <tr>
                    <td>계절</td><td>2</td>
                  </tr>
                  <tr>
                    <td>위치</td>
                    <td><input type="filmLocation" placeholder="사진 촬영한 위치를 입력해주세요"onChange={(e) => setFilmLocation(e.target.value)}/></td>
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
  