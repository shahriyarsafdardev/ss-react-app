import { ReactNode } from 'react';
import useAuth from 'hooks/useAuth';
// pages
import TermsForm from '../pages/authentication/TermsForm';
import RebrandModal from '../pages/authentication/RebrandModal';
import WalkthroughModal from '../pages/authentication/WalkthroughModal';
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
      {user && !user.popup_viewed && <RebrandModal />}
      {user && user.popup_viewed && !user.accepted_terms && <TermsForm />}
      {user && user.popup_viewed && user.accepted_terms && user.new_instructor && (
        <WalkthroughModal />
      )}
      {children}
    </>
  );
}
