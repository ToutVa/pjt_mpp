import React, { useEffect, useState } from 'react';
import FeedComment from './FeedComment';
import { Link } from 'react-router-dom';
import 'css/post.css';
import { useRecoilValue } from 'recoil';
import { isLoginSelector } from 'comm/recoil/TokenAtom';

import useModals from '../../hooks/useModals';
import { modals } from '../../comm/Modals';

import util from 'comm/util';
const FeedItem = (props) => {
  const { openModal } = useModals();

  const alertModal = (msg) => {
    openModal(modals.alertModal, {
      msg: msg,
    });
  };

  const isLogin = useRecoilValue(isLoginSelector);
  const [comment, setComment] = useState([]);
  const [imgAry] = useState(props.content?.imgList);
  const [fileNum = 0, setFileNum] = useState();

  const fnLoadComment = () => {

    let commentList = [];

    if (comment.length === 0) {
      //통신 함수 호출
      commentList = [
        { id: 'kwon', date: '20231027', content: '여기 ㄱㄱ' },
        { id: 'kim', date: '20231231', content: '와...잘찍으신다' },
        {
          id: 'kasdajsf',
          date: '20231209',
          content: '@@@@###히오스 지금 접속 시 캐릭터 지급$ ###@@@',
        },
      ];
    }
    setComment(commentList);
  };

  // setState 비동기 오류로 인해 useEffect 함수 따로 설정하여 로직 추가. file 미리보기로직
  useEffect(() => {
    // 이미지 파일 없으면 return
    if (imgAry === undefined) return;
    // 이미지 src 경로 설정
  }, [fileNum, imgAry]);

  // file 이미지 move 함수, fileNum만 설정한다. 이후 useEffect설정 .
  const onClickImgMove = (e, val) => {
    //네비게이션 Array
    let naviArr = e.currentTarget.parentNode.getElementsByClassName("point");
    let newIdx;
    // left 값일 경우 fileNum 0 이면 그대로
    if (val === 'left' && fileNum > 0) {
      setFileNum(fileNum - 1);
      newIdx = fileNum - 1;
    }
    // right일 때, max값 설정
    else if (val === 'right' && fileNum < imgAry.length - 1) {
      setFileNum(fileNum + 1);
      newIdx = fileNum + 1;
    }else {
      return;
    }
    for(let i=0; i<naviArr.length; i ++) {
      if(i === newIdx) util.addClass(naviArr[i], "active");
      else             util.removeClass(naviArr[i], "active");
    }
  };

  //네비게이션 클릭이벤트
  const onNaviClickImgMove = (e, val) => {
    //네비게이션 Array
    let naviArr = e.target.parentNode.getElementsByTagName("div");
    for(let i=0; i<naviArr.length; i ++) {
      if(i === val) util.addClass(naviArr[i], "active");
      else          util.removeClass(naviArr[i], "active");
    }

    setFileNum(val);
  };

  //좋아요 클릭
  const fnChangeLike = () => {
    if (!isLogin) alertModal('로그인을 해주세요.');
  };

  if (props.content._id === null) {
    return <div>더 이상 데이터가 없습니다.</div>;
  } else {
    return (
      <div className='item'>
        <div className='title-bar'>
          <div className='user' />
          <div>
            <Link to={'/post/' + props.content._id} className='title'>
              {props.content.title}
            </Link>
            <div className='user-id'>ec_asd</div>
          </div>
        </div>
        <div className='content'>
          <div className='img-list' style={{transform: "translateX("+(-100*fileNum)+ "%)" }}>
            {imgAry.map((item, idx)=> {
              return (
                <div className='img' key={idx}>
                  <img src={item?.location}></img>
                </div>
              );
            })}
          </div>
          {imgAry.length > 1 ? (
            <>
              <button className='left-arrow' onClick={(e) => onClickImgMove(e,'left')}/>
              <button className='right-arrow' onClick={(e) => onClickImgMove(e,'right')}/>
            </>
          ) : (
            <div></div>
          )}         
          {props.content.content}
          <div className='navigation'>
            {imgAry.length > 1 ? 
              imgAry.map((item, idx) => {
                return(<div className={'point' + (idx===0? " active":"")} key={idx} onClick={(e)=>{onNaviClickImgMove(e, idx)}} />);
              }) 
              : 
              <></>
            }
          </div>
        </div>
        <div className='bottom'>
          <div className='icon-group'>
            <button className='like' onClick={fnChangeLike} />
            <button className='comment' onClick={fnLoadComment} />
          </div>
          {comment.length > 0 ? (
            <div className='comment-area' id='comment-area'>
              <FeedComment commentList={comment} />
              <div>
                <input
                  readOnly={!isLogin}
                  className='mb15 mt15'
                  type='text'
                  placeholder={
                    isLogin ? '댓글을 입력해 주세요' : '로그인을 해주세요.'
                  }
                />
              </div>
              <div className='more'>더보기 +</div>
            </div>
          ) : (
            <></>
          )}
          {props.content.like}
        </div>
      </div>
    );
  }
};

export default FeedItem;
