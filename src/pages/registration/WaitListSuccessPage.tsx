import { Stack, Typography, useTheme, useMediaQuery } from '@material-ui/core';
import { memo } from 'react';
import { Logo, useStyles } from './Common';

function WaitListSuccessPage() {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <Logo src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere-white.png" alt="logo" />
      <Stack
        className={`${classes.wrapperStack} ${classes.purpleBackground}`}
        spacing={4}
        justifyContent="center"
        alignItems="center"
        padding={{ xs: '10px', md: '50px', lg: '112px' }}
        paddingBottom="80px !important"
      >
        <Typography
          className={`${classes.heading} ${classes.whiteFont}`}
          sx={{ ...(!isDesktop && { marginTop: '80px !important' }) }}
        >
          Welcome to the Sphere community
        </Typography>
        <Typography
          textAlign="center"
          className={classes.whiteFont}
          width={{ xs: '100%', md: '80%', lg: '65%' }}
        >
          Our team will be in touch shortly to understand exactly what you are interested in getting
          out of this cohort and the Sphere community as a whole!
        </Typography>
      </Stack>
    </>
  );
}

export default memo(WaitListSuccessPage);
