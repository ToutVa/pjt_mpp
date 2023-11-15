import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { TokenAtom, isLoginSelector } from "comm/recoil/TokenAtom";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";
import { Link } from 'react-router-dom';



const Login = () => {
    const [id, setId] = useState();
    const [password, setPassword] = useState();
    const setAccessToken = useSetRecoilState(TokenAtom);
    const isLogin = useRecoilValue(isLoginSelector);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location?.state?.redirectedFrom?.pathname || "/";

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/api/user/login", { id: id, password: password }).then((res) => {
          const data = res.data;
          if (data.loginSucces) {
            setAccessToken(res.data.token);
            navigate(from);
          } else {
            alert(data.message);
          }
        }).catch((err) => {
          console.log(err);
          alert(err);
        });
      };

    return (
      <>
        <FormWrapper onSubmit={handleSubmit}>
            <InputWrapper>
                ID
                <input
                type="text"
                autoFocus
                placeholder="아이디를 입력해주세요"
                onChange={(e) => {
                    setId(e.target.value);
                }}
                />
            </InputWrapper>
            <InputWrapper>
                Password
                <input
                type="password"
                placeholder="패스워드를 입력해주세요"
                onChange={(e) => setPassword(e.target.value)}
                />
            </InputWrapper>
            <Button type="submit">로그인</Button>
        </FormWrapper>
        <Button><Link to= '/sign' className="links">회원가입</Link></Button>
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > input {
    padding: 8px 16px;
    border: 1px solid #eee;
  }
`;
 


export default Login;
  