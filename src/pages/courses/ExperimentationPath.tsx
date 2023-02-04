import { useMediaQuery, useTheme } from '@material-ui/core';
import { PageSection, PathTitle, PathDescription, PathButton, PageInnerSection } from './Common';

export default function ExperimentationPath() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <PageSection
      sx={{
        backgroundImage: 'linear-gradient(139deg, #f6f7f8, #f6f7f8 34%, rgba(105, 109, 200, 0.25))'
      }}
    >
      <PageInnerSection spacing={8} alignItems="center">
        <PathTitle sx={{ color: '#082139' }}>The Complete Experimentation Path</PathTitle>
        <PathDescription sx={{ color: '#000' }}>
          This set of courses was created by leading executives and experts. It is designed to help
          industry practitioners elevate their data experimentation skills from good to great.
        </PathDescription>
        {isMobile ? (
          <img
            style={{ width: '400px' }}
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/courses-slider-mobile.png"
            alt="experimentation-flowchart"
          />
        ) : (
          <img
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/courses-slider.png"
            alt="experimentation-flowchart"
          />
        )}
        <PathButton
          variant="contained"
          onClick={() => window.open('https://www.getsphere.com/pages/getting-started', '_blank')}
        >
          Get Started
        </PathButton>
      </PageInnerSection>
    </PageSection>
  );
}
