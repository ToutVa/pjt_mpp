
import { Link } from "react-router-dom";
import FeedContent from "./FeedContent";
import "css/feed.css";


const Feed = () => {
  return (
    <>
    <div className="feed"> 
      <div className="left">
        left Side
      </div>
      <div className="center">
        <FeedContent />
        <Link className="btn-create-post" to= "/post" />
      </div>
      <div className="right">
        right Side
      </div>
      
    </div>
    </>
  );
};

export default Feed;