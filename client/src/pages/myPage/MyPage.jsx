import "css/myPage.css";
import TabController from "component/TabController";
import Bookmark from "./BookMark";
import Profile from "./Profile";
import MyFeed from "./MyFeed";

const MyPage = () => {
  //메뉴 목록 Array  header명           ID 값             실제 Content
  const menuArr = [{menu : "내 게시글", bodyId : "item0", content: <MyFeed />},
                   {menu : "북마크",    bodyId : "item1", content: <Bookmark />},
                   {menu : "테스트",    bodyId : "item2", content: <p className="pin">저장된여행글</p>  },
                  ];
  return (
    <div className="main-frame my-page">
      <div className="left"></div>
      <div className="center">
        <Profile/>
        <TabController menuList={menuArr}/>
      </div>
      <div className="right"></div>
      
    </div>
  );
};

export default MyPage;