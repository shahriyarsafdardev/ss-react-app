import { Stack, Typography } from '@material-ui/core';
import { useStyles } from './Common';

export default function CoursesHeader() {
  const classes = useStyles();

  return (
    <Stack
      spacing={2}
      justifyContent="space-between"
      direction="row"
      sx={{ height: '73px', padding: '0px 40px' }}
    >
      <img src="/static/sphere_with_logo.svg" alt="logo" width="150" />
      <Stack spacing={3} direction="row" alignItems="center">
        <Typography>Events</Typography>
        <Typography>Courses</Typography>
        <Typography>Contact us</Typography>
      </Stack>
    </Stack>
  );
}
