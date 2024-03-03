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
    console.log("item >> 위치정보 가져오기", item);
    postMapComp.current.moveMap(953825, 1953437);
  }
  const onClickImg = (e) => {
    setFocusImg();
    console.log();
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
                    ec_asd
                  </div>
              </div>
          </div>
          <PostMap ref={postMapComp}/>
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
        <img />
        </div>
        <div className='right'>
        {util.isEmpty(imgList) ? <></>  : <TimeLine imgList = {imgList} change={changeImg} hover={hoverImg}/>}
        </div>
      </div>
    )     
  }
}
export default PostDetail;
