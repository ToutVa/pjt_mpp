import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import "css/post.css";
import { useLocation, useNavigate } from "react-router";




const Posting = () => {
    const [title, setTitle] = useState();
    const [filmTime, setFilmTime] = useState();
    const [filmLocation, setFilmLocation] = useState();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location?.state?.redirectedFrom?.pathname || "/";

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('title'+title);
      console.log('filmTime'+filmTime);
      console.log('filmLocation'+filmLocation);
      axios.post("/api/post/create",{ title: title
                                    ,  filmTime: filmTime
                                    ,  filmLocation : filmLocation })
          .then((res) => {
              console.log(res);
              alert(res.data.message);
              navigate(from);
          }).catch((err) => {
              console.log(err);
          });
    };

    return (
      <>
        <div className="center" onSubmit={handleSubmit}>
            <div className="imgContain">
              <div className="imgWrap">
                <img src = '../assets/logo.png' alt = "이미지" className="imgBox" />
              </div>
            </div>
            <div className="imgInfo">
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
      </>
    )
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid #eee;
  align-items: flex-start;
  gap: 16px;
`;
const Button = styled.button`
  padding: 16px;
  width: 100%;
  background-color: #00a5ba;
  color: #fff;
`;
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
  