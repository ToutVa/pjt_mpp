import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "css/post.css";
import baseImgUrl from  "assets/icon-file.svg";
import { useNavigate } from 'react-router';
import axios from "axios";



const PostDragDrop = () => {
  const [files, setFiles] = useState();
  const [maxFileCnt, setMaxFileCnt] = useState(10);
  const fileInput = React.createRef();
  const navigate = useNavigate();
  
  /* 컴퓨터에서 선택 버튼 클릭이벤트 */
  const handleButtonClick = e => {
    fileInput.current.click();
  };

  /* 파일 state 저장이벤트 */
  const addFile = (fileArr) => {
    console.log("fileArr",fileArr.length);
    console.log("files",files);
    if(fileArr.length === 0){
      if(files === undefined){
        var imgWrap = document.getElementById('preview');
        imgWrap.src = baseImgUrl;
      }
    }else if(fileArr.length > maxFileCnt) {
      alert("첨부파일은 최대 " + maxFileCnt + "개 까지 첨부 가능합니다.");

      document.querySelector("input[type=file]").value = ""; // 초기화
    }else if(fileArr.length > 0){
      var reader = new FileReader();
      reader.onload = function(){
        var dataURL = reader.result;
        var imgWrap = document.getElementById('preview');
        imgWrap.src = dataURL;
      };

      setFiles(fileArr);
      reader.readAsDataURL(fileArr[0]);
    }
  }

  //File OnChange 이벤트 함수
  const onLoadFile = (e) => {
    const fileArr = e.target.files;
    addFile(fileArr);
  };

  //기본 DragOver 이벤트 제거 함수
  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }
  //File Drag & Drop 이벤트 함수
  const onDropFile = (e) => {
    e.preventDefault();

    const fileArr = e.dataTransfer.files;
    addFile(fileArr);
  };

  const handleSubmit = () => {
    if(files == undefined){
      alert("선택된 이미지가 존재하지 않습니다.");
    }else {
      navigate('/posting', {state : {files}});
    }
  }


  return (
    <>
    <div className="post-drag-drop" onDrop={onDropFile} onDragOver ={onDragOver}>
      <h4>새 게시물 만들기</h4>

      <div className="img-wrap" >
        <img id="preview" src ={baseImgUrl} alt= ""/>
      </div>  


        <p className="preview-msg">사진을 여기에 끌어다 놓으세요.</p>
        <div>
          <input type="file" id = "selectedFiles" className="file" ref={fileInput}
                 multiple    accept = "image/jpg,image/png,image/jpeg"
                 onChange={onLoadFile} />
          <Button onClick={handleButtonClick}>컴퓨터에서 선택</Button>
          <Button onClick={handleSubmit}>이미지선택 완료</Button>
        </div>
    </div>
    </>
  )
}

const Button = styled.button`
  width: 24rem;
  height: 2rem;
  background-color: rgb(97, 184, 156);
  border-radius: 1rem;
  border : 1px rgb(97, 184, 156);
  color: #fff;
  margin-bottom : 10px;
`;
 


export default PostDragDrop;
  