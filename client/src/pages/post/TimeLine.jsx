import React, { useEffect, useState } from 'react';
import 'css/post.css';

const TimeLine = (props) => {
  const imgList = props?.imgList;

  const makePoint = () => {
    let element = [];
    imgList.forEach((item,idx)=> {
      element.push(
        <li key={idx}>
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
