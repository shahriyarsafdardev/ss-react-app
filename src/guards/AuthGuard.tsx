import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// pages
import Login from '../pages/authentication/Login';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && pathname !== '/') {
      navigate('/');
    }
  }, [pathname, isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <Login />;
  }

  return <>{children}</>;
}
