import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import 'css/post.css';
import '../../css/component.css';
import { useRecoilState } from 'recoil';
import { postingFiles } from 'comm/recoil/FileAtom';

const PostTimeline = (props) => {
  // parameter 설정
  const [postingFile, setPostingFile] = useRecoilState(postingFiles);

  // 이미지 container 담아주는 배열
  const [imgAry, setImgAry] = useState();

  const timeLineClass = 'time-line ' + props?.type;

  useEffect(() => {
    const files = postingFile;
    if (files === undefined) return;
    
    console.log("tileLine files=>", files);
    console.log("tileLine postingFile=>", postingFile);
    // imgContents 저장 array
    let imgCont = [];
    
    // files 가 Object 형식으로 받아와서 for문 체크
    for (let key = 0; key < files.length; key++) {
      imgCont.push(
        <img
          key = {key}
          id={'preview' + key}
          src={files[key].name}
          alt=''
          className='no-img-drag'
          style={{ width: 100, height: 100, marginLeft: 10, marginRight: 10}}
          onClick={(e) => { props.propsFunction(e)}}
        />
      );
    }

    setImgAry(imgCont);
  }, []);

  // imgAry가 변경될 때 실행됨.
  useEffect(() => {
    const files = postingFile;
    // fileReader 열기

    for (let key = 0; key < files.length; key++) {
      const reader = new FileReader();
      reader.onload = function () {
        let dataURL = reader.result;
        let imgWrap = document.getElementById('preview' + key);
        imgWrap.src = dataURL;
      };

      // 미리보기 설정
      reader.readAsDataURL(files[key]); 
    }
  }, [imgAry]);

  return (
    <div className={timeLineClass} >
      <div className='area'>{imgAry}</div>
      <div className='bar'>
        <div className='point'></div>
      </div>
    </div>
  );
};

export default PostTimeline;
