import "css/myPage.css";
import BookMarkItem from "./BookMarkItem";

const Bookmark = () => {


  const fnCreateBookMark = () => {
    const testArr = [{title:"부산여행", color:"red"},
                     {title:"나두몰라", color:"blue"},
                     {title:"맛집List", color:"green"},
                     {title:"풍경", color:"purple"},
                    ];

    let elements = [];
    
    testArr.forEach((val, idx) => {
      elements.push(<BookMarkItem prop={testArr[idx]} key={idx}/>);
    });
  
    return elements;
  }

  return (
    <>
      <p className="pin">저장된여행글</p>
      <div className="container">
        {fnCreateBookMark()}
      </div>
    </>
  );
};

export default Bookmark;