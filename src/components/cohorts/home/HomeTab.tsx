import { useEffect, useState } from 'react';
import { Container, Box, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { NavLink as RouterLink } from 'react-router-dom';
import Page from 'components/Page';
import axios from 'utils/axios';
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

const Index = () => {
  const dispatch = useDispatch();
  const [hasOnboarded, setHasOnboarded] = useState(true);
  const [activeSession, setActiveSession] = useState<Session | undefined>(undefined);
  const [analyticsSent, setAnalyticsSent] = useState(false);
  const { mode } = useSelector((state: RootState) => state.instructorView);
  const { user } = useAuth();

  const cohort_id = window.location.pathname.split('/')[2] || '';
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
      axios
        .get(`/cohorts/${cohort.id}/onboarding/onboarding_complete.json`)
        .then((res) => res.data)
        .then((payload) => {
          setHasOnboarded(payload);
        });
    }
  }, [cohort]);

  useEffect(() => {
    setActiveSession(undefined);
  }, []);

  useEffect(() => {
    let found = false;
    sessions?.forEach((session) => {
      if (!found && moment(firstUpcomingDate(session.times)).add(1, 'hour') > moment()) {
        setActiveSession(session);
        found = true;
      }
    });
    if (!found) {
      setActiveSession(undefined);
    }
  }, [sessions, activeSession]);

  const sendAnalyticsData = (sessionNumber: number, eventCategory: string, eventData: string) => {
    trackHomePageEvents(cohort.name, cohort.intake, sessionNumber, eventCategory, eventData);
  };

  const shouldOpenModal = () => !hasOnboarded && user?.type === 'learner';

  return (
    <Page title="ScholarSite | Homepage">
      {shouldOpenModal() && <OnboardingModal onSubmit={() => {}} />}
      {cohort?.released_for_learners === true || mode === 'Instructor' ? (
        <AnalyticsContext.Provider value={{ sendAnalyticsData }}>
          <Container style={{ marginBottom: '50px' }}>
            <CohortTimeLine cohort={cohort} sessions={sessions} />
            <Button
              component={RouterLink}
              to={`/cohorts/${cohort_id}/calendar-instructions`}
              style={{ marginTop: '20px' }}
              fullWidth
              variant="outlined"
            >
              Add sessions to your calendar
            </Button>
            <StyledBox>
              <SessionPrereading
                cohort={cohort}
                sessions={sessions}
                activeSession={activeSession}
              />
              <NetworkSuggestion cohort={cohort} activeSession={activeSession?.number} />
            </StyledBox>
          </Container>
        </AnalyticsContext.Provider>
      ) : (
        <EmptyHomeTab
          key={cohort_id}
          calendarLink={cohort?.calendar_invite_url}
          cohortID={cohort_id}
          cohortCode={cohort?.code}
          cohortHost={cohort?.host_names}
        />
      )}
    </Page>
  );
};
export default Index;
