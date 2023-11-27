import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { TokenAtom, isLoginSelector } from "comm/recoil/TokenAtom";



const Posting = () => {
    const [title, setTitle] = useState();
    const [filmTime, setFilmTime] = useState();
    const [filmLocation, setFilmLocation] = useState();

    console.log("TokenAtom", TokenAtom);

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
        <FormWrapper onSubmit={handleSubmit}>
            <InputWrapper>
                제목
                <input
                type="text"
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
            <Button type="submit">게시물 등록</Button>
        </FormWrapper>
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
  