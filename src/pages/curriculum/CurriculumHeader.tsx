import { Stack, Typography } from '@material-ui/core';
import { useStyles } from './Common';

export default function CurriculumHeader() {
  const classes = useStyles();

  return (
    <Stack spacing={2} className={classes.headerContainer}>
      <Typography variant="h1" className={classes.coursesHeading}>
        Data & ML Courses
      </Typography>
      <Typography className={classes.headerText}>
        Our courses are led by world class experts and designed to help you impact business KPIs
      </Typography>
    </Stack>
  );
}
