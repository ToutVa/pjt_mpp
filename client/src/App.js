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
import MyPage from'pages/myPage/MyPage';



function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div className='contentWrapper'>
          <Routes>
            <Route element ={<CoverLayout />}>
              <Route path="/" element = {<Home / >} />
            </Route>
            <Route element ={<Layout />}>
              <Route path="/login" element={<Login />} />
            </Route>
            
            <Route element={<ProtectedRoute />}>
              <Route path= "/myPage" element={<MyPage />} />
            </Route>
            
            <Route path="/*" element = {'NOT FOUND'} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
