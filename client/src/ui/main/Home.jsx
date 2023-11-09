import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  return (
    <>
      <h2>테스트 페이지</h2>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;
  gap: 16px;
  & a:last-child > button {
    border-bottom: 3px solid #b61a84;
  }
  & a:first-child > button {
    border-bottom: 3px solid #00a5ba;
  }
`;
const Button = styled.button`
  border: 1px solid #aaa;
  width: 200px;
  padding: 36px;
  border-radius: 16px 16px 0 0;
  font-size: 24px;
  font-weight: bold;
`;

export default Home;
