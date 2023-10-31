import {BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// css
import './css/layout.css';

// 공통
import Header from './ui/comm/Header';
import Footer from './ui/comm/Footer';

function Home () {
  return ( 
    <div>
      <h2>Home</h2>
    </div>
  )
}

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header/>
        <div className='contentWrapper'>
          <Routes>
            <Route path="/" element={<Home />}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
