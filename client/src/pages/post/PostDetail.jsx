import axios from "axios";
import PostItem from "pages/post/PostItem";
import React, { useEffect, useState, useRef  } from "react";
import util from "comm/util";
import TimeLine from "./TimeLine";
import { useParams } from "react-router-dom";
import PostComment from "./PostComment";
import PostMap from "./PostMap";

const PostDetail = (match) => {
  const param                     = useParams();
  const [item, setItem]           = useState();
  const [imgList, setImgList]     = useState();
  const [focusImg , setFocusImg]  = useState();
  const postMapComp = useRef();

  const commentList = [{id : "kwon", date : "20231027", content:"여기 ㄱㄱ"},
                       {id : "kim", date : "20231231", content:"와...잘찍으신다"},
                       {id : "kasdajsf", date : "20231209", content:"@@@@###히오스 지금 접속 시 캐릭터 지급$ ###@@@"},];

  const getPost = async () => {
    let loadUrl = '/api/post/getPostDtl';
    await axios.post(loadUrl, {id : param.postId}).then((res) => {
      if(res.data.success) {
        setItem(res.data.post[0]);
        setImgList(res.data.post[0].imgList);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  
  const changeImg = (item) => {
    setFocusImg(item.location);
  }
  const hoverImg = (item) => {
    postMapComp.current.moveMap(item.uymkX, item.uymkY);
  }
  const onClickImg = (e) => {
    setFocusImg();
  }

  const mapConfig = {
    id   : "testMap",       //맵 ID(한화면에 ID 겹치는 맵 생기면 오류남)
    mode : "point",         //point, view, all     default : all
    lat : imgList ? imgList[0].uymkX : "" ,           //초기경도
    lng : imgList ? imgList[0].uymkY : "" ,          //초기위도
    scale : 8,                                      //지도 줌 레벨
    points : imgList,
    clickEvent : "move",                      //클릭이벤트 (def: point, move)
    useLine : true,                           //point가 있을경우에만 사용 가능, 마커를 선으로 연결
    clickCallback : (e) => {//맵 클릭 값 반환 함수
      console.log(e.utmk.x, e.utmk.y);  //좌표반환
    },  
  }

  useEffect(() => {
    getPost();
  }, []);

  if(util.isEmpty(item)) {
    return(<><div id="map"/></>);
  }else {
    return(
      <div className='main-frame post'>
        <div className='left'></div>
        <div className='center' id="post">
        <div className="item">
          <div className="title-bar">
              <div className="user" />
              <div>
                  <div className="title">
                    {item.title}
                  </div>
                  <div className="user-id">
                    {item.userEmail}
                  </div>
              </div>
          </div>
          <PostMap ref={postMapComp} config={mapConfig} />
          <div id ="img-cont" className={"content " + (util.isEmpty(focusImg)? "":"active")} onClick={onClickImg}>
            <img src={focusImg} height="400" width="650"></img>
          </div>
          <div className="bottom">
            <div className="icon-group">
              <button className="like" />
            </div>
            <div className="comment-area" id="comment-area">
              <PostComment commentList={commentList}> </PostComment>
              <div className="more">더보기 +</div>
            </div>
          </div>
        </div>
        </div>
        <div className='right'>
        {util.isEmpty(imgList) ? <></>  : <TimeLine imgList = {imgList} change={changeImg} hover={hoverImg}/>}
        </div>
      </div>
    )     
  }
}
export default PostDetail;
