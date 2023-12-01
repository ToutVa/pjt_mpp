/* eslint-disable jsx-a11y/anchor-is-valid */

import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { TokenAtom, isLoginSelector } from "comm/recoil/TokenAtom";
import axios from "axios";

/* eslint-disable jsx-a11y/alt-text */

// navMenu login정보에 맞게 활성화 
const Header = ({type}) => {
  
  const isLogin = useRecoilValue(isLoginSelector);
  const setAccessToken = useSetRecoilState(TokenAtom);
  
  const fn_logout = () => {
      // logout api 실행
      axios.post("/api/user/logout").then((res) => {
        // token undefined 설정 
        setAccessToken(undefined);
      });
  }

  const fn_clickMenu = (e) => {
    let classNm = e.currentTarget.className.indexOf("active") < 0 ? "btn-menu active": "btn-menu";
    e.currentTarget.className = classNm;
  }


  if("cover" === type) {
    return (
      <header className = "cover">
        <Link to={"/"}>
          <div className="cover-logo"/>
        </Link>
        <div className="flex">
          <Link className="item" to= {isLogin === true ? "/post": "/login"}>
                <p className="linked-text white">{isLogin === true ? "Post": ""}</p>
          </Link>
          <Link className="item" to= {isLogin === true ? "/myPage": "/login"}>
                <p className="linked-text white">{isLogin === true ? "MyPage": "login"}</p>
          </Link>
          <Link className="item" to= {isLogin === true ? "/": "/sign"}>
                <p onClick = {fn_logout}
                  className="linked-text white">{isLogin === true ? "Logout": "sing up"}</p>
          </Link>
        </div>

      </header>
    )
  }else {
    return (
      <header className={type}>
        <div className ="side-menu"/>
        <div className = "center">
          <Link to={isLogin === true ? "/feed": "/"}>
            <div className="logo"/>
          </Link>
        </div>
        <div className = {isLogin ? "side-menu right" : "side-menu"}>
          <a className = "btn-menu" onClick={fn_clickMenu}>
            <span></span>
            <span></span>
            <span></span>
          </a>
          <nav>
            <ul>
              <li> <a href="/mypage"> mypage</a></li>
              <li> <a href="/profile"> profile</a></li>
              <li> <a href="/setting"> setting</a></li>
              <li> <a href="" onClick = {fn_logout} > logOut</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}


export default Header;
