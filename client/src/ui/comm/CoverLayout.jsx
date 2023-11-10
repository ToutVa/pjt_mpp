import { Outlet } from 'react-router-dom';
import Header from './Header'

const CoverLayout = () => {
  return (
    <>
      <Header type = {"cover"}/>
      <main>
        <Outlet />
      </main>
    </> 
  );
};

export default CoverLayout;