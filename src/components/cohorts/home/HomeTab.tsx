import { useEffect, useState } from 'react';
import { Container, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Page from 'components/Page';
import moment from 'moment';
import {
  EVENT_TYPES,
  sendAmplitudeData,
  trackHomePageEvents,
  HOME_PAGE_EVENTS
} from 'utils/amplitude';

import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { getSessions } from '../../../redux/slices/cohort';
import { Session } from '../../../@types/cohorts';
import CohortTimeLine from './CohortTimeLine';
import NetworkSuggestion from './NetworkSuggestion';
import SessionPrereading from './SessionPrereading';

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
  const [activeSession, setActiveSession] = useState<Session | undefined>(undefined);
  const [analyticsSent, setAnalyticsSent] = useState(false);

  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const { sessions } = cohort || [];

  useEffect(() => {
    if (cohort && !analyticsSent) {
      sendAmplitudeData(EVENT_TYPES.page_view, {
        page_type: EVENT_TYPES.home_tab,
        [HOME_PAGE_EVENTS.cohort_name]: cohort.name,
        [HOME_PAGE_EVENTS.cohort_intake_number]: cohort.intake
      });
      setAnalyticsSent(true);
    }
  }, [cohort]);

  useEffect(() => {
    if (cohort && !sessions) {
      dispatch(getSessions(cohort.id));
    }
  }, [cohort]);

  useEffect(() => {
    setActiveSession(undefined);
  }, []);

  useEffect(() => {
    let found = false;
    sessions?.forEach((session) => {
      if (!found && moment(session.time).add(1, 'hour') > moment()) {
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

  return (
    <Page title="ScholarSite | Homepage">
      <AnalyticsContext.Provider value={{ sendAnalyticsData }}>
        <Container style={{ marginBottom: '50px' }}>
          <CohortTimeLine cohort={cohort} sessions={sessions} />
          <StyledBox>
            <SessionPrereading cohort={cohort} sessions={sessions} activeSession={activeSession} />
            <NetworkSuggestion cohort={cohort} activeSession={activeSession?.number} />
          </StyledBox>
        </Container>
      </AnalyticsContext.Provider>
    </Page>
  );
};
export default Index;
