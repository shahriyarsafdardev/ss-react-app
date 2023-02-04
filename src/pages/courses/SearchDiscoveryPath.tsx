import { useMediaQuery, useTheme } from '@material-ui/core';
import { PageSection, PathTitle, PathDescription, PathButton, PageInnerSection } from './Common';

export default function SearchDiscoveryPath() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <PageSection
      sx={{
        backgroundImage: `url(
          'https://sphere-public.s3.eu-west-2.amazonaws.com/courses-background.png'
        )`
      }}
    >
      <PageInnerSection spacing={8} alignItems="center">
        <PathTitle sx={{ color: '#bcbcec' }}>The Complete Search & Discovery Path</PathTitle>
        <PathDescription sx={{ color: '#fff' }}>
          This set of courses was created by leading executives and experts. It is designed to help
          industry practitioners implement state of the art search and discovery systems that
          improve engagement and conversion.
        </PathDescription>
        {isMobile ? (
          <img
            style={{ width: '400px' }}
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/courses-slider-mobile-1.png"
            alt="experimentation-flowchart"
          />
        ) : (
          <img
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/course-slider-2.png"
            alt="experimentation-flowchart"
          />
        )}
        <PathButton
          variant="contained"
          onClick={() => window.open('https://www.getsphere.com/pages/getting-started', '_blank')}
        >
          Get Started
        </PathButton>
        <PathDescription sx={{ color: '#fff' }}>More paths coming soon </PathDescription>
      </PageInnerSection>
    </PageSection>
  );
}
