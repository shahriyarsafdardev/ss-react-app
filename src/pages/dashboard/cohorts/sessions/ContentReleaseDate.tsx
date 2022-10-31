import { Stack, styled, Typography } from '@material-ui/core';
import { RootState, useSelector } from 'redux/store';

const StyledTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '24px'
}));

const StyledImage = styled('img')(({ theme }) => ({
  marginBottom: '10px',
  width: '100px',
  height: 'auto'
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  width: '25%',
  margin: 'auto',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    margin: '30px auto',
    width: '90%'
  }
}));

export default function ContentReleaseDate() {
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const getRemainingDays = () => {
    const days = Math.ceil(
      (new Date(cohort?.start_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
    );
    return days < 0 ? 0 : days;
  };

  return (
    <StyledStack>
      <StyledImage
        src="https://sphere-public.s3.eu-west-2.amazonaws.com/content.png"
        alt="content"
      />
      <StyledTypography fontWeight="bold">Course Content</StyledTypography>
      <StyledTypography>will be released here in</StyledTypography>
      <StyledTypography fontSize="64px !important" fontWeight="bold" marginTop="30px">
        {getRemainingDays()}
      </StyledTypography>
      <StyledTypography>Days</StyledTypography>
    </StyledStack>
  );
}
