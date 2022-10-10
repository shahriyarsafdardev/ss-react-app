import { Divider, Stack, styled, Theme, Typography } from '@material-ui/core';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import OnboardingModal from 'components/cohorts/onboarding/OnboardingModal';
import useAuth from 'hooks/useAuth';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
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
  const [pageLoaded, setPageLoaded] = useState(false);
  const { user } = useAuth();
  const [modalState, setModalState] = useState(false);
  const { sendAnalyticsData } = useContext(AnalyticsContext);
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
    if (!pageLoaded) {
      sendAnalyticsData('Cohort Onboarding - Get Ready Page - Page Loaded', {});
      setPageLoaded(true);
    }
    stepStatus();
  }, [onboarding_data]);

  const handleCalendarInstructions = () => {
    dispatch(markOnboardingStep(cohort.id, 'sessions_added_to_calendar'));
    sendAnalyticsData(`Cohort Onboarding - Calendar Modal - "I've added the sessions" Selected`, {
      'Calendar URL': cohort.calendar_invite_url
    });
    sendAnalyticsData('Cohort Onboarding - Get Ready Page - Step Complete', {
      'Step Number': 2,
      'Step Main Description': 'Add the sessions to your calendar',
      'Step Secondary Description': "So you don't forget any live classes"
    });
  };

  const handleIntroductionCompleted = () => {
    sendAnalyticsData('Cohort Onboarding - Get Ready Page - "Start" Selected', {
      'Step Number': 3,
      'Step Main Description': 'Introduce yourselves to your peers',
      'Step Secondary Description':
        'To connect with the like minded data professionals also in this cohort'
    });
    dispatch(markOnboardingStep(cohort.id, 'messaging_tab_opened'));
    sendAnalyticsData('Cohort Onboarding - Get Ready Page - Step Complete', {
      'Step Number': 3,
      'Step Main Description': 'Introduce yourselves to your peers',
      'Step Secondary Description':
        'To connect with the like minded data professionals also in this cohort'
    });
    navigate(`${PATH_DASHBOARD.cohorts.messaging(cohort.id)}`);
  };

  const handleDiveIntoResources = () => {
    sendAnalyticsData('Cohort Onboarding - Get Ready Page - "Start" Selected', {
      'Step Number': 4,
      'Step Main Description': 'Dive into the resources',
      'Step Secondary Description': 'Released in 15 days'
    });
    dispatch(markOnboardingStep(cohort.id, 'resources_invoked'));
    sendAnalyticsData('Cohort Onboarding - Get Ready Page - Step Complete', {
      'Step Number': 4,
      'Step Main Description': 'Dive into the resources',
      'Step Secondary Description': 'Released in 15 days'
    });
  };

  return (
    <>
      {!hasOnboarded && user?.type === 'learner' && (
        <OnboardingModal
          onboardingModalState={onboardingModalState}
          setOnboardingModalState={setOnboardingModalState}
          onSubmit={() =>
            sendAnalyticsData('Cohort Onboarding - Get Ready Page - Step Complete', {
              'Step Number': 1,
              'Step Main Description': `Tell ${cohort?.host_names} about yourself`,
              'Step Secondary Description':
                'We use the information you share to provide a personalized learning experience'
            })
          }
        />
      )}
      <CalendarInstructionsModal
        cohort={cohort}
        modalState={modalState}
        setModalState={setModalState}
        handleSubmit={handleCalendarInstructions}
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
              sendAnalyticsData('Cohort Onboarding - Get Ready Page - "Start" Selected', {
                'Step Number': 1,
                'Step Main Description': `Tell ${cohort?.host_names} about yourself`,
                'Step Secondary Description':
                  'We use the information you share to provide a personalized learning experience'
              });
            }}
          />
          <StyledDivider />
          <OnboardingSectionRow
            index={2}
            heading="Add the sessions to your calendar"
            subHeading="Add the sessions to your calendar"
            status={getActiveStatus(2)}
            classes={classes}
            onSubmit={() => {
              setModalState(true);
              sendAnalyticsData('Cohort Onboarding - Get Ready Page - "Start" Selected', {
                'Step Number': 2,
                'Step Main Description': 'Add the sessions to your calendar',
                'Step Secondary Description': "So you don't forget any live classes"
              });
            }}
          />
          <StyledDivider />
          <OnboardingSectionRow
            index={3}
            heading="Introduce yourselves to your peers"
            subHeading="To connect with the like minded data professionals also in this cohort"
            status={getActiveStatus(3)}
            onSubmit={() => handleIntroductionCompleted()}
            classes={classes}
          />
          <StyledDivider />
          <OnboardingSectionRow
            index={4}
            heading="Dive into the resources"
            subHeading="Released in 15 days"
            status={getActiveStatus(4)}
            onSubmit={() => handleDiveIntoResources()}
            classes={classes}
          />
          <StyledDivider />
        </Stack>
      </SectionContainer>
    </>
  );
}
