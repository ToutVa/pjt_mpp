/* eslint-disable jsx-a11y/anchor-is-valid */

import { Link } from "react-router-dom";
import { useRecoilState} from "recoil";
import { loginStatus } from "../main/recoil/TestLoginAtom";

/* eslint-disable jsx-a11y/alt-text */
function Header(props) {

  const [profileStat , setProfileStat] = useRecoilState(loginStatus);
  
  return (
    <header>
      <div className="logo" />
      <nav>
        <ul className="menu">
          <li><a href="#"> 좋아요</a></li>
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

export default Header;
