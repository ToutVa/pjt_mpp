import React, { useState } from "react";
import FeedComment from "./FeedComment";

const FeedItem = (props) => {
  const [comment, setComment] = useState([]);

  const fnLoadComment = () => {
    //통신 함수 호출
    const commentList = [{id : "kwon", date : "20231027", content:"여기 ㄱㄱ"},
                         {id : "kim", date : "20231231", content:"와...잘찍으신다"},
                         {id : "kasdajsf", date : "20231209", content:"@@@@###히오스 지금 접속 시 캐릭터 지급$ ###@@@"},]
    setComment(commentList);
  }

  return (
    <div className="item">
      <div className="title-bar">
          <div className="user" />
          <div>
              <div className="title">
                  {props.content.title}
              </div>
              <div className="user-id">
                ec_asd
              </div>
          </div>
      </div>
      <div className="content">
        {props.content.content}
      </div>
      <div className="bottom">
        <div className="icon-group">
          <button className="like" />
          <button className="comment" onClick={fnLoadComment}/>
        </div>
        {comment.length > 0 ?
        <div className="comment-area" id="comment-area">
          <FeedComment commentList= {comment}/>
          <div className="more">더보기 +</div>
        </div>
        :<></>
        }
        {props.content.like}
      </div>
    </div>
  );
  
};

export default FeedItem;
