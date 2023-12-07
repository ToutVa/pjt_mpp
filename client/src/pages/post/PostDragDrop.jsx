import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "css/post.css";
import baseImgUrl from  "assets/icon-file.svg";



const PostDragDrop = () => {
  const [files, setFiles] = useState();

  const addFile = (file) => {
    if(files.length === 0){
      var imgWrap = document.getElementById('preview');
      imgWrap.src = baseImgUrl;
    }else{
      setFiles(files);
      
      files.forEach((val, idx) => {
        if(val.type.split("/")[0] === "image") {
          
        }
      });
      

      

      var reader = new FileReader();
      reader.onload = function(){
        var dataURL = reader.result;
        var imgWrap = document.getElementById('preview');
        imgWrap.src = dataURL;
      };
      reader.readAsDataURL(files[0]);
    }
  }

  //File OnChange 이벤트 함수
  const onLoadFile = (e) => {
    const files = e.target.files;
    addFile(files);
  };

  //기본 DragOver 이벤트 제거 함수
  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }
  //File Drag & Drop 이벤트 함수
  const onDropFile = (e) => {
    debugger;
    e.preventDefault();

    const files = e.dataTransfer.files;
    addFile(files);
  };



  return (
    <>
    <div className="PostDragDrop" onDrop={onDropFile} onDragOver ={onDragOver}>
      <h4>새 게시물 만들기</h4>

      <div className="imgWrap" >
        <img id="preview" src ={baseImgUrl} alt= ""/>
      </div>  

      <form>
        <input type="file" className="file" onChange={onLoadFile} />
        <p className="previewMsg">사진을 여기에 끌어다 놓으세요.</p>
        <Button type="submit">사진 선택 완료</Button>
      </form>
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
`;
 


export default PostDragDrop;
  