import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import 'css/post.css';
import baseImgUrl from 'assets/icon-file.svg';

const PostTimeline = (props) => {
  // parameter 설정
  const location = useLocation();
  const selectFiles = { ...location.state.files };

  // 이미지 container 담아주는 배열
  const [imgAry, setImgAry] = useState();

  useEffect(() => {
    const files = selectFiles;
    if (files === undefined) return;

    // imgContents 저장 array
    let imgCont = [];

    // files 가 Object 형식으로 받아와서 for문 체크
    for (let key in files) {
      imgCont.push(
        <img
          id={'preview' + key}
          src={baseImgUrl}
          alt=''
          style={{ width: 150, height: 150, marginLeft: 10, marginRight: 10}}
          onClick={(e) => { props.propsFunction(e)}}
        />
      );
    }

    setImgAry(imgCont);
  }, []);

  // imgAry가 변경될 때 실행됨.
  useEffect(() => {
    const files = selectFiles;
    // fileReader 열기

    for (let key in files) {
      const reader = new FileReader();
      reader.onload = function () {
        var dataURL = reader.result;
        var imgWrap = document.getElementById('preview' + key);
        imgWrap.src = dataURL;
      };

      // 미리보기 설정
      reader.readAsDataURL(files[key]);
    }
  }, [imgAry]);

  return (
    <div className='time-line'>
      <div className='area'>{imgAry}</div>
      <div className='btn-grp'>
        <button>사진추가</button>
        <button>사진삭제</button>
      </div>
      <div className='bar'>
        <div className='point'></div>
      </div>
    </div>
  );
};

export default PostTimeline;
