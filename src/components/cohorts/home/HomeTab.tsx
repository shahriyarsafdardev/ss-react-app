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

  if (!cohort || !sessions || sessions.length === 0) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }
  const shouldOpenModal = () => !hasOnboarded && user?.type === 'learner';

  return (
    <Page title="ScholarSite | Homepage">
      {shouldOpenModal() && <OnboardingModal onSubmit={() => {}} />}
      {cohort?.released_for_learners === true || mode === 'Instructor' ? (
        <AnalyticsContext.Provider value={{ sendAnalyticsData }}>
          <Container style={{ marginBottom: '50px' }}>
            {mode === 'Instructor' && cohort.registration_phase ? (
              <CohortAnalytics key={mode} cohort_id={cohort?.id} />
            ) : (
              <CohortTimeLine key={mode} cohort={cohort} sessions={sessions} />
            )}
            <StyledBox>
              {mode === 'Instructor' ? (
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
              {mode === 'Instructor' ? (
                <CohortGuides cohort={cohort} activeSession={activeSession} sessions={sessions} />
              ) : (
                <NetworkSuggestion cohort={cohort} activeSession={activeSession?.number} />
              )}
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
