import { Divider, Stack, styled, Theme, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import OnboardingModal from 'components/cohorts/onboarding/OnboardingModal';
import useAuth from 'hooks/useAuth';
import { trackGenericEvent } from 'utils/amplitude';
import { useDispatch } from '../../../redux/store';
import { markOnboardingStep } from '../../../redux/slices/cohort';
import { OnboardingSectionRow, SectionContainer, CalendarInstructionsModal } from './Common';
import { Cohort } from '../../../@types/cohorts';
import { PATH_DASHBOARD } from '../../../routes/paths';

const useStyles = makeStyles((theme: Theme) => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  header: {
    marginBottom: '15px',
    [theme.breakpoints.down('md')]: {
      marginBottom: '10px'
    }
  },
  index: {
    width: '45px',
    height: '45px',
    textAlign: 'center',
    padding: '10px',
    borderRadius: '50%',
    fontWeight: 700,
    fontSize: '18px'
  },
  indexActive: {
    backgroundColor: '#F1F5F9'
  },
  indexCompleted: {
    backgroundColor: '#147A16',
    color: '#FFFFFF',
    fontWeight: 700
  },
  indexNonActive: {
    backgroundColor: '#F1F5F9',
    color: '#C7D0D0'
  },
  headingActive: {
    fontSize: '18px',
    fontWeight: 700
  },
  headingNonActive: {
    color: '#C7D0D0'
  },
  headingCompleted: {
    textDecoration: 'line-through'
  },
  subHeadingActive: {
    fontSize: '14px',
    fontWeight: 400
  },
  buttonActive: {
    borderRadius: '30px',
    width: '148px',
    height: '40px',
    [theme.breakpoints.down('md')]: {
      margin: 'auto',
      width: '80%',
      marginTop: '10px'
    }
  },
  buttonNonActive: {
    display: 'none'
  }
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: '15px 0'
}));

export default function GetReadyChecklist({ cohort }: { cohort: Cohort }) {
  const classes = useStyles();
  const { onboarding_data } = cohort || {};
  const [activeStep, setActiveStep] = useState(0);
  const [hasOnboarded, setHasOnboarded] = useState(true);
  const [onboardingModalState, setOnboardingModalState] = useState(false);
  const { user } = useAuth();
  const [modalState, setModalState] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stepStatus = () => {
    if (!onboarding_data?.is_onboarded) {
      setActiveStep(1);
    }
    if (onboarding_data?.is_onboarded && !onboarding_data?.sessions_added_to_calendar) {
      setActiveStep(2);
    }
    if (
      onboarding_data?.is_onboarded &&
      onboarding_data?.sessions_added_to_calendar &&
      !onboarding_data?.messaging_tab_opened
    ) {
      setActiveStep(3);
    }
    if (
      onboarding_data?.is_onboarded &&
      onboarding_data?.sessions_added_to_calendar &&
      onboarding_data?.messaging_tab_opened &&
      !onboarding_data?.resources_invoked
    ) {
      setActiveStep(4);
    }
  };

  const getActiveStatus = (step: number) => {
    let status = '';
    if (step === activeStep) {
      status = 'Active';
    } else if (step < activeStep) {
      status = 'Completed';
    } else {
      status = 'NonActive';
    }
    return status;
  };

  useEffect(() => {
    stepStatus();
  }, [onboarding_data]);

  const handleCalendarInstructions = () => {
    trackGenericEvent(cohort, 'Home Page - Calendar Modal - "I’ve Added the Sessions" Selected');
    dispatch(markOnboardingStep(cohort.id, 'sessions_added_to_calendar'));
  };

  const handleIntroductionCompleted = () => {
    dispatch(markOnboardingStep(cohort.id, 'messaging_tab_opened'));
    navigate(`${PATH_DASHBOARD.cohorts.messaging(cohort.id)}`);
  };

  const handleDiveIntoResources = () => {
    dispatch(markOnboardingStep(cohort.id, 'resources_invoked'));
  };

  return (
    <>
      {!hasOnboarded && user?.type === 'learner' && (
        <OnboardingModal
          onboardingModalState={onboardingModalState}
          setOnboardingModalState={setOnboardingModalState}
          onSubmit={() => {}}
        />
      )}
      <CalendarInstructionsModal
        cohort={cohort}
        modalState={modalState}
        setModalState={setModalState}
        handleSubmit={handleCalendarInstructions}
        onNeedHandler={() =>
          trackGenericEvent(cohort, 'Home Page - Calendar Modal - "I Need Help" Selected')
        }
      />
      <Typography variant="h3" className={classes.header}>
        Get Ready
      </Typography>
      <SectionContainer>
        <Stack>
          <OnboardingSectionRow
            index={1}
            heading={`Tell ${cohort?.host_names} about yourself`}
            subHeading="We use the information you share to provide a personalized learning experience"
            status={getActiveStatus(1)}
            classes={classes}
            onSubmit={() => {
              setHasOnboarded(false);
              setOnboardingModalState(true);
              trackGenericEvent(cohort, 'Home Page - Get Ready - Profile Step Started');
            }}
          />
          <StyledDivider />
          <OnboardingSectionRow
            index={2}
            heading="Add the sessions to your calendar"
            subHeading="So you don't forget any live classes"
            status={getActiveStatus(2)}
            classes={classes}
            onSubmit={() => {
              setModalState(true);
              trackGenericEvent(cohort, 'Home Page - Get Ready - Calendar Step Started');
            }}
          />
          <StyledDivider />
          <OnboardingSectionRow
            index={3}
            heading="Introduce yourselves to your peers"
            subHeading="To connect with the like minded data professionals also in this cohort"
            status={getActiveStatus(3)}
            onSubmit={() => {
              handleIntroductionCompleted();
              trackGenericEvent(cohort, 'Home Page - Get Ready - Messaging Step Started');
            }}
            classes={classes}
          />
          <StyledDivider />
          <OnboardingSectionRow
            index={4}
            heading="Dive into the resources"
            subHeading="Released in 15 days"
            status={getActiveStatus(4)}
            onSubmit={() => {
              handleDiveIntoResources();
              trackGenericEvent(cohort, 'Home Page - Get Ready - Resources Step Started');
            }}
            classes={classes}
          />
          <StyledDivider />
        </Stack>
      </SectionContainer>
    </>
  );
}
