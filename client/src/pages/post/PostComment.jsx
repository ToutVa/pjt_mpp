import { useEffect, useState } from "react";

const FeedComment = (props) => {
  const postId = props.postId;
  let elements =[];
  const [commentArr, setCommentArr] = useState([]);
  
  //댓글 불러오기
  const getCommnet = () => {
    let loadUrl = '/api/post/comment';
    axios.post(loadUrl, {id : postId}).then((res) => {
      const data = res.data;
      if (data.success) {
        data.post.forEach((item,idx)=> {
          commentArr.push(item);
        });
      }
    }).catch((err) => {
      console.log(err);
    }, [itemAry]);
  }

  //더보기 버튼클릭이벤트
  const fnBtnMoreOnclick = (e) => {
    getCommnet();
  }

  useEffect(async ()=>{
    await getCommnet();
    let elements = [];

    commentArr.forEach((val, idx) => {
      elements.push(<div key={idx} className="content">
        <div className="profile mr10 ml5"/>
        <div className="detail">
          <span className="id">{val.id}</span><span className="id ml15">{val.date}</span>
          <p className="id">{val.content}</p>
        </div>
      </div>);
    });

  },[]);

  
  return (
    <div className="comment-area" id="comment-area">
      {elements}
      <div>
        <input className="mb15 mt15" type="text" placeholder="댓글을 입력해 주세요"/>
      </div>
      <div className="more" onClick={fnBtnMoreOnclick}>더보기 +</div>
    </div>
  );
}

export default FeedComment;