import { useEffect } from 'react';
import { Container, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Page from 'components/Page';
import moment from 'moment';
import LoadingScreen from 'components/LoadingScreen';
import MatchProgress from 'components/cohorts/networking/MatchProgress';
import AvailableMatches from 'components/cohorts/networking/AvailableMatches';
import MatchingUser from 'components/cohorts/networking/MatchingUser';
import { RootState, useDispatch, useSelector } from 'redux/store';
import { getPeers, matchUsers } from 'redux/slices/cohort';

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
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) =>
      state?.cohort?.cohorts?.filter((cohort: any) => cohort_id === cohort.id)[0]
  );
  const { peers } = cohort || [];
  const fileName = `${moment().format()}-${cohort?.name} Matchings Data`;

  useEffect(() => {
    if (cohort && !peers) {
      dispatch(getPeers(cohort_id.toString(), 'null'));
    }
  }, [cohort, cohort_id, dispatch, peers]);

  const matched = peers?.filter(
    (peer) =>
      peer.type === 'learner' &&
      peer.opted_in_for_matching_suggestions &&
      peer.matchings &&
      peer.matchings.length > 0
  );
  const not_matched = peers?.filter(
    (peer) =>
      peer.type === 'learner' &&
      peer.opted_in_for_matching_suggestions &&
      (!peer.matchings || peer.matchings.length === 0)
  );

  const handleMatch = async (peer_a_id: string, peer_b_id: string) => {
    if (peer_a_id && peer_b_id) {
      await dispatch(matchUsers(peer_a_id, peer_b_id, cohort_id));
    }
  };

  return (
    <Page title="ScholarSite | Networking">
      {peers ? (
        <Container style={{ marginBottom: '50px' }}>
          <MatchProgress
            cohortID={cohort_id}
            fileName={fileName}
            current={matched.length}
            total={matched.length + not_matched.length}
          />
          <StyledBox>
            {not_matched.length > 0 ? (
              <>
                <MatchingUser user={not_matched[0]} />
                <AvailableMatches
                  key={not_matched[0]?.id}
                  user={not_matched[0]}
                  matchUsers={handleMatch}
                  users={matched.concat(not_matched.slice(1, not_matched.length))}
                />
              </>
            ) : (
              <></>
            )}
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
