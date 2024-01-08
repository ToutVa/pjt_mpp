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
import PostDragDrop from 'pages/post/PostDragDrop';
import Posting from 'pages/post/Posting';
import Feed from 'pages/feed/Feed';
import AlertModal from 'component/AlertModal';
import ConfirmModal from 'component/ConfirmModal';
import LoginModal from 'pages/register/LoginModal';
import SignupModal from 'pages/register/SignupModal';

function App() {
  return (
    <RecoilRoot>
      <div className='App'>
        <BrowserRouter>
          <LoginModal />
          <SignupModal />
          <ConfirmModal />
          <AlertModal />
          <div className='contentWrapper'>
            <Routes>
              <Route element={<CoverLayout />}>
                <Route path='/' element={<Home />} />
              </Route>

              <Route element={<Layout />}>
                <Route element={<ProtectedRoute />}>
                  <Route path='/feed' element={<Feed />} />
                  <Route path='/myPage' element={<MyPage />} />
                  <Route path='/post' element={<PostDragDrop />} />
                  <Route path='/posting' element={<Posting />} />
                </Route>
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
