import { useState } from 'react';
import { Button, Card, Stack, styled, Typography } from '@material-ui/core';
import { RegisterForm } from 'components/authentication/register';
import { ModalLoginForm } from 'components/authentication/login';
import useAuth from 'hooks/useAuth';
import { ModalText, StyledModal } from 'pages/events/Common';
import { trackEvent } from 'utils/eventTracking';

export const LoginModal = ({
  loginModalState,
  setLoginModalState,
  isRegistered,
  setIsRegistered
}: {
  loginModalState: boolean;
  setLoginModalState: Function;
  isRegistered: boolean;
  setIsRegistered: Function;
}) => {
  const { setIsAuthenticated } = useAuth();
  const [step, setStep] = useState('login');

  const registrationSuccess = () => {
    trackEvent(null, 'Event Page - Login modal - "Continue" Selected');
    setLoginModalState(false);
    setIsAuthenticated();
  };

  const handleFormType = (type: string) => {
    type === 'login' && setStep('login');
    type === 'registrationSuccess' && setIsRegistered(true);
  };

  return (
    <StyledModal
      open={loginModalState}
      onClose={() => {
        isRegistered && setIsAuthenticated();
        setLoginModalState(false);
      }}
      zIndex={1400}
    >
      <Card sx={{ px: { xs: 3, md: 10 }, py: { xs: 6, md: 10 }, height: 1, overflow: 'visible' }}>
        {step === 'login' && <ModalLoginForm setFormType={() => setStep('register')} />}
        {step === 'register' &&
          (isRegistered ? (
            <Stack alignItems="center" spacing={6}>
              <img
                src="https://sphere-public.s3.eu-west-2.amazonaws.com/Vector.svg"
                alt="check"
                width="50px"
                height="50px"
              />
              <Stack alignItems="center" spacing={1}>
                <ModalText>Your Sphere account has been created</ModalText>
                <Typography sx={{ fontWeight: 400 }}>
                  You now have access to Sphere’s community events and recordings.
                </Typography>
              </Stack>

              <Button
                variant="contained"
                sx={{ width: '100%', height: '46px', borderRadius: '30px' }}
                onClick={() => registrationSuccess()}
              >
                Continue
              </Button>
            </Stack>
          ) : (
            <RegisterForm setFormType={handleFormType} />
          ))}
      </Card>
    </StyledModal>
  );
};

export const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135.12deg, #7474D0 0.07%, #4D4DCD 100.02%) !important',
  borderRadius: '5px',
  padding: '9px 24px',
  fontSize: '16px',
  [theme.breakpoints.down('md')]: {
    padding: '9px 10px',
    fontSize: '12px'
  }
}));
