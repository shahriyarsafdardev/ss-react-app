import { LoadingButton } from '@material-ui/lab';
import { Box, Button, styled } from '@material-ui/core';
import Navbar from 'components/subscription/Navbar';
import LoadingScreen from 'components/LoadingScreen';
import { useState } from 'react';
import { KeyboardBackspace } from '@material-ui/icons';
import Page from '../../components/Page';
import RegistrationForm from './RegistrationForm';

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: '24px',
  borderRadius: '30px',
  height: '40px',
  width: '100%'
}));

const StyledBackButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: 110,
  left: 40,
  [theme.breakpoints.down('md')]: {
    top: 150,
    left: 10
  }
}));

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(5),
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  position: 'relative'
}));

export default function Subscription() {
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  return (
    <>
      <RootStyle title="Sphere Cohort Registration">
        <Navbar />
        {[2, 3].includes(activeStep) && (
          <StyledBackButton variant="outlined">
            <KeyboardBackspace fontSize="large" />
          </StyledBackButton>
        )}
        {loading ? (
          <Box padding="200px">
            <LoadingScreen />
          </Box>
        ) : (
          <RegistrationForm />
        )}
      </RootStyle>
    </>
  );
}
