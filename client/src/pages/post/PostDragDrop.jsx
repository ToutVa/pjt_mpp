import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'css/post.css';
import baseImgUrl from 'assets/icon-file.svg';
import { useNavigate } from 'react-router';

const PostDragDrop = () => {
  const [files, setFiles] = useState();
  const [maxFileCnt] = useState(10);
  const [fileNum = 0, setFileNum] = useState();
  const fileInput = React.createRef();
  const navigate = useNavigate();

  /* 컴퓨터에서 선택 버튼 클릭이벤트 */
  const handleButtonClick = (e) => {
    fileInput.current.click();
  };

  /* 파일 state 저장이벤트 */
  const addFile = (fileArr) => {
    console.log('files', files);
    // file length 0 일경우 base URL 설정
    if (fileArr.length === 0 && files === undefined) {
      const imgWrap = document.getElementById('preview');
      imgWrap.src = baseImgUrl;
      return;
    }

    // file length 10> 일경우 alert창 표시 및 초기화
    if (fileArr.length > maxFileCnt) {
      alert('첨부파일은 최대 ' + maxFileCnt + '개 까지 첨부 가능합니다.');
      document.querySelector('input[type=file]').value = ''; // 초기화
      return;
    }

    // file reader 생성 및 초기 이미지 셋팅 
    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result;
      var imgWrap = document.getElementById('preview');
      imgWrap.src = dataURL;
    };

    // file 세팅  
    setFiles(fileArr);
    reader.readAsDataURL(fileArr[fileNum]); // fileNum 초기값  0 
  };

  //File OnChange 이벤트 함수
  const onLoadFile = (e) => {
    const fileArr = e.target.files;
    addFile(fileArr);
  };

  //기본 DragOver 이벤트 제거 함수
  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  //File Drag & Drop 이벤트 함수
  const onDropFile = (e) => {
    e.preventDefault();

    const fileArr = e.dataTransfer.files;
    addFile(fileArr);
  };

  // file 확인 이벤트
  const handleSubmit = () => {
    if (files === undefined) {
      alert('선택된 이미지가 존재하지 않습니다.');
    }
    // posting 화면으로 이동
    navigate('/posting', { state: { files } });
  };

  // file 이미지 move 함수, fileNum만 설정한다. 이후 useEffect설정 .
  const onClickImgMove = (val) => {
    // left 값일 경우 fileNum 0 이면 그대로
    if (val === 'left' && fileNum > 0) {
      setFileNum(fileNum - 1);
      return;
    } 

    // right일 때, max값 설정
    if (val === 'right' && fileNum < files.length - 1) {
      setFileNum(fileNum + 1);
    }
  };

  // setState 비동기 오류로 인해 useEffect 함수 따로 설정하여 로직 추가. file 미리보기로직
  useEffect(() => {
    // file undefined 상태면 return
    if (files === undefined) return;

    // file reader 호출
    const reader = new FileReader();

    // file reader load
    reader.onload = function () {
      // dataurl 생성
      const dataURL = reader.result;
      // dataUrl 을 미리보기에 저장해줌.
      const imgWrap = document.getElementById('preview');
      // src에 경로 복사
      imgWrap.src = dataURL;
    };

    reader.readAsDataURL(files[fileNum]);
  }, [fileNum]);

  return (
    <>
      <div
        className='post-drag-drop'
        onDrop={onDropFile}
        onDragOver={onDragOver}
      >
        <h4>새 게시물 만들기</h4>

        <div className='img-wrap'>
          <button onClick={() => onClickImgMove('left')}>left</button>
          <img id='preview' src={baseImgUrl} alt='' />
          <button onClick={() => onClickImgMove('right')}>right</button>
        </div>

        <p className='preview-msg'>사진을 여기에 끌어다 놓으세요.</p>
        <div>
          <input
            type='file'
            id='selectedFiles'
            className='file'
            ref={fileInput}
            multiple
            accept='image/jpg,image/png,image/jpeg'
            onChange={onLoadFile}
          />
          <Button onClick={handleButtonClick}>컴퓨터에서 선택</Button>
          <Button onClick={handleSubmit}>이미지선택 완료</Button>
        </div>
      </div>
    </>
  );
};

const Button = styled.button`
  width: 24rem;
  height: 2rem;
  background-color: rgb(97, 184, 156);
  border-radius: 1rem;
  border: 1px rgb(97, 184, 156);
  color: #fff;
  margin-bottom: 10px;
`;

export default PostDragDrop;
