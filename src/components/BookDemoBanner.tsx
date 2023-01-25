import { Button, Stack, styled, Typography } from '@material-ui/core';

const StyledStack = styled(Stack)(({ theme }) => ({
  height: '300px',
  width: '100%',
  margin: 'auto',
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  position: 'relative',
  flexDirection: 'row',
  marginBottom: '32px',
  backgroundColor: '#fff',
  [theme.breakpoints.down('md')]: {
    height: '350px'
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    height: 'auto'
  }
}));

const ContactUsMessage = styled(Stack)(({ theme }) => ({
  backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/welcome_background.png')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'right',
  padding: '60px 100px',
  alignItems: 'center',
  width: '50%',
  borderRadius: '16px',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    padding: '40px'
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/welcome-bg-mbl.png')`,
    backgroundPosition: 'top center',
    flexDirection: 'column',
    height: 'auto'
  }
}));

const StyledButtonStack = styled(Stack)(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  width: '50%',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  height: '46px',
  width: '350px',
  [theme.breakpoints.down('md')]: {
    width: '80%',
    margin: '16px 0px !important'
  }
}));

const BoldText = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 700,
  color: '#ffffff'
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#ffffff'
}));

const BookDemoBanner = () => {
  const handleDemoButton = () => {
    window.open('https://calendly.com/d/zhg-vsj-qmc/meeting-with-sphere', '_blank');
  };

  return (
    <StyledStack>
      <ContactUsMessage spacing={2}>
        <Stack spacing={2}>
          <BoldText>Interested in getting Sphere for your team?</BoldText>
          <StyledTypography>
            Book a time to chat to the Sphere team about our team subscription packages
          </StyledTypography>
        </Stack>
      </ContactUsMessage>
      <StyledButtonStack>
        <StyledButton variant="contained" onClick={handleDemoButton}>
          Book a free demo
        </StyledButton>
      </StyledButtonStack>
    </StyledStack>
  );
};

export default BookDemoBanner;
