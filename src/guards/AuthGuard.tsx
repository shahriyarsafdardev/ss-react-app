import { useState, useEffect, ReactNode } from 'react';
import { makeStyles } from '@material-ui/styles';
import useAuth from 'hooks/useAuth';
import { Modal } from 'components/animate';
// pages
import TermsForm from '../pages/authentication/TermsForm';
import Login from '../pages/authentication/Login';

const useStyles = makeStyles((theme) => ({
  termsModal: {
    width: '50% !important',
    margin: 'auto'
  }
}));
// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (user && !user?.accepted_terms) {
      setOpen(true);
    }
  }, [user]);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <>
      {user && !user.accepted_terms && (
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          zIndex={1400}
          className={classes.termsModal}
        >
          <TermsForm
            onClose={() => {
              setOpen(false);
            }}
          />
        </Modal>
      )}
      {children}
    </>
  );
}
