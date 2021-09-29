import { useEffect, useState } from 'react';
// material
import { Container, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

// redux
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import { getSessions } from '../../../../redux/slices/cohort';
import { SessionListItem } from '../../../../@types/cohorts';
import SessionListSidebar from './SessionListSidebar';

// components
import Page from '../../../../components/Page';
import SessionBoard from './SessionBoard';
import SessionList from './SessionList';
// ----------------------------------------------------------------------

const SessionsContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
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
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}));

export default function SessionsTab() {
  const dispatch = useDispatch();
  const [selectedSession, setSelectedSession] = useState(0);
  const { sessions } = useSelector((state: RootState) => state.cohort.cohorts[0]);
  const cohort_id = window.location.pathname.split('/')[2] || '';

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
    dispatch(getSessions(cohort_id));
  }, [cohort_id, dispatch]);

  return (
    <Page title="ScholarSite | Sessions">
      <SessionsContainer>
        <SessionsInnerContainer container>
          <Grid item md={8} sm={12}>
            <SessionBoard session={sessions && sessions[selectedSession]} />
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
    </Page>
  );
}
