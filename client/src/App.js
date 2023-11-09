import {BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// css
import './css/layout.css';

// 공통
import Layout from './ui/comm/Layout';
import ProtectedRoute from './ui/main/routes/ProtectedRoute';

// main 화면구성
import Home from'./ui/main/Home';
import Login from'./ui/main/register/Login';
import MyPage from'./ui/main/myPage/MyPage';



function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div className='contentWrapper'>
          <Routes>
            <Route element ={<Layout />}>
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
