import useAuth from 'hooks/useAuth';
import PublicDashboardLayout from './public-dashboard';
import DashboardLayout from './dashboard';

export default function MainLayout() {
  const { isAuthenticated } = useAuth();

  return <>{isAuthenticated ? <DashboardLayout /> : <PublicDashboardLayout />}</>;
}
