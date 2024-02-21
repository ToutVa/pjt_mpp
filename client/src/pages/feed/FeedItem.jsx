import React, { useEffect, useState } from 'react';
import FeedComment from './FeedComment';
import { Link } from 'react-router-dom';
import 'css/post.css';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoginSelector } from 'comm/recoil/TokenAtom';
import { alertModalState } from 'comm/recoil/PopupAtom';
const FeedItem = (props) => {
  const isLogin = useRecoilValue(isLoginSelector);
  const setAlertModalState = useSetRecoilState(alertModalState);
  const [comment, setComment] = useState([]);
  const [imgAry] = useState(props.content?.imgList);
  const [imgSrc, setImgSrc] = useState();
  const [fileNum = 0, setFileNum] = useState();

  const fnChangeLike = () => {
    if (!isLogin) {
      setAlertModalState({ msg: '로그인을 해주세요.' });
    }
  };

  console.log(props.content?.imgList?.[0]?.location);
  if (props.content._id === 'eod') debugger;
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
    setImgSrc(imgAry[fileNum]?.location);
  }, [fileNum, imgAry]);

  // file 이미지 move 함수, fileNum만 설정한다. 이후 useEffect설정 .
  const onClickImgMove = (val) => {
    // left 값일 경우 fileNum 0 이면 그대로
    if (val === 'left' && fileNum > 0) {
      setFileNum(fileNum - 1);
      return;
    }

    // right일 때, max값 설정
    if (val === 'right' && fileNum < imgAry.length - 1) {
      setFileNum(fileNum + 1);
    }
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
          {imgAry.length > 1 ? (
            <button
              className='left-arrow'
              onClick={() => onClickImgMove('left')}
            />
          ) : (
            <div></div>
          )}
          <img src={imgSrc} height='400' width='650' alt=''></img>
          {imgAry.length > 1 ? (
            <button
              className='right-arrow'
              onClick={() => onClickImgMove('right')}
            />
          ) : (
            <div></div>
          )}
          {props.content.content}
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
