import "css/myPage.css";
import Bookmark from "./BookMark";

const MyPage = () => {
  return (
    <div className="main-frame my-page">
      <div className="left"></div>
      <div className="center">
        <div className="item">
          <p className="pin">내 여행글</p>
          <div className="map">(지도영역)</div>
          <div className="time-line">
            <div className="bar"><div className="point"></div></div>
            <div className="area">
              <div className="item"></div>
              <div className="item"></div>
              <div className="item"></div>
              <div className="item"></div>
              <div className="item"></div>
              <div className="item"></div>
              <div className="item"></div>
              <div className="item"></div>
              <div className="item"></div>
            </div>
          </div>
        </div>
        <div className="item">
          <Bookmark />
        </div>
      </div>
      <div className="right"></div>
      
    </div>
  );
};

export default MyPage;