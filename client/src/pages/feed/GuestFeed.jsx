import FeedItem from "./FeedItem";
import "css/feed.css";

const Feed = () => {
  return (
    <>
      <div className="feed main-frame">
        <div className="left">
          <div className="side">
          left Side
          </div>
        </div>
        <div className="center">
          <FeedItem content='1' key={0} />
          <FeedItem content='1' key={1} />
          <FeedItem content='1' key={2} />
          <FeedItem content='1' key={3} />
          <FeedItem content='1' key={4} />
          <FeedItem content='1' key={5} />
          <FeedItem content='1' key={6} />
          {/* <FeedContent /> */}
        </div>
        <div className="right">
          right Side
        </div>
      </div>
    </>
  );
};
export default Feed;