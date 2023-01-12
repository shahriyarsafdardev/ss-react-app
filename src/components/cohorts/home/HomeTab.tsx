import { useCallback, useEffect, useState } from 'react';
import { Container, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Page from 'components/Page';
import moment from 'moment';
import { LoadingContainer } from 'pages/admin/Common';
import LoadingScreen from 'components/LoadingScreen';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { trackEvent } from 'utils/eventTracking';
import { useLocation } from 'react-router-dom';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { getBriefSessions } from '../../../redux/slices/cohort';
import { Session } from '../../../@types/cohorts';
import CohortTimeLine from './CohortTimeLine';
import { firstUpcomingDate, useStyles } from './Common';
import NewHomeTab from './NewHomeTab';
import GetReadyPage from './GetReadyPage';
import WelcomePage from './WelcomePage';
import OffboardingPage from './OffboardingPage';
import CohortSurveyModal from './CohortSurveyModal';

const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: '2rem',
  [theme.breakpoints.down('md')]: {
    width: '95%',
    margin: '3rem auto'
  }
}));

const Index = () => {
  const dispatch = useDispatch();
  const [activeSession, setActiveSession] = useState<Session | undefined>(undefined);
  const [analyticsSent, setAnalyticsSent] = useState(false);
  const [activeStepper, setActiveStepper] = useState(0);
  const [surveyModalState, setSurveyModalState] = useState(false);
  const url = new URLSearchParams(useLocation().search);
  const paramStep = url.get('active_step');
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const { sessions } = cohort || [];
  const { onboarding_data } = cohort || {};
  const classes = useStyles();

  useEffect(() => {
    if (cohort && !analyticsSent) {
      sendAnalyticsData('Home Page - Page Loaded', {});
      setAnalyticsSent(true);
    }
  }, [cohort]);

  useEffect(() => {
    if (cohort && !sessions) {
      dispatch(getBriefSessions(cohort.id));
    }
  }, [cohort]);

  useEffect(() => {
    if (cohort) {
      if (
        onboarding_data?.onboarding_questionnaire_step_completed &&
        onboarding_data?.onboarding_is_any_question_unanswered
      ) {
        setSurveyModalState(true);
      }
      if (
        !onboarding_data?.onboarding_messaging_step_completed ||
        !onboarding_data?.onboarding_questionnaire_step_completed ||
        !onboarding_data?.onboarding_referral_step_completed ||
        !onboarding_data?.onboarding_calendar_sync_step_completed ||
        !onboarding_data?.onboarding_networking_step_completed
      ) {
        setActiveStepper(0);
      } else if (new Date(cohort?.start_date) > new Date() && paramStep === '1') {
        setActiveStepper(1);
      } else {
        setActiveStepper(2);
      }
    }
  }, [cohort, onboarding_data, paramStep]);

  useEffect(() => {
    setActiveSession(undefined);
  }, []);

  useEffect(() => {
    let found = false;
    sessions?.forEach((session) => {
      if (!found && moment(firstUpcomingDate(session.times)) > moment().subtract(2, 'hour')) {
        setActiveSession(session);
        found = true;
      }
    });
    if (!found) {
      setActiveSession(undefined);
    }
  }, [sessions, activeSession]);

  const sendAnalyticsData = (eventName: string, eventData: any) => {
    cohort && trackEvent(cohort, eventName, eventData);
  };

  const checkAllSessionsPassed = () =>
    !sessions
      .map((session) => moment(firstUpcomingDate(session.times)) < moment().subtract(2, 'hour'))
      .includes(false);

  const displayActiveStep = useCallback(() => {
    if (activeStepper === 0) {
      return <WelcomePage setActiveStepper={setActiveStepper} cohort={cohort} />;
    }
    if (activeStepper === 1) {
      return <GetReadyPage cohort={cohort} />;
    }

    return <NewHomeTab cohort={cohort} sessions={sessions} activeSession={activeSession} />;
  }, [activeStepper, cohort, activeSession, sessions]);

  const homeTabSection = () => (
    <>
      {surveyModalState && (
        <CohortSurveyModal
          surveyModalState={surveyModalState}
          setSurveyModalState={setSurveyModalState}
          cohort={cohort}
        />
      )}
      <Container sx={{ marginBottom: '50px' }}>
        <CohortTimeLine cohort={cohort} sessions={sessions} activeStepper={activeStepper} />
        <StyledBox>{displayActiveStep()}</StyledBox>
      </Container>
    </>
  );

  if (!cohort || typeof sessions === 'undefined') {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <Page title="Sphere | Homepage" className={classes.homePage}>
      <AnalyticsContext.Provider value={{ sendAnalyticsData }}>
        {checkAllSessionsPassed() &&
        cohort?.code === 'ACI' &&
        cohort?.certificate_links?.length > 0 ? (
          <OffboardingPage cohort={cohort} />
        ) : (
          homeTabSection()
        )}
      </AnalyticsContext.Provider>
    </Page>
  );
};
export default Index;
