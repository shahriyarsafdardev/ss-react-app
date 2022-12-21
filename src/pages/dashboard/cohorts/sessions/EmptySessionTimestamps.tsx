import { Stack, Typography, Link, Button } from '@material-ui/core';
import { memo } from 'react';
import { useStyles } from './Common';

const EmptySessionTimestamps = ({ sendAnalyticsEvent }: { sendAnalyticsEvent: Function }) => {
  const classes = useStyles();

  const handleLearnMore = () => {
    sendAnalyticsEvent('Sessions Page - Timestamps - "Learn More" button clicked');
    window.open(
      'https://drive.google.com/file/d/1pNXGlh2UOy_0y-t6N6upyRz_fQoHPwjO/view?usp=sharing',
      '_blank'
    );
  };

  return (
    <Stack spacing={4} direction={{ xs: 'column', md: 'row' }} className={classes.parentStack}>
      <img
        src="https://sphere-public.s3.eu-west-2.amazonaws.com/timestamps-detail.png"
        alt="zoom details"
        className={classes.detailsImage}
      />
      <Stack spacing={3}>
        <Typography className={classes.styledText}>
          Use{' '}
          <Link
            href="https://marketplace.zoom.us/apps/Mc37aXV3RoibIJkOBBPmzA"
            target="_blank"
            className={classes.greyLink}
          >
            Sphere's Zoom App
          </Link>{' '}
          to save timestamps during sessions.
        </Typography>
        <Button
          variant="outlined"
          className={classes.styledButton}
          onClick={() => handleLearnMore()}
        >
          Learn More
        </Button>
      </Stack>
    </Stack>
  );
};

export default memo(EmptySessionTimestamps);
