
import FeedContent from "./FeedContent";
import "css/post.css";


const Feed = () => {

 

  return (
    <>
    <div className="post"> 
      <div className="left">
        left Side
      </div>
      <div className="center">
        <FeedContent />
      </div>
      <div className="right">
        right Side
      </div>
    </div>
    </>
  );
};

export default Feed;
