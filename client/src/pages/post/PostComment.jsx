import { useEffect, useState } from "react";
import axios from "axios";


const PostComment = (props) => {
  const postId = props.postId;
  let elements =[];
  props.commentList.forEach((val, idx) => {
    elements.push(<div key={idx} className="content">
      <div className="profile mr10 ml5"/>
      <div className="detail">
        <span className="id">{val.id}</span><span className="id ml15">{val.date}</span>
        <p className="id">{val.content}</p>
      </div>
    </div>);
  });

  
  return (
    <>
      {elements}
      <div>
        <input className="mb15 mt15" type="text" placeholder="댓글을 입력해 주세요"/>
      </div>
    </>
  );
}

export default PostComment;