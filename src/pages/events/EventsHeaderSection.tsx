import { Typography, Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const StyledCard = styled(Stack)(({ theme }) => ({
  height: 'auto',
  width: '100%',
  backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/events_banner.png')`,
  backgroundRepeat: 'no-repeat',
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  backgroundPosition: 'center',
  position: 'relative',
  flexDirection: 'row',
  [theme.breakpoints.down(900)]: {
    flexDirection: 'column',
    height: 'auto',
    backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/welcome-bg-mbl.png')`,
    backgroundSize: '100%',
    backgroundPosition: 'top center'
  }
}));

const DesktopStack = styled(Stack)(({ theme }) => ({
  width: '60%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down(900)]: {
    display: 'none'
  }
}));

const MobileStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.up(900)]: {
    display: 'none'
  }
}));

const InstructorMessage = styled(Stack)(({ theme }) => ({
  padding: '60px 80px 60px 60px',
  width: '50%',
  justifyContent: 'center',
  [theme.breakpoints.down(900)]: {
    padding: '40px',
    width: '100%'
  }
}));

const StyledImage = styled('img')(({ theme }) => ({
  borderRadius: '50%',
  objectFit: 'cover',
  position: 'absolute'
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: '#101658',
  [theme.breakpoints.down(900)]: {
    color: '#ffffff'
  }
}));

const InstructorImage = styled('img')(({ theme }) => ({
  borderRadius: '50%',
  objectFit: 'cover',
  position: 'absolute',
  height: '160px',
  width: '160px',
  top: '3%',
  left: '35%',
  [theme.breakpoints.down(900)]: {
    left: 'unset',
    right: '10px',
    top: '50%',
    height: '180px',
    width: '180px'
  }
}));

export default function EventsHeaderSection() {
  return (
    <>
      <Stack direction="column" spacing={2} width="100%">
        <StyledCard>
          <InstructorMessage spacing={2}>
            <StyledTypography>Join us for</StyledTypography>
            <StyledTypography sx={{ fontSize: '48px' }}>
              learning, networking and discussions
            </StyledTypography>
            <StyledTypography>with leaders in Data & ML around the world.</StyledTypography>
          </InstructorMessage>
          <InstructorImage
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/learner-3.svg"
            alt="test image"
          />
          <DesktopStack>
            <Stack direction="row" spacing={2} justifyContent="center">
              <StyledImage
                src="https://sphere-public.s3.eu-west-2.amazonaws.com/learner-1.svg"
                alt="test image"
                style={{ top: '-6px', left: '25%', height: '120px', width: '120px' }}
              />
              <StyledImage
                src="https://sphere-public.s3.eu-west-2.amazonaws.com/learner-2.svg"
                alt="test image"
                style={{ top: '24px', right: '-16px', height: '115px', width: '115px' }}
              />
            </Stack>
            <Stack direction="row" justifyContent="center" width="100%">
              <img
                src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere-white.png"
                alt="sphere-logo"
                width="220px"
              />
            </Stack>
            <Stack direction="row" justifyContent="center" spacing={2}>
              <StyledImage
                src="https://sphere-public.s3.eu-west-2.amazonaws.com/learner-5.svg"
                alt="test image"
                style={{ bottom: '17px', left: '0', height: '106px', width: '106px' }}
              />
              <StyledImage
                src="https://sphere-public.s3.eu-west-2.amazonaws.com/learner-4.svg"
                alt="test image"
                style={{ bottom: '-30px', right: '15%', height: '138px', width: '138px' }}
              />
            </Stack>
          </DesktopStack>
          <MobileStack>
            <Stack direction="row" spacing={2} justifyContent="center" height="320px">
              <StyledImage
                src="https://sphere-public.s3.eu-west-2.amazonaws.com/learner-5.svg"
                alt="test image"
                style={{ top: '0', left: '-12px', height: '115px', width: '115px' }}
              />
              <StyledImage
                src="https://sphere-public.s3.eu-west-2.amazonaws.com/learner-4.svg"
                alt="test image"
                style={{ top: '40%', left: '15px', height: '115px', width: '115px' }}
              />
            </Stack>
          </MobileStack>
        </StyledCard>
      </Stack>
    </>
  );
}
