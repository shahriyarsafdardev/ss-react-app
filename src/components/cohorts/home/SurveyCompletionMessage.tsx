import { Typography, Stack, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useNavigate } from 'react-router';

const StyledCard = styled(Stack)(({ theme }) => ({
  height: '72vh',
  width: '100%',
  backgroundColor: '#fff',
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  position: 'relative',
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    height: 'auto'
  }
}));

const DesktopStack = styled(Stack)(({ theme }) => ({
  backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/survey-completion-bg.png')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  borderRadius: '16px',
  width: '50%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const CompletionMessage = styled(Stack)(({ theme }) => ({
  padding: '50px 104px',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50%',
  [theme.breakpoints.down(1150)]: {
    padding: '50px 70px'
  },
  [theme.breakpoints.down('md')]: {
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
  color: '#000',
  lineHeight: '150%'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  borderRadius: '30px',
  textTransform: 'none'
}));

export default function SurveyCompletionMessage() {
  const navigate = useNavigate();

  const handleSendReferral = () => {
    navigate('/user/referrals#referral-invite-form');
  };
  return (
    <>
      <Stack direction="column" spacing={2} width="100%">
        <StyledCard>
          <CompletionMessage spacing={4}>
            <StyledTypography fontWeight="bold">
              Thank you for completing the end-of-cohort survey!
            </StyledTypography>
            <StyledTypography>
              🎁 If you know someone who may benefit from this course, share a referral to earn $100
              for both of you to use towards future Sphere courses.
            </StyledTypography>
            <StyledButton variant="contained" onClick={handleSendReferral}>
              Send a Referral
            </StyledButton>
          </CompletionMessage>
          <DesktopStack>
            <StyledImage
              src="https://sphere-public.s3.eu-west-2.amazonaws.com/learner-3.svg"
              alt="test image"
              style={{ top: '12%', height: '185px', width: '185px' }}
            />
            <Stack direction="row" spacing={2} justifyContent="center">
              <StyledImage
                src="https://sphere-public.s3.eu-west-2.amazonaws.com/learner-1.svg"
                alt="test image"
                style={{ top: '-6px', right: '30%', height: '130px', width: '130px' }}
              />
              <StyledImage
                src="https://sphere-public.s3.eu-west-2.amazonaws.com/learner-2.svg"
                alt="test image"
                style={{ top: '90px', right: '-16px', height: '128px', width: '128px' }}
              />
            </Stack>
            <Stack direction="row" justifyContent="center" spacing={2}>
              <StyledImage
                src="https://sphere-public.s3.eu-west-2.amazonaws.com/learner-6.png"
                alt="test image"
                style={{ bottom: '73px', right: '50%', height: '162px', width: '162px' }}
              />
              <StyledImage
                src="https://sphere-public.s3.eu-west-2.amazonaws.com/learner-5.svg"
                alt="test image"
                style={{ bottom: '-18px', right: '25%', height: '117px', width: '117px' }}
              />
              <StyledImage
                src="https://sphere-public.s3.eu-west-2.amazonaws.com/learner-4.svg"
                alt="test image"
                style={{ bottom: '134px', right: '-16px', height: '118px', width: '118px' }}
              />
            </Stack>
          </DesktopStack>
        </StyledCard>
      </Stack>
    </>
  );
}
