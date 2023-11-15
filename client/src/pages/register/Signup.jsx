import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoginSelector } from "comm/recoil/TokenAtom";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";



const Signup = () => {
    const [id, setId] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [birth, setBirth] = useState();
    const [gender, setGender] = useState();
    const [cellPhone, setCellPhone] = useState();
    const [email, setEmail] = useState();

    //const setAccessToken = useSetRecoilState();
    //const isLogin = useRecoilValue(isLoginSelector);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location?.state?.redirectedFrom?.pathname || "/";

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/api/user/sign",{ id: id
                                    , password: password
                                    , name : name
                                    , birth : birth
                                    , gender : gender
                                    , cellPhone :cellPhone
                                    , email : email })
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
                ID
                <input
                type="text"
                autoFocus
                placeholder="아이디를 입력해주세요"
                onChange={(e) => setId(e.target.value)}
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
            <InputWrapper>
                Name
                <input
                type="name"
                placeholder="이름을 입력해주세요"
                onChange={(e) => setName(e.target.value)}
                />
            </InputWrapper>
            <InputWrapper>
                birth
                <input
                type="birth"
                placeholder="생일를 입력해주세요"
                onChange={(e) => setBirth(e.target.value)}
                />
            </InputWrapper>
            <InputWrapper>
                gender
                <input
                type="성별"
                placeholder="성별을 선택해주세요"
                onChange={(e) => setGender(e.target.value)}
                />
            </InputWrapper>
            <InputWrapper>
                cellPhone
                <input
                type="cellPhone"
                placeholder="전화번호를 입력해주세요"
                onChange={(e) => setCellPhone(e.target.value)}
                />
            </InputWrapper>
            <InputWrapper>
                email
                <input
                type="email"
                placeholder="이메일을 입력해주세요"
                onChange={(e) => setEmail(e.target.value)}
                />
            </InputWrapper>
            <Button type="submit">회원가입</Button>
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > input {
    padding: 8px 16px;
    border: 1px solid #eee;
  }
`;
 


export default Signup;
  