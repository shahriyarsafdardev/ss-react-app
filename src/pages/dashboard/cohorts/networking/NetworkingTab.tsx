import { useEffect, useState } from 'react';
import { Container, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import MatchProgress from 'components/cohorts/networking/MatchProgress';
import AvailableMatches from 'components/cohorts/networking/AvailableMatches';
import MatchingUser from 'components/cohorts/networking/MatchingUser';
import useAuth from 'hooks/useAuth';
import { RootState, useDispatch, useSelector } from 'redux/store';
import { getPeers } from 'redux/slices/cohort';

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
  const { user } = useAuth();

  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) =>
      state?.cohort?.cohorts?.filter((cohort: any) => cohort_id === cohort.id)[0]
  );
  const { peers } = cohort || [];

  useEffect(() => {
    if (cohort && !peers) {
      dispatch(getPeers(cohort_id.toString(), 'null'));
    }
  }, [cohort]);

  const participants = peers?.filter((peer) => peer.type === 'learner');

  return (
    <Page title="ScholarSite | Networking">
      {peers ? (
        <Container style={{ marginBottom: '50px' }}>
          <MatchProgress current={participants[0] ? 1 : 0} total={participants.length} />
          <StyledBox>
            <MatchingUser user={participants[0]} />
            <AvailableMatches user={participants[0]} users={participants} />
          </StyledBox>
        </Container>
      ) : (
        <LoadingContainer>
          <LoadingScreen />
        </LoadingContainer>
      )}
    </Page>
  );
};
export default Index;
