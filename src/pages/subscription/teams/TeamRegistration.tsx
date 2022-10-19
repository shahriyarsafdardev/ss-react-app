import { useEffect, useState } from 'react';
import { Box, Container, Stack } from '@material-ui/core';
import Navbar from 'components/subscription/teams/Navbar';
import { KeyboardBackspace } from '@material-ui/icons';
import LoadingScreen from 'components/LoadingScreen';
import Header from 'components/subscription/teams/Header';
import { useLocation } from 'react-router-dom';
import axios from 'utils/axios';
import { useSnackbar } from 'notistack5';
import { setSegmentUserProperties } from 'utils/amplitude';
import OnboardChoice from './OnboardChoice';
import InviteMembersForm, { TeamMember } from './InviteMembersForm';
import PromptNote from './PromptNote';
import { RootStyle, StyledBackButton, useStyles } from './Common';
import Payment from './Payment';

export type Registration = {
  cohort_id: string;
  cohort_name: string;
  cohort_host_name: string;
  lead_user_name: string;
};

export type Cohort = {
  host_name: string;
  id: string;
  name: string;
};

export type User = {
  id: string;
  slug: string;
  first_name: string;
  last_name: string;
  email: string;
  linkedin_url: string;
  industry_category_selection: string;
};

export type Credentials = {
  user_name: string;
  password: string;
};

export default function TeamRegistration() {
  const classes = useStyles();
  const url = new URLSearchParams(useLocation().search);
  const cohortID = url.get('cohort_id') || '';
  const email = url.get('email') || '';
  const team = url.get('team') || '';
  const [activeStep, setActiveStep] = useState(cohortID === '' ? 1 : 3);
  const [loading, setLoading] = useState(false);
  const [isSinglePayee, setIsSinglePayee] = useState(false);
  const [amount, setAmount] = useState(0);
  const [teamDiscount, setTeamDiscount] = useState(0);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [registration, setRegistration] = useState<Registration>({
    cohort_id: '',
    cohort_name: '',
    cohort_host_name: '',
    lead_user_name: ''
  });
  const [leadUser, setLeadUser] = useState<User>({
    id: '',
    slug: '',
    first_name: '',
    last_name: '',
    email: '',
    linkedin_url: '',
    industry_category_selection: ''
  });
  const [credentials, setCredentials] = useState<Credentials>({
    user_name: '',
    password: ''
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (team !== '' && email !== '') {
      if (cohortID === '') {
        setLoading(true);
        axios
          .get(`team_registrations/get_team_details.json`, {
            params: { email, team }
          })
          .then((res) => {
            setLeadUser(res.data.user);
            setCohorts(res.data.cohorts);
            setSegmentUserProperties(res.data.user);
            setTeamDiscount(res.data.team.discount_percentage);
            setLoading(false);
          })
          .catch((error) => {
            enqueueSnackbar(error.message || 'Some error occurred!', {
              variant: 'error'
            });
          });
      } else {
        setLoading(true);
        axios
          .get(`team_registrations/get_registration_details.json`, {
            params: { email, cohort_id: cohortID, team_name: team }
          })
          .then((res) => {
            setRegistration(res.data);
            setLoading(false);
          })
          .catch((err) => {
            enqueueSnackbar(err.message || 'Some error occurred!', {
              variant: 'error'
            });
          });
      }
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
          teamMembers={teamMembers}
          setTeamMembers={setTeamMembers}
          cohorts={cohorts}
          leadUser={leadUser}
        />
      );
    }
    if (activeStep === 3 && (isSinglePayee || cohortID !== '')) {
      return (
        <Payment
          team={team}
          teamMembers={teamMembers}
          email={email}
          amount={amount}
          setAmount={setAmount}
          setStep={setStep}
          isSinglePayee={isSinglePayee}
          cohortID={cohortID}
          registration={registration}
          setCredentials={setCredentials}
          teamDiscount={teamDiscount}
        />
      );
    }
    if ((activeStep === 3 && !isSinglePayee) || activeStep === 4) {
      return (
        <PromptNote
          username={credentials.user_name || email}
          password={credentials.password || 'sphere'}
        />
      );
    }
    return <OnboardChoice setStep={setStep} setIsSinglePayee={setIsSinglePayee} />;
  };

  const teamRegistrationFlow = () => (
    <Stack width="100%">
      {!(activeStep === 3 && (isSinglePayee || cohortID !== '')) && (
        <Header activeStep={activeStep} isSinglePayee={isSinglePayee} cohortID={cohortID} />
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
      {activeStep !== 1 && activeStep !== 3 && isSinglePayee && (
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
