import React, { useEffect, useState } from 'react';
import FeedComment from './FeedComment';
import { Link } from 'react-router-dom';
import 'css/post.css';
import { useRecoilValue } from 'recoil';
import { isLoginSelector } from 'comm/recoil/TokenAtom';
import axios from 'axios';

import useModals from '../../hooks/useModals';
import { modals } from '../../comm/Modals';

import util from 'comm/util';
import ConfirmModal from 'component/ConfirmModal';
const FeedItem = (props) => {
  const { openModal } = useModals();
  console.log(props);

  const alertModal = (msg) => {
    openModal(modals.alertModal, {
      msg: msg,
    });
  };

  const isLogin = useRecoilValue(isLoginSelector);
  const [comment, setComment] = useState([]);
  const [likes, setLikes] = useState([props.content.likes.length]);
  const [imgAry] = useState(props.content?.imgList);

  const [fileNum, setFileNum] = useState(0);

  // const [imgXpos, setImgXpos] = useState();
  const [leftPos, setLeftPos] = useState(0);
  let imgXpos;
  let leftPosTmp = 0;

  const [writeComment, setWriteComment] = useState([]);

  const fnLoadComment = () => {
    const _postId = props.content._id;
    try {
      axios.post('/api/comment/getComment',{ _postId : _postId})
      .then ((res) => {
        let data = res.data.comments;
        console.log(data);

        if (data.length === 0) {
          data = [
            { id: 'kwon', registDate: '20231027', content: '여기 ㄱㄱ' },
            { id: 'kim', registDate: '20231231', content: '와...잘찍으신다' },
            {
              id: 'kasdajsf',
              registDate: '20231209',
              content: '@@@@###히오스 지금 접속 시 캐릭터 지급$ ###@@@',
            },
          ];
        }
        setComment(data);
      }).catch((err) => {
        console.log(err);
      })
    } catch (err) {
      alert(err.response.data.message);
    }   
    
  };

  // setState 비동기 오류로 인해 useEffect 함수 따로 설정하여 로직 추가. file 미리보기로직
  useEffect(() => {
    // 이미지 파일 없으면 return
    if (imgAry === undefined) return;
    // 이미지 src 경로 설정
  }, [fileNum, imgAry]);

  // file 이미지 move 함수, fileNum만 설정한다. 이후 useEffect설정 .
  const onClickImgMove = (e, val) => {
    // left 값일 경우 fileNum 0 이면 그대로
    if (val === 'left' && fileNum > 0) {
      setFileNum(fileNum - 1);
    }
    // right일 때, max값 설정
    else if (val === 'right' && fileNum < imgAry.length - 1) {
      setFileNum(fileNum + 1);
    }else {
      return;
    }
  };

  //네비게이션 클릭이벤트
  const onNaviClickImgMove = (e, val) => {
    setFileNum(val);
  };

  //드래그 중 이벤트
  const moveDrag =(e)=> {
    let dmvx = imgXpos - e.clientX;
    if(dmvx < 1 && dmvx < -(fileNum*650)) {
        setLeftPos(0);
        leftPosTmp = dmvx
    }else if(dmvx > ((imgAry.length-(fileNum+1)))*650) {
      setLeftPos(((imgAry.length-(fileNum+1)))*650);
      leftPosTmp = dmvx
    }else {
      setLeftPos(dmvx);
      leftPosTmp = dmvx
    }
    return false;
  }

  //드래그 중단 이벤트
  const stopDrag = (e) => {
    e.preventDefault();
    let moveCnt = Math.floor(leftPosTmp/650);
    if(leftPosTmp%650 > 340) moveCnt ++;
    
    if(fileNum + moveCnt < 0) {
      setFileNum(0);
    }else if(fileNum + moveCnt > imgAry.length - 1) {
      setFileNum(imgAry.length - 1);
    }else {
      setFileNum(fileNum + moveCnt);
    }
    document.getElementById("imgList").style.transition = `all 0.3s ease 0s`;
    setLeftPos(0);
    
    //이벤트 제거
    document.onmousemove = null;
    document.onmouseup = null;
    return false;
  }

  //최초 드래그 시작
  const onImageDragStart = (e) => {
    let obj = e.currentTarget;

    //최초 좌표값
    imgXpos = e.clientX;

    obj.style.transition = `all 0.0s`;  //드래그하는동안 애니메이션 제거
    document.onmousemove = moveDrag;
    document.onmouseup = stopDrag;
  }

  const tset = () => {
    // return(<ConfirmModal onSubmit={()=>{ }}, onClose={}, msg={""}, wid="500px", hei="600"/>)
  }

  //좋아요 클릭
  const fnChangeLike = (e) => {
    if (!isLogin) alertModal('로그인을 해주세요.');

    const btnId = `btnLike${props.content._id}`;
    const btnRes = document.getElementById(btnId);
    

    let likeUrl = '';

    if (btnRes.className === 'like') {
      likeUrl = '/api/like/delete';
    } else {
      likeUrl = '/api/like/create';
    }

    const _postId = props.content._id;
    const data = {
      _postId : _postId,
    }

    try {
      axios
        .post(likeUrl, data)
        .then((res) => {
          console.log(res);
          alert(res.data.message);

          if (btnRes.className === 'like') {
            btnRes.className = 'unlike';
            setLikes(Number(likes) - 1);
          } else {
            btnRes.className = 'like';
            setLikes(Number(likes) + 1);
          }
          
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      alert(err.response.data.message);
    } 
  };

  // 댓글 등록 
  const createComment = (e) => {
    if (!isLogin) alertModal('로그인을 해주세요.');

    const _postId = props.content._id;
    const content = writeComment;

    const data = {
      _postId : _postId, 
      content : content
    }

    try {
      axios
        .post('/api/comment/create', data)
        .then((res) => {
          // alert(res.data.message);
          fnLoadComment();
          document.getElementById('commnetContent' + props.content._id).value = '';
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      alert(err.response.data.message);
    }    
  }

  const  fnOnchangeComment = (e) => {
    setWriteComment(e.target.value);
  }

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
            <div className='user-id'>{props.content.userEmail}</div>
          </div>
        </div>
        <div className='content'>
          <div id="imgList" className='img-list' style={{left: -leftPos+"px", transform: "translateX("+(-100*fileNum)+ "%)"}} onMouseDown={onImageDragStart}>
            {imgAry.map((item, idx)=> {
              return (
                <Link to={'/post/' + props.content._id} className='img' key={idx}>
                  <img src={item?.location}></img>
                </Link>
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
                return(<div className={'point' + (fileNum===idx? " active":"")} key={idx} onClick={(e)=>{onNaviClickImgMove(e, idx)}} />);
              }) 
              : 
              <></>
            }
          </div>
        </div>
        <div className='bottom'>
          <div className='icon-group'>
            <div>{likes} 명이 좋아합니다.</div>
            <button id = {'btnLike' + props.content._id} className= { (props.content.likeChk.length > 0) ? 'like' : 'unlike'} onClick={fnChangeLike} />
            <button className='comment' onClick={fnLoadComment} />
          </div>
          {comment.length > 0 ? (
            <div className='comment-area' id='comment-area'>
              <FeedComment commentList={comment} />
              <div className='bottom mb15 mt15' > 
                <div className='user mr10 ml5'/>
                <div className='input-area '>
                  <textarea
                    id = {'commnetContent' + props.content._id}
                    readOnly={!isLogin}
                    type='text'
                    placeholder={
                      isLogin ? '댓글을 입력해 주세요' : '로그인을 해주세요.'
                    }
                    disabled = {isLogin?"" : "disabled"}
                    onChange={fnOnchangeComment}
                  />
                  <button id = 'commentC' className='submit' onClick={createComment}>등록</button>
                  </div>
              </div>
              <div className='more' onClick={tset}>더보기 +</div>
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
