import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const Container = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '10%'
}));

const StyledBox = styled(Box)(({ theme }) => ({
  maxWidth: '600px',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    padding: '0 25px',
    display: 'flex',
    flexDirection: 'column'
  },
  div: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center'
    },
    img: {
      width: '150px',
      [theme.breakpoints.down('sm')]: {
        width: '50%'
      }
    }
  }
}));

const StyledPara = styled('p')(() => ({
  fontFamily: 'Public Sans',
  fontSize: '14px',
  lineHeight: '28px',
  textAlign: 'center'
}));

const EmptyNetworkingTab = ({ cohortHost }: { cohortHost: string }) => (
  <Container>
    <StyledBox>
      <Box>
        <img src="/static/cohort-empty-states/sample-user-1.svg" alt="empty-state-user" />
        <img src="/static/cohort-empty-states/sample-user-2.svg" alt="empty-state-user" />
        <img src="/static/cohort-empty-states/sample-user-3.svg" alt="empty-state-user" />
        <img src="/static/cohort-empty-states/sample-user-4.svg" alt="empty-state-user" />
      </Box>
      <StyledPara>
        <b>
          ScholarSite Networking includes a complete overview of your fellow cohort members
          including their experience, interests and skills.
        </b>{' '}
        You will recieve complete access to Networking one week before{' '}
        {cohortHost && `${cohortHost}’s`} cohort begins. We’ll make sure to send you an email
        reminder once this date arrives!
      </StyledPara>
    </StyledBox>
  </Container>
);

export default EmptyNetworkingTab;
