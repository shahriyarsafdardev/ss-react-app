import { Stack, Typography } from '@material-ui/core';
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

  const navigateToPath = (slug: string, name: string) => {
    trackEvent(cohort, 'All Courses Page - Path "Learn More" button clicked', {
      'Path Name': name
    });
    navigate(`${PATH_DASHBOARD.coursePaths.root(slug)}`);
  };

  return (
    <>
      {paths.length > 0 && (
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          spacing={4}
          className={classes.pathList}
        >
          {paths.map((path) => (
            <Stack key={path.slug} spacing={2} className={classes.whiteBox}>
              <Typography>The Complete</Typography>
              <Typography className={classes.font24Headings}>{path.name.slice(12)}</Typography>
              <Typography sx={{ marginBottom: 'auto !important' }}>
                {path.description.substring(0, 174)}
                {path.description.length > 174 && '...'}
              </Typography>
              <StyledButton variant="outlined" onClick={() => navigateToPath(path.slug, path.name)}>
                Learn More
              </StyledButton>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
}
