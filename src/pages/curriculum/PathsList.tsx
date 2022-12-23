import { useCallback } from 'react';
import { Grid, Stack, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { RootState, useSelector } from 'redux/store';
import { trackEvent } from 'utils/eventTracking';
import { useStyles, StyledButton } from './Common';
import { PATH_DASHBOARD } from '../../routes/paths';

export default function PathsList() {
  const classes = useStyles();
  const navigate = useNavigate();
  const paths = useSelector((state: RootState) => state?.path?.paths);
  const cohort = useSelector((state: RootState) => state?.cohort?.cohorts[0]);

  const navigateToPath = useCallback(
    (slug: string, name: string) => {
      trackEvent(cohort, 'All Courses Page - Path "Learn More" button clicked', {
        'Path Name': name
      });
      navigate(`${PATH_DASHBOARD.coursePaths.root(slug)}`);
    },
    [cohort]
  );

  return (
    <>
      {paths.length > 0 && (
        <Stack width="100%" className={classes.pathList}>
          <Grid
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ width: '100%', maxWidth: '1280px', display: 'flex', margin: 'auto' }}
          >
            {paths.map((path) => (
              <Grid item xs={12} sm={6} key={path.slug} className={classes.whiteBoxGrid}>
                <Stack spacing={2} className={classes.whiteBox}>
                  <Typography>The Complete</Typography>
                  <Typography className={classes.font24Headings}>{path.name.slice(12)}</Typography>
                  <Typography sx={{ marginBottom: 'auto !important' }}>
                    {path.short_description || ''}
                  </Typography>
                  <StyledButton
                    variant="outlined"
                    onClick={() => navigateToPath(path.slug, path.name)}
                  >
                    Learn More
                  </StyledButton>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}
    </>
  );
}
