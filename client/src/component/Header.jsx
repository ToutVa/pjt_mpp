/* eslint-disable jsx-a11y/anchor-is-valid */

import { Link } from "react-router-dom";
import { useRecoilState} from "recoil";
import { loginStatus } from "comm/recoil/TestLoginAtom";

/* eslint-disable jsx-a11y/alt-text */
const Header = ({type}) => {
  
  const [profileStat , setProfileStat] = useRecoilState(loginStatus);
  
  if("cover" === type) {
    return (
      <header className = "cover">
        <Link to={"/"}>
          <div className="cover-logo"/>
        </Link>
        <div className="flex">
          <Link className="item" to= {profileStat === true ? "/myPage": "/login"}>
                <p className="linked-text white">{profileStat === true ? "MyPage": "로그인"}</p>
          </Link>
          <Link className="item" to= {"/"}>
                <p className="linked-text white">회원가입</p>
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
            <li><a href="#">좋아요</a></li>
            <li>
              <Link to= {profileStat === true ? "/myPage": "/login"}>
                <p className="linked-text">{profileStat === true ? "MyPage": "로그인"}</p>
              </Link>
            </li>
          </ul>
        </nav>
        <div className = "side-menu">
          <nav>
            <ul>
              <li> <a href="#"> mypage</a></li>
              <li> <a href="#"> profile</a></li>
              <li> <a href="#"> setting</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
