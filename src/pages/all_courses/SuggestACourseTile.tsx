import { useContext } from 'react';
import { Button, Grid, Stack, Typography } from '@material-ui/core';
import { PATH_DASHBOARD } from 'routes/paths';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { useStyles } from './Common';

export default function SuggestACourseTile() {
  const { sendAnalyticsData } = useContext(AnalyticsContext);
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={12} md={6} lg={4} sx={{ px: '12px !important' }}>
      <Stack className={classes.suggestCourseTile}>
        <Stack spacing={3} direction="column" alignItems="center">
          <Typography className={classes.suggestHeader}>
            Can’t find what you’re looking for?
          </Typography>
          <Button
            variant="contained"
            fullWidth
            className={classes.suggestButton}
            href={PATH_DASHBOARD.community.suggestCourse}
            onClick={() =>
              sendAnalyticsData(null, 'All Courses Page - Suggest a Course Tile - Selected')
            }
          >
            Suggest a Course
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
}
