import "css/tabController.css";
import util from "comm/util";
import { useState } from "react";

const TabController = (props) => {
  /**
   *   탭으로 생성될 정보를 파라메터로 받아서 처리
   * 
   *                        header명         Content 에 들어갈 태그
   *   ex) const menuArr =[{menu : "북마크", content: <Bookmark />},} ];
   *       <TabController menuList={menuArr}/>
   */

  const menuArr =  props.menuList;
  const [underlineWidth, setUnderlineWidth] = useState("");
  const [underlineXpos, setunderlineXpos] = useState("");
  
  /*탭 onChange 이벤트*/
  const fnTabOnChange = (index, e) => {

    setUnderlineWidth(e.currentTarget.labels[0].offsetWidth);
    setunderlineXpos(e.currentTarget.labels[0].offsetLeft);
    menuArr.forEach((arr,idx) => {
        let tmp = document.getElementById("item"+ idx);
        if(index === idx) util.addClass(tmp, "on");
        else              util.removeClass(tmp,"on");
    });
  }
  return (
    <>
      <div className="tab-container">
          <div className="tab-header mb15">
            {menuArr.map((data,index) => (
              <label className="tab" key={"tab"+index}>
                <input type="radio"
                       radioGroup="tab" 
                       className="tab"
                       id={"tab"+index}
                       onChange={(e)=> fnTabOnChange(index, e)}
                       value={"item"+index}
                       name="group"/>
                {data.menu}
              </label>
            ))}
            <div className="underline" style={{width : underlineWidth+"px", left: underlineXpos}} id="underline"/>
          </div>
          <div></div>
          {menuArr.map((data,index) => (
              <div className={index===0 ? "item on":"item"} 
                   id={"item"+index} key={"item"+index}>
                {data.content}
              </div>
          ))}
        </div>
    </>
  );
};

export default TabController;
