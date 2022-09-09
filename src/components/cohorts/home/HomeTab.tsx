import { useEffect, useState } from 'react';
import { Container, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Page from 'components/Page';
import moment from 'moment';
import { LoadingContainer } from 'pages/admin/Common';
import LoadingScreen from 'components/LoadingScreen';
import { EVENT_TYPES, trackHomePageEvents, trackPageViewEvent } from 'utils/amplitude';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import useAuth from 'hooks/useAuth';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { getSessions } from '../../../redux/slices/cohort';
import { Session } from '../../../@types/cohorts';
import CohortTimeLine from './CohortTimeLine';
import { firstUpcomingDate } from './Common';
import EmptyHomeTab from '../onboarding/empty-states/EmptyHomeTab';
import NewHomeTab from './NewHomeTab';
// import SurveyQuestionsModal from '../onboarding/SurveyQuestionsModal';
import GetReadyChecklist from './GetReadyChecklist';
import WelcomePage from './WelcomePage';

const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: '2rem',
  [theme.breakpoints.down('md')]: {
    width: '95%',
    margin: '3rem auto'
  }
}));

const Index = () => {
  const dispatch = useDispatch();
  const [hasQuestionSubmitted, setQuestionSubmitted] = useState(true);
  const [activeSession, setActiveSession] = useState<Session | undefined>(undefined);
  const [analyticsSent, setAnalyticsSent] = useState(false);
  const { mode } = useSelector((state: RootState) => state.instructorView);
  const { user } = useAuth();
  const [activeStepper, setActiveStepper] = useState(0);

  const cohort_id = window.location.pathname.split('/')[2] || '';
  // eslint-disable-next-line prefer-const
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const { sessions } = cohort || [];
  const { onboarding_data } = cohort || {};

  useEffect(() => {
    if (cohort && !analyticsSent) {
      trackPageViewEvent(cohort, EVENT_TYPES.home_tab);
      setAnalyticsSent(true);
    }
  }, [cohort]);

  useEffect(() => {
    if (cohort && !sessions) {
      dispatch(getSessions(cohort.id));
      setQuestionSubmitted(cohort?.is_feedback_submitted);
    }
  }, [cohort]);

  useEffect(() => {
    if (cohort && onboarding_data) {
      if (!onboarding_data.is_onboarded) {
        setActiveStepper(0);
        return;
      }
      if (
        !onboarding_data?.is_onboarded ||
        !onboarding_data?.sessions_added_to_calendar ||
        !onboarding_data?.messaging_tab_opened ||
        !onboarding_data?.resources_invoked
      ) {
        setActiveStepper(1);
      } else {
        setActiveStepper(2);
      }
    }
  }, [cohort, onboarding_data]);

  useEffect(() => {
    setActiveSession(undefined);
  }, []);

  useEffect(() => {
    let found = false;
    sessions?.forEach((session) => {
      if (!found && moment(firstUpcomingDate(session.times)) > moment().subtract(3, 'hour')) {
        setActiveSession(session);
        found = true;
      }
    });
    if (!found) {
      setActiveSession(undefined);
    }
  }, [sessions, activeSession]);

  const sendAnalyticsData = (
    sessionNumber: number,
    eventCategory: string,
    eventData: string,
    source?: string
  ) => {
    trackHomePageEvents(sessionNumber, eventCategory, eventData, source, cohort);
  };

  const displayActiveStep = () => {
    if (activeStepper === 0) {
      return <WelcomePage setActiveStepper={setActiveStepper} cohort={cohort} />;
    }
    if (activeStepper === 1) {
      return <GetReadyChecklist cohort={cohort} />;
    }

    return <NewHomeTab cohort={cohort} sessions={sessions} activeSession={activeSession} />;
  };

  const homeTabSection = () => (
    <Container style={{ marginBottom: '50px' }}>
      <CohortTimeLine cohort={cohort} sessions={sessions} activeStepper={activeStepper} />
      <StyledBox>{displayActiveStep()}</StyledBox>
    </Container>
  );

  const questionSubmittedModal = () => !hasQuestionSubmitted && user?.type === 'learner';

  if (!cohort || typeof sessions === 'undefined') {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <Page title="Sphere | Homepage">
      {/* {cohort?.onboarding_data?.is_onboarded === true && questionSubmittedModal() && (
        <SurveyQuestionsModal state={questionSubmittedModal()} cohort_id={cohort_id} />
      )} */}
      {sessions?.length > 0 &&
      (cohort?.released_for_learners === true ||
        cohort?.readings_released === true ||
        mode === 'Instructor') ? (
        <AnalyticsContext.Provider value={{ sendAnalyticsData }}>
          {homeTabSection()}
        </AnalyticsContext.Provider>
      ) : (
        <EmptyHomeTab
          key={cohort?.id}
          calendarLink={cohort?.calendar_invite_url}
          cohortID={cohort?.id}
          cohortCode={cohort?.name}
          cohortHost={cohort?.host_names}
        />
      )}
    </Page>
  );
};
export default Index;
