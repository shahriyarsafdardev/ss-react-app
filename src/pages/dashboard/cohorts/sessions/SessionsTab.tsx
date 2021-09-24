import { useEffect, useState } from 'react';
// material
import { Container, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
// redux
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import { getSessions } from '../../../../redux/slices/cohort';
import { SessionListItem } from '../../../../@types/cohorts';

// components
import Page from '../../../../components/Page';
import SessionBoard from './SessionBoard';
import SessionList from './SessionList';
import SessionListSidebar from './SessionListSidebar';
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

  useEffect(() => {
    dispatch(getSessions('cohort-1'));
  }, [dispatch]);

  let trimmedSessionData: SessionListItem[] = [];
  if (sessions && sessions.length) {
    trimmedSessionData = sessions.map((session) => ({
      id: session.id,
      name: session.name,
      datetime: session.datetime,
      length: session.length,
      number: session.number
    }));
  }

  return (
    <Page title="Sessions | Minimal-UI">
      <SessionsContainer>
        <SessionsInnerContainer container sm={12} xs={12} spacing={12}>
          <Grid item md={8} sm={12}>
            <SessionBoard session={sessions && sessions[selectedSession]} />
          </Grid>
          <SessionListDesktopContainer item md={4}>
            <SessionList onClick={setSelectedSession} sessionsList={trimmedSessionData} />
          </SessionListDesktopContainer>
        </SessionsInnerContainer>
        <SessionListSidebar
          setSelectedSession={setSelectedSession}
          sessionsList={trimmedSessionData}
        />
      </SessionsContainer>
    </Page>
  );
}
