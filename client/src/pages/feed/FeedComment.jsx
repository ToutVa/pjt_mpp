
  const FeedComment = (props) => {
    const commentList = props.commentList || [];
    let elements =[];

    commentList.forEach((val, idx) => {
      elements.push(<div key={idx} className="content">
        <div className="profile mr10 ml5"/>
        <div className="detail">
          <span className="id">{val.userEmail}</span><span className="id ml15">{val.registDate}</span>
          <p className="id">{val.content}</p>
        </div>
      </div>);
    });
    
    return elements;
  }

  export default FeedComment;