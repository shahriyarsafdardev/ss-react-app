import { Card, Stack } from '@material-ui/core';
import { RegisterForm } from 'components/authentication/register';
import useAuth from 'hooks/useAuth';
import { ModalText, StyledButton, StyledModal } from 'pages/events/Common';
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

  const registrationSuccess = () => {
    trackEvent(null, 'Event Page - Login modal - "Continue" Selected');
    setLoginModalState(false);
    setIsAuthenticated();
  };

  return (
    <StyledModal
      open={loginModalState}
      onClose={() => {
        setLoginModalState(false);
      }}
      zIndex={1400}
    >
      <Card sx={{ p: { xs: 3, md: 10 }, height: 1, overflow: 'visible' }}>
        {isRegistered ? (
          <Stack textAlign="center" spacing={4}>
            <ModalText>Your information has been saved!</ModalText>
            <ModalText>
              Now, you can add Sphere’s events to your calendar and share them with friends or
              colleagues.
            </ModalText>
            <StyledButton variant="contained" onClick={() => registrationSuccess()}>
              Continue
            </StyledButton>
          </Stack>
        ) : (
          <RegisterForm
            setFormType={() => {}}
            heading="Create an account"
            subHeading=""
            buttonText="Create Account"
            setIsRegistered={setIsRegistered}
          />
        )}
      </Card>
    </StyledModal>
  );
};
