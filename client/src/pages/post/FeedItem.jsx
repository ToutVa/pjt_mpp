const FeedItem = (props) => {
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
          {props.content.cont}
        </div>
        <div className="bottom">
          <div className="icon-group">
            <button className="like" />
            <button className="comment" />
          </div>
          {props.content.like}
        </div>
      </div>
    );
    
  };
  
  export default FeedItem;
  