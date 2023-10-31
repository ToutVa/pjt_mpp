/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
function Header(props) {
  return (
    <header>
      <div className="logo"></div>
      <div className = "menu"></div>
      <nav>
        <ul>
          <li><a href="#"> 좋아요</a></li>
          <li><a href="#"> mypage</a></li>
        </ul>
        <ul>
          <li> <a href="#"> mypage</a></li>
          <li> <a href="#"> profile</a></li>
          <li> <a href="#"> setting</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
