import "css/myPage.css";

const BookMarkItem = (props) => {
  return (
    <div id = {'bookmark' + props.prop._id} className="section" ><div className={"book-mark "+props.prop.color}/>
      <div className="title">{props.prop.bookmarkTitle}</div>
      <div className="item"><img src = {props.prop.bookmark?.[0]?.[0]?.imgList[0].location} height="80" width="150"></img></div>
      <div className="item"><img src = {props.prop.bookmark?.[0]?.[1]?.imgList[0].location} height="80" width="150"></img></div>
      <div className="item"><img src = {props.prop.bookmark?.[0]?.[2]?.imgList[0].location} height="80" width="150"></img></div> 
      <div className="item"><img src = {props.prop.bookmark?.[0]?.[3]?.imgList[0].location} height="80" width="150"></img></div>
    </div>
  );
};

export default BookMarkItem;