import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'css/post.css';
import { useNavigate } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { postingFiles, totalfileCntSelector } from 'comm/recoil/FileAtom';
import exifr from 'exifr/dist/full.esm.mjs'; // to use ES Modules
import util from 'comm/util';

import Modal from 'react-modal';
import Posting from './Posting';

const PostDragDrop = () => {
  const [postingFile, setPostingFile] = useRecoilState(postingFiles);
  const totalfileCnt = useRecoilValue(totalfileCntSelector);
  const [maxFileCnt] = useState(10);

  const [fileNum = 0, setFileNum] = useState();
  const [imgMetaAry, setImgMetaAry] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const fileInput = React.createRef();
  const navigate = useNavigate();

  /* 사진추가 버튼 클릭이벤트 */
  const handleButtonClick = (e) => {
    fileInput.current.click();
  };

  /* 사진삭제 버튼 클릭이벤트 */
  const cancleButtonClick = (e) => {
    let fileArray = Array.from(postingFile);
    fileArray.splice(fileNum, 1);

    setPostingFile(fileArray);
    setFileNum(fileNum - 1);
  };

  /* 포스팅 버튼 클릭이벤트 */
  const PostingModalButton = (props) => {
    console.log('modalIsOpen', modalIsOpen);
    return (
      <>
        <button
          type='button'
          className='btn-primary auto'
          onClick={() => {
            handleSubmit();
          }}
        >
          {props.label}
        </button>
        <Modal
          className='test'
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          ariaHideApp={false}
        >
          <Posting props = {imgMetaAry}/>
        </Modal>
      </>
    );
  };

  /* 파일 state 저장이벤트 */
  const addFile = (fileArr) => {
    // file length 0 일경우 base URL 설정
    if (fileArr.length === 0) {
      // 기존에 선택한 파일 체크
      if (postingFile !== undefined) return;
      const imgWrap = document.getElementById('preview');
      imgWrap.src = postingFile.url;
      return;
    }

    // file length 10> 일경우 alert창 표시 및 초기화
    if (fileArr.length > maxFileCnt) {
      alert('첨부파일은 최대 ' + maxFileCnt + '개 까지 첨부 가능합니다.');
      document.querySelector('input[type=file]').value = ''; // 초기화
      return;
    }

    // file reader 생성 및 초기 이미지 셋팅
    const reader = new FileReader();
    reader.onload = function () {
      let dataURL = reader.result;
      let imgWrap = document.getElementById('preview');
      imgWrap.src = dataURL;
    };

    // file 세팅
    setPostingFile(fileArr);
    reader.readAsDataURL(fileArr[fileNum]); // fileNum 초기값  0
  };

  //File OnChange 이벤트 함수
  const onLoadFile = (e) => {
    addFile(e.target.files);
  };

  //기본 DragOver 이벤트 제거 함수
  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  //File Drag & Drop 이벤트 함수
  const onDropFile = (e) => {
    e.preventDefault();

    addFile(e.dataTransfer.files);
  };

  // file 확인 이벤트
  const handleSubmit = () => {
    const fetchData = async () => {
      console.log('postingFile', postingFile[0], postingFile.length);
      if (postingFile[0] === undefined || postingFile.length === 0) {
        alert('선택된 이미지가 존재하지 않습니다.');
        return;
      }

      // 현재위치정보 가져오기
      const geoInfo = await getLocation();

      // 사진 메타데이터 가져오기
      const metaAry = [];
      for (let idx = 0; idx < postingFile.length; idx++) {
        const imgInfo = await exifr.gps(postingFile[idx]);

        // 사진에 메타데이터 설정, 사진정보의 메타 or 현재위치정보설정
        metaAry.push({
          'fileName': postingFile[idx].name,
          'latitude': imgInfo?.latitude || geoInfo?.latitude,
          'longitude': imgInfo?.longitude || geoInfo?.longitude,
        });
      }

      // posting 화면으로 이동
      // navigate('/posting', { state: { postingFile, imgMetaAry } });

      console.log('MetaAry',metaAry);
      setImgMetaAry(metaAry);
      setModalIsOpen(true);
    };
    fetchData();
  };

  // file 이미지 move 함수, fileNum만 설정한다. 이후 useEffect설정 .
  const onClickImgMove = (val) => {
    // left 값일 경우 fileNum 0 이면 그대로
    if (val === 'left' && fileNum > 0) {
      setFileNum(fileNum - 1);
      return;
    }

    // right일 때, max값 설정
    if (val === 'right' && fileNum < postingFile.length - 1) {
      setFileNum(fileNum + 1);
    }
  };

  // setState 비동기 오류로 인해 useEffect 함수 따로 설정하여 로직 추가. file 미리보기로직
  useEffect(() => {
    // file undefined 상태면 return
    if (postingFile[fileNum] === undefined) return;

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

    reader.readAsDataURL(postingFile[fileNum]);
  }, [fileNum]);

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        const now = new Date();
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              err: 0,
              time: now.toLocaleTimeString(),
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (err) => {
            resolve({
              err: -1,
              latitude: -1,
              longitude: -1,
            });
          },
          { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
        );
      } else {
        reject({ error: -2, latitude: -1, longitude: -1 });
      }
    });
  };

  return (
    <>
      <div
        className='post-drag-drop mt60'
        onDrop={onDropFile}
        onDragOver={onDragOver}
      >
        <div className='img-wrap'>
          {!util.isEmpty(totalfileCnt) ? (
            <button
              className='left-arrow'
              onClick={() => onClickImgMove('left')}
            />
          ) : (
            <div></div>
          )}
          <img id='preview' src={postingFile.url} alt='' />
          {!util.isEmpty(totalfileCnt) ? (
            <button
              className='right-arrow'
              onClick={() => onClickImgMove('right')}
            />
          ) : (
            <div></div>
          )}
        </div>
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
          <div>
            {util.isEmpty(totalfileCnt) ? (
              <p className='preview-msg'>사진을 여기에 끌어다 놓으세요.</p>
            ) : (
              <p className='preview-msg'>
                총 {totalfileCnt}장이 선택되었습니다.
              </p>
            )}
            <div className='btn-group mt20 flex'>
              <div className='row'>
                <button
                  type='submit'
                  className='btn-primary wd150'
                  onClick={handleButtonClick}
                >
                  {util.isEmpty(totalfileCnt) ? '사진 추가' : '다시 선택'}
                </button>
                <button
                  type='submit'
                  className='btn-cancel wd150'
                  onClick={cancleButtonClick}
                >
                  사진 삭제
                </button>
              </div>
            </div>
            <div className='btn-group'>
              <div className='row medium'>
                <PostingModalButton label={'포스팅'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Button = styled.button`
  background-color: #00a5ba;
  border-radius: 1rem;
  border: 1px #00a5ba;
  color: #fff;
  margin-bottom: 10px;
`;

export default PostDragDrop;
