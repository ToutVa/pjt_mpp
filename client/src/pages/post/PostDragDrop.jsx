import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "css/post.css";
import baseImgUrl from  "assets/image.png";



const PostDragDrop = () => {
  const [files, setFiles] = useState();

  const onLoadFile = (e) => {
    const files = e.target.files;
    console.log(files);
    if(files.length == 0){
      var imgWrap = document.getElementById('preview');
      imgWrap.src = baseImgUrl;
    }else{
      setFiles(files);

      var reader = new FileReader();
      reader.onload = function(){
        var dataURL = reader.result;
        var imgWrap = document.getElementById('preview');
        imgWrap.src = dataURL;
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <>
    <div className="PostDragDrop">
      <h4>새 게시물 만들기</h4>

      <div className="imgWrap">
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
  