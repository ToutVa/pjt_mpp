import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';

// css
import 'css/layout.css';

// 공통
import Layout from 'component/Layout';
import CoverLayout from 'component/CoverLayout';
import ProtectedRoute from 'comm/routes/ProtectedRoute';

// main 화면구성
import Home from 'pages/Home';
import MyPage from 'pages/myPage/MyPage';
// import Setting from 'pages/setting/SettingMain';
import PostDragDrop from 'pages/post/PostDragDrop';
import PostDetail from 'pages/post/PostDetail';
import Posting from 'pages/post/Posting';
import Feed from 'pages/feed/Feed';
import GuestFeed from 'pages/feed/GuestFeed'
import LoginModal from 'pages/register/LoginModal';
import SignupModal from 'pages/register/SignupModal';
import Setting from 'pages/register/Setting';

function App() {
  return (
    <RecoilRoot>
      <div className='App'>
        <BrowserRouter>
          <LoginModal />
          <SignupModal />
          <div className='contentWrapper'>
            <Routes>
              <Route element={<CoverLayout />}>
                <Route path='/' element={<Home />} />
              </Route>
              <Route element={<Layout />}>
                <Route element={<ProtectedRoute />}>
                    <Route path='/feed' element={<Feed />} />
                    <Route path='/myPage' element={<MyPage />} />
                    <Route path='/setting' element={<Setting />} />
                    <Route path='/post' element={<PostDragDrop />} />
                    <Route path='/post/:postId' element={<PostDetail />} />
                    <Route path='/posting' element={<Posting />} />
                    <Route path='/setting' element={<Setting />} />
                </Route>
                <Route path='/guestFeed' element={<GuestFeed />} />
              </Route>
              <Route path='/*' element={'NOT FOUND'} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
