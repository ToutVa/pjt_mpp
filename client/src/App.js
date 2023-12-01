import {BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// css
import 'css/layout.css';

// 공통
import Layout from 'component/Layout';
import CoverLayout from 'component/CoverLayout';
import ProtectedRoute from 'comm/routes/ProtectedRoute';

// main 화면구성
import Home from'pages/Home';
import Login from'pages/register/Login';
import Sign from'pages/register/Signup';
import MyPage from'pages/myPage/MyPage';
import Posting from'pages/post/Posting';
import Feed from 'pages/feed/Feed';



function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div className='contentWrapper'>
          <Routes>
            <Route element ={<CoverLayout />}>
              <Route path="/" element = {<Home />} />
            </Route>

            <Route element ={<Layout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/sign" element={<Sign />} />

              <Route element={<ProtectedRoute />}>
                <Route path= "/feed" element={<Feed />} />
                <Route path= "/myPage" element={<MyPage />} />
                <Route path= "/post" element={<Posting />} />
              </Route>
            </Route>
            <Route path="/*" element = {'NOT FOUND'} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;