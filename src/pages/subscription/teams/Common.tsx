import { Button, Stack, styled, Box, Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

import Page from 'components/Page';

export const StyledBackButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: 110,
  left: 40,
  [theme.breakpoints.down('md')]: {
    top: 150,
    left: 10
  }
}));

export const StyledMembersList = styled(Stack)(({ theme }) => ({
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  padding: '39px 28px',
  marginBottom: '50px',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: '10px 5px'
  }
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  borderRadius: '16px',
  border: '1px solid #12125C',
  padding: '39px 28px',
  marginBottom: '50px',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export const StyledDetailsStack = styled(Stack)(({ theme }) => ({
  color: 'white',
  alignItems: 'center',
  maxWidth: '550px',
  padding: '20px'
}));

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  borderRadius: '30px',
  height: '35px',
  width: '100% !important',
  marginTop: '32px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginTop: '0px'
  }
}));
export const StyledNextButton = styled(Button)(({ theme }) => ({
  width: '270px',
  height: '40px',
  borderRadius: '30px',
  margin: 'auto',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '15px'
}));

export const HeadingTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '26px',
  [theme.breakpoints.down('md')]: {
    fontSize: '40px'
  }
}));

export const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  position: 'relative'
}));

export const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));

export const PaymentRootStyle = styled(Page)(({ theme }) => ({
  height: '100vh',
  width: '100%',
  marginLeft: '0',
  marginRight: '0'
}));

export const StyledHeading = styled(Typography)(({ theme }) => ({
  color: '#475569',
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1)
}));

export const useStyles = makeStyles((theme: Theme) => ({
  promptContainer: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    color: '#ffffff'
  },
  paymentContainer: {
    width: '100%',
    maxWidth: '100%',
    display: 'block',
    padding: '0px'
  },
  noPadding: {
    height: '100%',
    paddingTop: '93px',
    paddingBottom: '0px',
    [theme.breakpoints.down('md')]: {
      paddingTop: '140px'
    }
  },
  font20: {
    fontSize: '20px !important',
    lineHeight: '25.2px'
  },
  font26: {
    fontSize: '26px !important',
    lineHeight: '26px'
  },
  font18: {
    fontSize: '18px !important',
    lineHeight: '24px'
  },
  colorGrey: {
    color: '#475569'
  },
  fontBolder: {
    fontWeight: 'bolder'
  },
  fontBold: {
    fontWeight: 'bold'
  },
  purpleBackground: {
    backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/Purple_BG.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white'
  },
  paymentData: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: '50px',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
      height: 'fit-content'
    }
  },
  topUpContainer: {
    height: '100%',
    width: '50%',
    backgroundColor: '#FAFAFC',
    marginTop: '92px',
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  topUp: {
    backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/Purple_BG.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  topUpButton: {
    width: '80%',
    backgroundColor: '#864FBC',
    marginTop: '56px !important'
  },
  fullWidthCenter: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    maxWidth: '600px',
    [theme.breakpoints.down('md')]: {
      width: '95%'
    }
  },
  mobileDisplay: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block'
    }
  },
  webDisplay: {
    display: 'block',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  }
}));

export const Logo = styled('img')(({ theme }) => ({
  width: '9%',
  position: 'absolute',
  top: '4%',
  left: '2%',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

export function SubscriptionDetails({
  isSinglePayee,
  teamDiscount
}: {
  isSinglePayee: boolean;
  teamDiscount: number;
}) {
  return (
    <Box sx={{ mt: 4, maxWidth: '650px' }}>
      <Stack spacing={3}>
        <>
          {isSinglePayee ? (
            <>
              <Typography textAlign={{ xs: 'left', md: 'center' }}>
                <strong>Your Sphere subscription provides:</strong>
              </Typography>
              <Stack spacing={2}>
                <li>
                  A {Math.floor(teamDiscount * 100)}% discount on all of Sphere's live courses
                </li>
                <li>Ongoing access to the Sphere portal</li>
                <li>Access to Sphere alumni events</li>
              </Stack>
              <Typography textAlign={{ xs: 'left', md: 'center' }}>
                <i>You can adjust or cancel your subscription at any time.</i>
              </Typography>
            </>
          ) : (
            <>
              <StyledTypography style={{ fontWeight: 'bold' }}>
                Your team at Stripe has approved Sphere as a Learning & Development expense meaning
                they will reimburse the full cost! You can top up or cancel your subscription at any
                time.
              </StyledTypography>
              <StyledTypography>
                Your balance can be used to attend our live interactive courses that are led by
                industry experts and joined by likeminded professionals.
              </StyledTypography>
            </>
          )}
        </>
      </Stack>
    </Box>
  );
}
