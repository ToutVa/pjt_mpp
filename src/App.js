import { Route, Routes } from 'react-router-dom';
import './App.css';

// 공통
import Header from './ui/comm/Header';

function Home () {
  return ( 
    <div>
      <h2>Home</h2>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/ui/comm" Component={Header} />
      <Route path="/" element={<Home />}/>
    </Routes>
  );
}

export default App;
