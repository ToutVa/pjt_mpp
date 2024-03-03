import React, { useEffect, useState } from 'react';
import util from 'comm/util';
import 'css/post.css';

const TimeLine = (props) => {
  const imgList  = props?.imgList;
  const changeFn = props?.change;
  const hoverFn = props?.hover;

  //클릭이벤트(이미지, 포인트)
  const imageOnClick = (e) => {
    imgList.forEach((item,idx)=> {
      let ele = document.getElementById("timeline"+idx);
      util.removeClass(ele,"active");
      if(e.currentTarget.id == ele.id) {
        util.addClass(ele,"active");
        changeFn(item);
      }
    });
  }

  //클릭이벤트(이미지, 포인트)
  const imageOnMouseEnter = (e) => {
    imgList.forEach((item,idx)=> {
      let ele = document.getElementById("timeline"+idx);
      util.removeClass(ele,"active");
      if(e.currentTarget.id == ele.id) {
        hoverFn(item);
      }
    });
  }

  const makePoint = () => {
    let element = [];
    imgList.forEach((item,idx)=> {
      element.push(
        <li key={idx} onClick={imageOnClick} onMouseEnter={imageOnMouseEnter} id ={"timeline"+idx}>
          <div className={"point " + idx} />
          <img className='img' src={item.location} />
          <div className='desc'>
            사진의 간략한 정보가 이쪽에 표기됩니다.
            <table>
              <thead></thead>
              <tbody>
                <tr><td>촬영시간</td><td>2024/02/15</td></tr>
                <tr><td></td><td></td></tr>
              </tbody>
            </table>
          </div>
        </li>
      )
    });
    return element;
  }

  useEffect(() => {

  }, []);

  return (
    <>
      <div className='time-line_v'>
        <div className='area'></div>
        <div className='bar'>
          {makePoint()}
        </div>
      </div>
    </>
  );
};

export default TimeLine;
