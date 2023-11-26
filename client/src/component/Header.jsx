/* eslint-disable jsx-a11y/anchor-is-valid */

import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { TokenAtom, isLoginSelector } from "comm/recoil/TokenAtom";
import axios from "axios";

/* eslint-disable jsx-a11y/alt-text */

// navMenu login정보에 맞게 활성화 
const navMenu =(isLogin) => {
  if(!isLogin) {
    return(
    <div className = "">
      
    </div>
    )
  } else {
    return (
    <div className = "side-menu">
      <nav>
        <ul>
          <li> <a href="/mypage"> mypage</a></li>
          <li> <a href="/profile"> profile</a></li>
          <li> <a href="/setting"> setting</a></li>
        </ul>
      </nav>
    </div>
    );
  }
}

const Header = ({type}) => {
  
  const isLogin = useRecoilValue(isLoginSelector);
  const setAccessToken = useSetRecoilState(TokenAtom);
  
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
                <p onClick = {event => {
                    // logout api 실행
                    axios.post("/api/user/logout").then((res) => {
                      // token undefined 설정 
                      setAccessToken(undefined);
                    });
                  }}
                  className="linked-text white">{isLogin === true ? "Logout": "sing up"}</p>
          </Link>
        </div>

      </header>
    )
  }else {
    return (
      <header className={type}>
        <Link to={"/"}>
          <div className="logo"/>
        </Link>
        <nav>
          <ul className="menu">
            <li>

            </li>
          </ul>
        </nav>
        {navMenu(isLogin)}
      </header>
    );
  }
}


export default Header;
