import { styled } from '@material-ui/core/styles';
import { Typography, Stack } from '@material-ui/core';
import { memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CohortType } from './Registration';

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  height: '92px',
  position: 'absolute',
  padding: '24px 40px',
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #CBD5E1',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    height: '140px',
    alignItems: 'flex-start',
    padding: '16px'
  }
}));

const StyledLogo = styled(LazyLoadImage)(({ theme }) => ({
  width: '130px',
  position: 'absolute',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    position: 'unset',
    margin: 'auto',
    marginBottom: '20px'
  }
}));

const StyledSvg = styled('svg')(({ theme }) => ({
  width: '2px',
  height: '16px',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    flexDirection: 'column-reverse'
  }
}));

const StyledCohortName = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '20px',
  [theme.breakpoints.down('md')]: {
    fontSize: '16px',
    marginTop: '0px !important',
    marginBottom: '15px !important'
  }
}));

const StyledInstructorName = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  [theme.breakpoints.down('md')]: {
    fontSize: '14px'
  }
}));

const StyledSpan = styled(StyledInstructorName)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'inline'
  }
}));

function RegistrationNavbar({ cohort }: { cohort?: CohortType }) {
  return (
    <HeaderStyle>
      <StyledLogo
        src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere_blue.svg"
        alt="logo"
      />
      {cohort && cohort.name && (
        <Stack spacing={2} direction="row" sx={{ justifyContent: 'center' }} width="100%">
          <StyledStack spacing={2} direction={{ xs: 'column', md: 'row' }}>
            <StyledInstructorName sx={{ color: 'text.primary' }}>
              <StyledSpan>Live with </StyledSpan>
              {cohort?.instructor}
            </StyledInstructorName>
            <StyledSvg viewBox="0 0 2 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" width="1" height="16" rx="0.5" fill="#CBD5E1" />
            </StyledSvg>
            <StyledCohortName sx={{ color: 'text.secondary' }}>{cohort?.name}</StyledCohortName>
          </StyledStack>
        </Stack>
      )}
    </HeaderStyle>
  );
}

export default memo(RegistrationNavbar);
