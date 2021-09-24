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
// ----------------------------------------------------------------------

const SessionsContainer = styled(Container)((props) => ({
  display: 'flex'
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
      datetime: session.datetime,
      length: session.length,
      number: session.number
    }));
  }

  useEffect(() => {
    dispatch(getSessions(cohort_id));
  }, [cohort_id, dispatch]);

  return (
    <Page title="Sessions | Minimal-UI">
      <SessionsContainer>
        <Grid container>
          <Grid item md={8}>
            <SessionBoard session={sessions && sessions[selectedSession]} />
          </Grid>
          <Grid item md={4}>
            <SessionList onClick={setSelectedSession} sessionsList={trimmedSessionData} />
          </Grid>
        </Grid>
      </SessionsContainer>
    </Page>
  );
}
