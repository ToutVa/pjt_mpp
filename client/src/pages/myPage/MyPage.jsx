import "css/myPage.css";
import Bookmark from "./BookMark";
import {toggleClass, addClass, removeClass} from "comm/util";

const MyPage = () => {
  //메뉴 목록 Array  header명           ID 값             실제 Content
  const menuArr = [{menu : "내 게시글", bodyId : "item0", content: <p className="pin">내 게시글</p>},
                   {menu : "북마크",    bodyId : "item1", content: <Bookmark />},
                   {menu : "테스트",    bodyId : "item2", content: <p className="pin">저장된여행글</p>  },
                  ];

  /*탭 onChange 이벤트*/
  const fnTabOnChange = (index) => {
    menuArr.forEach((arr,idx) => {
        let tmp = document.getElementById(arr.bodyId);
        if(index === idx) addClass(tmp, "on");
        else              removeClass(tmp,"on");
    });
  }

  return (
    <div className="main-frame my-page">
      <div className="left"></div>
      <div className="center">
        <div className="tab-container">
          <div className="tab-header mb15">
            {menuArr.map((data,index) => (
              <label className="tab" key={"tab"+index}>
                <input type="radio"
                       radioGroup="tab" 
                       className="tab"
                       id={"tab"+index}
                       onChange={()=> fnTabOnChange(index)}
                       value={data.bodyId}
                       name="group"/>
                {data.menu}
              </label>
            ))}
          </div>
          <div></div>
          {menuArr.map((data,index) => (
              <div className={index===0 ? "item on":"item"} 
                   id={data.bodyId} key={data.bodyId}>
                {data.content}
              </div>
          ))}
        </div>
      </div>
      <div className="right"></div>
      
    </div>
  );
};

export default MyPage;