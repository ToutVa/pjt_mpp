
  const FeedComment = (props) => {
    const commentList = props.commentList || [];
    let elements =[];

    commentList.forEach((val, idx) => {
      elements.push(<div key={idx} className="content">
        <div className="profile mr10 ml5"/>
        <div className="detail">
          <span className="id">{val.id}</span><span className="id ml15">{val.date}</span>
          <p className="id">{val.content}</p>
        </div>
      </div>);
    });
    
    return elements;
  }

  export default FeedComment;