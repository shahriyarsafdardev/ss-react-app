import { Box, Stack, useMediaQuery, useTheme } from '@material-ui/core';
import {
  useStyles,
  PageSection,
  PathTitle,
  PathDescription,
  PathButton,
  AchievementHeader,
  AchievementDescription,
  PageInnerSection
} from './Common';

export default function TeamPackages() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const classes = useStyles();

  return (
    <PageSection
      sx={{
        backgroundImage: 'linear-gradient(139deg, #f6f7f8, #f6f7f8 34%, rgba(105, 109, 200, 0.25))'
      }}
    >
      <PageInnerSection spacing={8} alignItems="center">
        <PathTitle sx={{ color: '#082139' }}>Team Packages</PathTitle>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={10}
          justifyContent="space-around"
          alignItems="center"
          width="100%"
        >
          <Box>
            <AchievementHeader>95%</AchievementHeader>
            <AchievementDescription>
              of staff feel more <br />
              <span className={classes.blueText}>confident and effective</span>
            </AchievementDescription>
          </Box>
          <Box>
            <AchievementHeader>{'>'}20x</AchievementHeader>
            <AchievementDescription>
              more <span className={classes.blueText}>engagement</span> than
              <br /> traditional learning libraries
            </AchievementDescription>
          </Box>
          <Box>
            <AchievementHeader>+25%</AchievementHeader>
            <AchievementDescription>
              average uplift on
              <br /> <span className={classes.blueText}>key metrics</span> for teams that attend
            </AchievementDescription>
          </Box>
        </Stack>
        <PathDescription sx={{ color: '#000' }}>
          Join our growing list of enterprise clients
        </PathDescription>
        {isMobile ? (
          <img
            style={{ width: '400px' }}
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/companies-logos-mobile.png"
            alt="company-logos"
          />
        ) : (
          <img
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/companies-logos.png"
            alt="company-logos"
          />
        )}
        <PathButton
          variant="contained"
          onClick={() => window.open('https://www.getsphere.com/pages/subscription', '_blank')}
        >
          Get Sphere for your team
        </PathButton>
      </PageInnerSection>
    </PageSection>
  );
}
