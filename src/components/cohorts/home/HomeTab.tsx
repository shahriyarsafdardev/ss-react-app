import { useEffect, useState } from 'react';
import { Container, Box, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { NavLink as RouterLink } from 'react-router-dom';
import Page from 'components/Page';
import moment from 'moment';
import { EVENT_TYPES, sendAmplitudeData, trackHomePageEvents } from 'utils/amplitude';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import OnboardingModal from 'components/cohorts/onboarding/OnboardingModal';
import useAuth from 'hooks/useAuth';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { getSessions } from '../../../redux/slices/cohort';
import { Session } from '../../../@types/cohorts';
import CohortTimeLine from './CohortTimeLine';
import NetworkSuggestion from './NetworkSuggestion';
import SessionPrereading from './SessionPrereading';
import { firstUpcomingDate } from './Common';
import EmptyHomeTab from '../onboarding/empty-states/EmptyHomeTab';
import NewOnboardingModal from '../onboarding/NewOnboardingModal';
import NewHomeTab from './NewHomeTab';
import SurveyQuestionsModal from '../onboarding/SurveyQuestionsModal';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    marginTop: 0,
    '> div': {
      marginTop: '20px'
    }
  }
}));

const IBRAHIM_COHORT_ID = 'e0d1f216-104e-4018-aea2-86f00f0ce3dd';

const Index = () => {
  const dispatch = useDispatch();
  const [hasOnboarded, setHasOnboarded] = useState(true);
  const [hasQuestionSubmitted, setQuestionSubmitted] = useState(true);
  const [activeSession, setActiveSession] = useState<Session | undefined>(undefined);
  const [analyticsSent, setAnalyticsSent] = useState(false);
  const { mode } = useSelector((state: RootState) => state.instructorView);
  const { user } = useAuth();

  const cohort_id = window.location.pathname.split('/')[2] || '';
  // eslint-disable-next-line prefer-const
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const { sessions } = cohort || [];

  useEffect(() => {
    if (cohort && !analyticsSent) {
      sendAmplitudeData(EVENT_TYPES.page_view, {
        page_type: EVENT_TYPES.home_tab,
        [EVENT_TYPES.cohort_name]: cohort.name,
        [EVENT_TYPES.cohort_intake_number]: cohort.intake
      });
      setAnalyticsSent(true);
    }
  }, [cohort]);

  useEffect(() => {
    if (cohort && !sessions) {
      dispatch(getSessions(cohort.id));
      setHasOnboarded(cohort?.is_onboarded);
      setQuestionSubmitted(cohort?.is_feedback_submitted);
    }
  }, [cohort]);

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
    trackHomePageEvents(
      cohort.name,
      cohort.intake,
      sessionNumber,
      eventCategory,
      eventData,
      source
    );
  };

  const onAddCalendar = () => {
    sendAnalyticsData(1, 'Cohort Calendar', 'Add Calendar');
  };

  const HomeTabSection = () => (
    <Container style={{ marginBottom: '50px' }}>
      <CohortTimeLine cohort={cohort} sessions={sessions} />
      <Button
        onClick={() => onAddCalendar()}
        component={RouterLink}
        to={`/cohorts/${cohort_id}/calendar-instructions`}
        style={{ marginTop: '20px' }}
        fullWidth
        variant="outlined"
      >
        Add sessions to your calendar
      </Button>
      <StyledBox>
        <SessionPrereading cohort={cohort} sessions={sessions} activeSession={activeSession} />
        <NetworkSuggestion cohort={cohort} activeSession={activeSession?.number} />
      </StyledBox>
    </Container>
  );

  const renderHomeTab = () =>
    cohort.new_home_tab ? (
      <NewHomeTab cohort={cohort} sessions={sessions} activeSession={activeSession} />
    ) : (
      <HomeTabSection />
    );

  const shouldOpenModal = () => !hasOnboarded && user?.type === 'learner';
  const questionSubmittedModal = () => !hasQuestionSubmitted && user?.type === 'learner';

  const renderOnboardingModal = () =>
    cohort?.id === IBRAHIM_COHORT_ID ? (
      <NewOnboardingModal onSubmit={() => {}} />
    ) : (
      <OnboardingModal onSubmit={() => {}} />
    );

  return (
    <Page title="Sphere | Homepage">
      {shouldOpenModal() && renderOnboardingModal()}
      {cohort?.is_onboarded === true && questionSubmittedModal() && (
        <SurveyQuestionsModal state={questionSubmittedModal()} cohort_id={cohort_id} />
      )}
      {cohort?.released_for_learners === true || mode === 'Instructor' ? (
        <AnalyticsContext.Provider value={{ sendAnalyticsData }}>
          {renderHomeTab()}
        </AnalyticsContext.Provider>
      ) : (
        <EmptyHomeTab
          key={cohort_id}
          calendarLink={cohort?.calendar_invite_url}
          cohortID={cohort_id}
          cohortCode={cohort?.name}
          cohortHost={cohort?.host_names}
        />
      )}
    </Page>
  );
};
export default Index;
