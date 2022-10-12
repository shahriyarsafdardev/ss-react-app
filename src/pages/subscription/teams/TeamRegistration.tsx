import { useEffect, useState } from 'react';
import { Box, Container, Stack } from '@material-ui/core';
import Navbar from 'components/subscription/teams/Navbar';
import { KeyboardBackspace } from '@material-ui/icons';
import LoadingScreen from 'components/LoadingScreen';
import Header from 'components/subscription/teams/Header';
import { useLocation } from 'react-router-dom';
import axios from 'utils/axios';
import { useSnackbar } from 'notistack5';
import OnboardChoice from './OnboardChoice';
import InviteMembersForm, { TeamMember } from './InviteMembersForm';
import PromptNote from './PromptNote';
import { RootStyle, StyledBackButton, useStyles } from './Common';
import Payment from './Payment';

export type Cohort = {
  host_name: string;
  id: string;
  name: string;
};

export default function TeamRegistration() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSinglePayee, setIsSinglePayee] = useState(false);
  const url = new URLSearchParams(useLocation().search);
  const email = url.get('email') || '';
  const team = url.get('team') || '';
  const [clientSecret, setClientSecret] = useState('');
  const [amount, setAmount] = useState(0);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (team !== '' && email !== '') {
      axios
        .get(`team_registrations/get_team_details.json`, {
          params: { email, team }
        })
        .then((res) => {
          setCohorts(res.data.cohorts);
          setLoading(false);
        })
        .catch((error) => {
          enqueueSnackbar(error.message || 'Some error occurred!', {
            variant: 'error'
          });
        });
    } else {
      setLoading(true);
    }
  }, []);

  const setStep = (decrease?: boolean) => {
    decrease ? setActiveStep(activeStep - 1) : setActiveStep(activeStep + 1);
  };

  const previousStep = () => {
    if (activeStep === 2) {
      setTeamMembers([]);
    }
    setActiveStep(activeStep - 1);
  };

  const selectComponent = () => {
    if (activeStep === 2) {
      return (
        <InviteMembersForm
          setStep={setStep}
          isSinglePayee={isSinglePayee}
          email={email}
          team={team}
          setClientSecret={setClientSecret}
          setAmount={setAmount}
          teamMembers={teamMembers}
          setTeamMembers={setTeamMembers}
          cohorts={cohorts}
        />
      );
    }
    if (activeStep === 3 && isSinglePayee) {
      return (
        <Payment
          team={team}
          teamMembers={teamMembers}
          email={email}
          clientSecret={clientSecret}
          amount={amount}
          setStep={setStep}
        />
      );
    }
    if ((activeStep === 3 && !isSinglePayee) || activeStep === 4) {
      return <PromptNote username="dev.mahboob@gmail.com" password="sphere-2340" />;
    }
    return <OnboardChoice setStep={setStep} setIsSinglePayee={setIsSinglePayee} />;
  };

  const teamRegistrationFlow = () => (
    <Stack width="100%">
      {!(activeStep === 3 && isSinglePayee) && (
        <Header activeStep={activeStep} isSinglePayee={isSinglePayee} />
      )}
      <Container
        maxWidth="lg"
        className={activeStep === 3 && isSinglePayee ? classes.paymentContainer : ''}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        {selectComponent()}
      </Container>
    </Stack>
  );

  return (
    <RootStyle
      title="Sphere Cohort Registration"
      className={activeStep === 3 && isSinglePayee ? classes.noPadding : ''}
    >
      <Navbar activeStep={activeStep} />
      {activeStep !== 1 && (
        <StyledBackButton variant="outlined" onClick={() => previousStep()}>
          <KeyboardBackspace fontSize="large" />
        </StyledBackButton>
      )}
      {loading ? (
        <Box padding="200px">
          <LoadingScreen />
        </Box>
      ) : (
        <>{teamRegistrationFlow()}</>
      )}
    </RootStyle>
  );
}
