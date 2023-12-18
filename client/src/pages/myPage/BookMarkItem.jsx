import "css/myPage.css";

const BookMarkItem = (props) => {
  return (
    <div className="section"><div className={"book-mark "+props.prop.color}/>
      <div className="title">{props.prop.title}</div>
      <div className="item"><p>1</p></div>
      <div className="item"><p>2</p></div>
      <div className="item"><p>3</p></div>
      <div className="item"><p>4</p></div>
    </div>
  );
};

export default BookMarkItem;