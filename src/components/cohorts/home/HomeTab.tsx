import { useEffect, useState } from 'react';
import { Container, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import useAuth from 'hooks/useAuth';
import Page from 'components/Page';
import axios from 'utils/axios';
import moment from 'moment';
import { EVENT_TYPES, sendAmplitudeData, trackHomePageEvents } from 'utils/amplitude';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import OnboardingModal from 'components/cohorts/onboarding/OnboardingModal';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { getSessions } from '../../../redux/slices/cohort';
import { Session } from '../../../@types/cohorts';
import CohortTimeLine from './CohortTimeLine';
import NetworkSuggestion from './NetworkSuggestion';
import Registrations from './Registrations';
import LoadingScreen from '../../LoadingScreen';
import SessionPrereading from './SessionPrereading';
import CohortAnalytics from './CohortAnalytics';
import SurveyFeedback from './SurveyFeedback';
import { firstUpcomingDate } from './Common';
import CohortGuides from './CohortGuides';

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

const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));

const Index = () => {
  const dispatch = useDispatch();
  const [hasOnboarded, setHasOnboarded] = useState(true);
  const [activeSession, setActiveSession] = useState<Session | undefined>(undefined);
  const [analyticsSent, setAnalyticsSent] = useState(false);
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

  if (!cohort || !sessions || sessions.length === 0) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }
  return (
    <Page title="ScholarSite | Homepage">
      <AnalyticsContext.Provider value={{ sendAnalyticsData }}>
        {!hasOnboarded && <OnboardingModal onSubmit={() => {}} />}
        <Container style={{ marginBottom: '50px' }}>
          {user?.view_type === 'Instructor' && cohort.registration_phase ? (
            <CohortAnalytics key={user?.view_type} cohort_id={cohort?.id} />
          ) : (
            <CohortTimeLine key={user?.view_type} cohort={cohort} sessions={sessions} />
          )}
          <StyledBox>
            {user?.view_type === 'Instructor' ? (
              <>
                {cohort.registration_phase ? (
                  <Registrations cohort={cohort} />
                ) : (
                  <SurveyFeedback sessions={sessions} />
                )}
              </>
            ) : (
              <SessionPrereading
                cohort={cohort}
                sessions={sessions}
                activeSession={activeSession}
              />
            )}
            {user?.view_type === 'Instructor' ? (
              <CohortGuides cohort={cohort} activeSession={activeSession} sessions={sessions} />
            ) : (
              <NetworkSuggestion cohort={cohort} activeSession={activeSession?.number} />
            )}
          </StyledBox>
        </Container>
      </AnalyticsContext.Provider>
    </Page>
  );
};
export default Index;
