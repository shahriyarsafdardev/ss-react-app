import { RootState, useSelector } from 'redux/store';
import { StyledTypographyContent, StyledImageContent, StyledStackContent } from './Common';

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
    <StyledStackContent>
      <StyledImageContent
        src="https://sphere-public.s3.eu-west-2.amazonaws.com/content.png"
        alt="content"
      />
      <StyledTypographyContent fontWeight="bold">Course Content</StyledTypographyContent>
      <StyledTypographyContent>will be released here in</StyledTypographyContent>
      <StyledTypographyContent fontSize="64px !important" fontWeight="bold" marginTop="30px">
        {getRemainingDays()}
      </StyledTypographyContent>
      <StyledTypographyContent>Days</StyledTypographyContent>
    </StyledStackContent>
  );
}
