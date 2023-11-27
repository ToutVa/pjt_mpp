
import PostContent from "./PostContent";
import "css/post.css";


const PostMain = () => {

  const item = [{sqno : 1,
    title : "test",
    cont : "content",
    like : 11231231230
  },
  {sqno : 2,
    title : "test2",
    cont : "content",
    like : 140
  },
  {sqno : 3,
    title : "test3",
    cont : "content",
    like : 11110
  },
 ];

  return (
    <>
    <div className="post"> 
      <div className="left">
        left Side
      </div>
      <div className="center">
        <PostContent content={item} />
      </div>
      <div className="right">
        right Side
      </div>
    </div>
    </>
  );
};

export default PostMain;
