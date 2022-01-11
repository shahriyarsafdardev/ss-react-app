import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const Container = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '60px'
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
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
      maxWidth: '80%'
    }
  }
}));

const StyledPara = styled('p')(() => ({
  fontFamily: 'Public Sans',
  fontSize: '14px',
  lineHeight: '28px',
  textAlign: 'center'
}));

const EmptySessionsTab = ({ cohortHost }: { cohortHost: string }) => (
  <Container>
    <StyledBox>
      <img
        data-testid="empty-session-img"
        src="/static/cohort-empty-states/emptySessionState.svg"
        alt="empty-session"
      />
      <StyledPara data-testid="empty-session-information-text">
        <b>
          ScholarSite Sessions allows you to seemlesly access recordings, slides and materials
          during and outside of session times.
        </b>{' '}
        You will recieve complete access to the Sessions page one week before{' '}
        {cohortHost && `${cohortHost}’s`} cohort begins. We’ll make sure to send you an email
        reminder once this date arrives!
      </StyledPara>
    </StyledBox>
  </Container>
);

export default EmptySessionsTab;
