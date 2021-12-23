import { useEffect, useState } from 'react';
import { Container, Grid, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import LoadingScreen from 'components/LoadingScreen';
import { sendAmplitudeData, EVENT_TYPES, trackSessionsPageEvent } from 'utils/amplitude';
import { CohortContext, SessionContext } from 'contexts/CohortContext';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import useAuth from 'hooks/useAuth';
import EmptySessionsTab from 'components/cohorts/onboarding/empty-states/EmptySessionsTab';
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import { getSessions } from '../../../../redux/slices/cohort';
import { Session, SessionListItem } from '../../../../@types/cohorts';
import SessionListSidebar from './SessionListSidebar';
import Page from '../../../../components/Page';
import SessionBoard from './SessionBoard';
import SessionList from './SessionList';

// ----------------------------------------------------------------------

const SessionsContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  marginBottom: '50px',
  [theme.breakpoints.down('sm')]: {
    display: 'block'
  }
}));

const SessionsInnerContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    marginLeft: 0,
    '.MuiGrid-item': {
      paddingLeft: 0
    }
  }
}));

const SessionListDesktopContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));

export default function SessionsTab() {
  const dispatch = useDispatch();
  const [selectedSession, setSelectedSession] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const [analyticsSent, setAnalyticsSent] = useState(false);
  const { mode } = useSelector((state: RootState) => state.instructorView);

  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const { user } = useAuth();

  const isLearner = user?.type === 'learner';
  const { sessions } = cohort || [];
  let trimmedSessionData: SessionListItem[] = [];
  const filteredSessions: Session[] = sessions?.filter(
    (session) => session.display_in_sessions_tab === true
  );

  if (filteredSessions && filteredSessions.length) {
    trimmedSessionData = filteredSessions.map((session) => ({
      id: session.id,
      name: session.name,
      times: session.times,
      length: session.length,
      number: session.number
    }));
  }

  useEffect(() => {
    if (cohort && !analyticsSent) {
      sendAmplitudeData(EVENT_TYPES.page_view, {
        page_type: EVENT_TYPES.sessions_tab,
        [EVENT_TYPES.cohort_name]: cohort?.name,
        [EVENT_TYPES.cohort_intake_number]: cohort?.intake
      });
      setAnalyticsSent(true);
    }
  }, [cohort]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let sessionNumber = Number(params.get('session'));
    setSelectedTab(Number(params.get('tab')));
    sessionNumber--;
    if (
      filteredSessions &&
      sessionNumber &&
      sessionNumber >= 0 &&
      sessionNumber < filteredSessions.length
    ) {
      setSelectedSession(sessionNumber);
    }
  }, [sessions]);

  useEffect(() => {
    if (cohort && !sessions) {
      dispatch(getSessions(cohort.id));
    }
  }, [cohort]);

  const sendAnalyticsData = (sessionNumber: number, eventCategory: string, eventData: string) => {
    trackSessionsPageEvent(cohort.name, cohort.intake, sessionNumber, eventCategory, eventData);
  };

  const cohortSessions = () =>
    filteredSessions && filteredSessions.length > 0 ? (
      <AnalyticsContext.Provider value={{ sendAnalyticsData }}>
        <SessionsContainer>
          <SessionsInnerContainer container>
            <Grid item md={8} sm={12}>
              <SessionContext.Provider value={{ sessionNumber: selectedSession + 1 }}>
                <SessionBoard
                  selectedTab={selectedTab}
                  isLearner={isLearner}
                  session={filteredSessions && filteredSessions[selectedSession]}
                />
              </SessionContext.Provider>
            </Grid>
            <SessionListDesktopContainer item md={4}>
              <SessionList
                isLearner={isLearner}
                onClick={setSelectedSession}
                selectedSession={selectedSession}
                sessionsList={trimmedSessionData}
              />
            </SessionListDesktopContainer>
          </SessionsInnerContainer>
          <SessionListSidebar
            setSelectedSession={setSelectedSession}
            selectedSession={selectedSession}
            sessionsList={trimmedSessionData}
          />
        </SessionsContainer>
      </AnalyticsContext.Provider>
    ) : (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );

  return (
    <CohortContext.Provider
      value={{ id: cohort?.id, cohortName: cohort?.name, cohortIntake: cohort?.intake }}
    >
      <Page title="ScholarSite | Sessions">
        {cohort?.released_for_learners === true || mode === 'Instructor' ? (
          cohortSessions()
        ) : (
          <EmptySessionsTab key={cohort_id} cohortHost={cohort?.host_names} />
        )}
      </Page>
    </CohortContext.Provider>
  );
}
