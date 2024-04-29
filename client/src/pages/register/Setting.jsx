import { useEffect, useState } from "react";
import util from "comm/util";
/**
 * 셋팅화면
 * 
 * 
 * 
 */
const Setting = () => {
  let titleList;

  /*타이틀 온클릭 이벤트*/
  const titleOnClick = (idx) => {
    for(let i = 0; i < titleList.length; i++) {
      if(i === idx) {
        if(util.hasClass(titleList[i], "active"))
          util.removeClass(titleList[i], "active");
        else
          util.addClass(titleList[i], "active");
      }else {
        util.removeClass(titleList[i], "active");
      }
    };
  }

  useEffect(()=>{
    let dropDown = document.getElementById("dropDown");
    let list = dropDown.getElementsByClassName("title");
    titleList = list;
    for(let i = 0; i < list.length; i++) {
      list[i].addEventListener("click", ()=> {titleOnClick(i)});
    };
  },[])

  return(<>
    <div className="setting main-frame"> 
    <div className="left" />
    <div className="center">
      <div className="user-info mt30">
        <div className="icon"/>
        <div className="identifier">
          <div className="id">ID</div>
          <div className="name">사용자 이름</div>
        </div>
        <div className="btn-group">
          <button className="wd150 btn-primary">사진변경</button>
        </div>
      </div>
      <div>
        <ul id="dropDown" className="drop-down mt30">
          <li>
            <div className="content">옵션1 상세</div>
          </li>
          <li>
            <div className="title" >옵션2</div>
            <div className="content">옵션2 상세</div>
          </li>
          <li>
            <div className="title">옵션3</div>
            <div className="content">옵션3 상세</div>
          </li>
          <li>
            <div className="title">옵션4</div>
            <div className="content">옵션4 상세</div>
          </li>
        </ul>
      </div>
    </div>
    <div className="right" />
    </div>
  </>);
}
export default Setting;