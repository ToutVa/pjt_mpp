import { useEffect, useState } from "react";
import util from "comm/util";
import ToggleButton from "component/ToggleButton";

/**
 * 셋팅화면
 * 
 * 
 * 
 */
const Setting = () => {
  let titleList;  //li의 title속성 값을 보유중인 요소List
  const [privateStatus, setPrivateStatus]= useState(false); //비공개 계정 상태값
  const [introByte, setIntroByte]= useState(0); //비공개 계정 상태값

  /*타이틀 온클릭 이벤트(펼치기, 접기)*/
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
  
  /**/
  const introOnKeyUp =(e)=> {
    debugger;
    let byte = util.getByte(e.currentTarget.value);
    setIntroByte(byte);

    if(byte > 500) {return false}
  }
  /*저장 버튼 클릭이벤트*/
  const saveOnClick = ()=> {
    console.log(privateStatus);
  }

  useEffect(()=>{
    let dropDown = document.getElementById("dropDown");
    let list = dropDown.getElementsByClassName("title");
    titleList = list;
    for(let i = 0; i < list.length; i++) {
      list[i].addEventListener("click", ()=> {titleOnClick(i)});
    };
  },[]);


  return(<>
    <div className="setting main-frame">
      <div className="left"></div>
      <div className="center">
        <div className="user-info mt50">
          <div className="icon"/>
          <div className="identifier">
            <div className="id">ID</div>
            <div className="name">사용자 이름</div>
          </div>
          <div className="btn-group">
            <button className="wd110 btn-primary">사진변경</button>
          </div>
        </div>
        <div>
          <ul id="dropDown" className="drop-down mt40">
            <li>
              <div className="content">          
                <div className="h3">비공개 계정</div>
                <ToggleButton status={privateStatus} setFn={setPrivateStatus}/>
              </div>
            </li>
            <li>
              <div className="title">소개</div>
              <div className="content">
                <div className="mb10 fr">{introByte} /500 자</div>
                <textarea className="introSetting" type='text' name='intro' placeholder="자신을 소개해 주세요" onKeyUp={introOnKeyUp}/>
              </div>
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
        <div className='btn-group'>
          <div className='right'>
            <button type='submit' className='btn-primary wd100' onClick={saveOnClick}>
              저장
            </button>
          </div>
        </div>
      </div>
      <div className="right"></div>
    </div>
  </>);
}
export default Setting;