import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';

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

const EmptyResourcePage = () => (
  <Container>
    <StyledBox>
      <LazyLoadImage
        data-testid="empty-messaging-img"
        src="https://sphere-public.s3.eu-west-2.amazonaws.com/assets/emptyMessagingState.svg"
        alt="empty-session"
      />
      <StyledPara data-testid="empty-session-information-text">
        <b>Resources will available shortly before the cohort starts!</b>
      </StyledPara>
    </StyledBox>
  </Container>
);

export default EmptyResourcePage;
