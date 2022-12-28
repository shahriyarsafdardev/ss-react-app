import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
      <LazyLoadImage
        data-testid="empty-messaging-img"
        src="https://sphere-public.s3.eu-west-2.amazonaws.com/assets/emptyMessagingState.svg"
        alt="empty-session"
      />
      <StyledPara data-testid="empty-messaging-information-text">
        <b>
          Sphere Messaging allows you to seemlessly interact with your peers and instructor during
          and outside of Sessions.
        </b>{' '}
        You will receive complete access to Messaging shortly before{' '}
        {cohortHost && `${cohortHost}’s`} cohort begins. We’ll make sure to send you an email
        reminder once this date arrives!
      </StyledPara>
    </StyledBox>
  </Container>
);

export default EmptyMessagingTab;
