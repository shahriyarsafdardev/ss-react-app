import { ReactNode } from 'react';
import useAuth from 'hooks/useAuth';
// pages
import TermsForm from '../pages/authentication/TermsForm';
import Login from '../pages/authentication/Login';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();
  const { user } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <>
      {user && !user.accepted_terms && <TermsForm />}
      {children}
    </>
  );
}
