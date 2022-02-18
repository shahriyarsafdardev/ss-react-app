import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { RootState, useSelector } from '../redux/store';

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  accessibleRoles: String[];
  children: ReactNode | string;
};

export default function RoleBasedGuard({ accessibleRoles, children }: RoleBasedGuardProp) {
  const { user } = useAuth();
  const currentRole = user?.type;
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );

  const isNotHost = cohort && currentRole === 'expert' && !cohort.is_host;

  if (!currentRole || !accessibleRoles.includes(currentRole) || isNotHost) {
    return <Navigate to="/404" replace />;
  }

  return <>{children}</>;
}
