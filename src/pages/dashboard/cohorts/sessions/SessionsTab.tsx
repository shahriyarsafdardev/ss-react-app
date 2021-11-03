import { useEffect, useState } from 'react';
import { Container, Grid, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import OnboardingModal from 'components/cohorts/onboarding/OnboardingModal';
import axios from 'utils/axios';
import LoadingScreen from 'components/LoadingScreen';
import { sendAmplitudeData, EVENT_TYPES } from 'utils/amplitude';
import { CohortContext, SessionContext } from 'contexts/CohortContext';
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import { getSessions } from '../../../../redux/slices/cohort';
import { SessionListItem } from '../../../../@types/cohorts';
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
  const [hasOnboarded, setHasOnboarded] = useState(true);
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const { sessions } = cohort || [];
  let trimmedSessionData: SessionListItem[] = [];

  if (sessions && sessions.length) {
    trimmedSessionData = sessions.map((session) => ({
      id: session.id,
      name: session.name,
      time: session.time,
      length: session.length,
      number: session.number
    }));
  }

  useEffect(() => {
    sendAmplitudeData(EVENT_TYPES.page_view, {
      page_type: EVENT_TYPES.sessions_tab
    });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let sessionNumber = Number(params.get('session'));
    sessionNumber--;
    if (sessions && sessionNumber && sessionNumber >= 0 && sessionNumber < sessions.length) {
      setSelectedSession(sessionNumber);
    }
  }, [sessions]);

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

  return (
    <CohortContext.Provider
      value={{ id: cohort?.id, cohortName: cohort?.name, cohortIntake: cohort?.intake }}
    >
      <Page title="ScholarSite | Sessions">
        {!hasOnboarded && <OnboardingModal onSubmit={() => {}} />}
        {sessions ? (
          <SessionsContainer>
            <SessionsInnerContainer container>
              <Grid item md={8} sm={12}>
                <SessionContext.Provider value={{ sessionNumber: selectedSession + 1 }}>
                  <SessionBoard session={sessions && sessions[selectedSession]} />
                </SessionContext.Provider>
              </Grid>
              <SessionListDesktopContainer item md={4}>
                <SessionList
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
        ) : (
          <LoadingContainer>
            <LoadingScreen />
          </LoadingContainer>
        )}
      </Page>
    </CohortContext.Provider>
  );
}
