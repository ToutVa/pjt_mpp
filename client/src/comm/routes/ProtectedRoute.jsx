import { Navigate, Outlet, useLocation } from 'react-router';
import { useRecoilValue } from 'recoil';
import { isLoginSelector } from '../recoil/TokenAtom';

const ProtectedRoute = () => {
  const isLogin = useRecoilValue(isLoginSelector);
  const currentLocation = useLocation();

  return isLogin ? (
    <Outlet />
  ) : (
    <Navigate to={'/'} replace state={{ redirecredFrom: currentLocation }} />
  );
};

export default ProtectedRoute;
