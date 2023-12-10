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
      <>
        <form className="center" onSubmit={handleSubmit} onLoad = {setImgUrl}>
            <div className="img-contain">
              <div className="img-wrap">
                <img id = "preview" src = {baseImgUrl} alt = "이미지" className="img-box" />
              </div>
              <div className="img-info">
                <InputWrapper>
                    제목
                    <input
                    type="text"
                    name="title"
                    autoFocus
                    placeholder="제목을 입력해주세요"
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </InputWrapper>
                <InputWrapper>
                    촬영시간
                    <input
                    type="filmTime"
                    placeholder="사진 촬영한 시간을 입력해주세요"
                    onChange={(e) => setFilmTime(e.target.value)}
                    />
                </InputWrapper>
                <InputWrapper>
                    위치
                    <input
                    type="filmLocation"
                    placeholder="사진 촬영한 위치를 입력해주세요"
                    onChange={(e) => setFilmLocation(e.target.value)}
                    />
                </InputWrapper>
              </div>
            </div>
            <button type="submit" className="btn-primary">게시물 등록</button>
        </form>
      </>
    )
}

const InputWrapper = styled.label`
  display: inline-block;
  flex-direction: column;
  align-items: flex-start;
  & > input {
    width  : 210px;
    padding: 8px 16px;
    border: 1px solid #eee;
  }
`;
 


export default Posting;
  