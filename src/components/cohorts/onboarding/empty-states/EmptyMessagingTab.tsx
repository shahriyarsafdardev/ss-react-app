import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const Container = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center'
}));

const StyledBox = styled(Box)(({ theme }) => ({
  maxWidth: '600px',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    padding: '0 25px',
    display: 'flex',
    flexDirection: 'column'
  },
  img: {
    margin: 'auto'
  }
}));

const StyledPara = styled('p')(() => ({
  fontFamily: 'Public Sans',
  fontSize: '14px',
  lineHeight: '28px',
  textAlign: 'center'
}));

const EmptyMessagingTab = ({ cohortHost }: { cohortHost: string }) => (
  <Container>
    <StyledBox>
      <img
        data-testid="empty-messaging-img"
        src="/static/cohort-empty-states/emptyMessagingState.svg"
        alt="empty-session"
      />
      <StyledPara data-testid="empty-messaging-information-text">
        <b>
          ScholarSite Messaging allows you to seemlessly interact with your peers and instructor
          during and outside of Sessions.
        </b>{' '}
        You will recieve complete access to Messaging one week before{' '}
        {cohortHost && `${cohortHost}’s`} cohort begins. We’ll make sure to send you an email
        reminder once this date arrives!
      </StyledPara>
    </StyledBox>
  </Container>
);

export default EmptyMessagingTab;
