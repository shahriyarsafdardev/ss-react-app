import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  accessibleRoles: String[];
  children: ReactNode | string;
};

export default function RoleBasedGuard({ accessibleRoles, children }: RoleBasedGuardProp) {
  const { user } = useAuth();
  const currentRole = user?.type;

  if (!currentRole || !accessibleRoles.includes(currentRole)) {
    return <Navigate to="/404" replace />;
  }

  return <>{children}</>;
}
