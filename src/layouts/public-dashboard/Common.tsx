import { useState } from 'react';
import { Button, Card, Stack, styled } from '@material-ui/core';
import { ModalRegisterForm } from 'components/authentication/register';
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

  return (
    <StyledModal
      open={loginModalState}
      onClose={() => {
        isRegistered && setIsAuthenticated();
        setLoginModalState(false);
      }}
      zIndex={1400}
    >
      <Card sx={{ p: { xs: 3, md: 10 }, height: 1, overflow: 'visible' }}>
        {step === 'login' && <ModalLoginForm setFormType={() => setStep('register')} />}
        {step === 'register' &&
          (isRegistered ? (
            <Stack textAlign="center" spacing={4}>
              <ModalText>Your information has been saved!</ModalText>
              <ModalText>
                Now, you can add Sphere’s events to your calendar and share them with friends or
                colleagues.
              </ModalText>
              <Button
                variant="contained"
                sx={{ width: '100%', height: '46px', borderRadius: '30px' }}
                onClick={() => registrationSuccess()}
              >
                Continue
              </Button>
            </Stack>
          ) : (
            <ModalRegisterForm
              setFormType={() => setStep('login')}
              setIsRegistered={() => setIsRegistered(true)}
            />
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
