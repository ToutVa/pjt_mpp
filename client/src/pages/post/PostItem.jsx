import React, { useState } from "react";
import FeedComment from "../feed/FeedComment";
import { Link } from "react-router-dom";

const PostItem = (props) => {
  const [comment, setComment] = useState([]);
  if(props.content._id =="eod") debugger;
  const fnLoadComment = () => {
    //통신 함수 호출
    const commentList = [{id : "kwon", date : "20231027", content:"여기 ㄱㄱ"},
                         {id : "kim", date : "20231231", content:"와...잘찍으신다"},
                         {id : "kasdajsf", date : "20231209", content:"@@@@###히오스 지금 접속 시 캐릭터 지급$ ###@@@"},]
    setComment(commentList);

  }
  if(props.content._id === null) {
    return (<div>더 이상 데이터가 없습니다.</div>)
  }else {
    return (
      <div className="item">
        <div className="title-bar">
            <div className="user" />
            <div>
                <Link to={"/post/"+props.content._id} className="title">
                    {props.content.title}
                </Link>
                <div className="user-id">
                  ec_asd
                </div>
            </div>
        </div>
        <div className="map"> MAP AREA </div>
        <div className="content">
          <img src = {props.content?.imgList?.[0]?.location} height="400" width="650"></img>
          {props.content.content}
        </div>
        <div className="bottom">
          <div className="icon-group">
            <button className="like" />
            <button className="comment" onClick={fnLoadComment}/>
          </div>
          {comment.length > 0 ?
          <div className="comment-area" id="comment-area">
            <FeedComment commentList={comment}/>
  
            <div><input className="mb15 mt15" type="text" placeholder="댓글을 입력해 주세요"/></div>
            <div className="more">더보기 +</div>
          </div>
          :<></>
          }
          {props.content.like}
        </div>
      </div>
    );
  }
  
};

export default PostItem;
