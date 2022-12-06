import { Stack, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { RootState, useSelector } from 'redux/store';
import { useStyles, StyledButton } from './Common';
import { PATH_DASHBOARD } from '../../routes/paths';

export default function PathsList() {
  const classes = useStyles();
  const navigate = useNavigate();
  const paths = useSelector((state: RootState) => state?.path?.paths);

  const navigateToPath = (slug: string) => {
    navigate(`${PATH_DASHBOARD.coursePaths.root(slug)}`);
  };

  return (
    <>
      {paths.length > 0 && (
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          spacing={4}
          sx={{ backgroundColor: '#F1F1FB', p: '50px', textAlign: 'center', color: '#000' }}
        >
          {paths.map((path) => (
            <Stack key={path.slug} spacing={2} className={classes.whiteBox}>
              <Typography>The Complete</Typography>
              <Typography className={classes.font24Headings}>{path.name.slice(12)}</Typography>
              <Typography>Scale and Optimize a reliable data engineering stack</Typography>
              <StyledButton variant="outlined" onClick={() => navigateToPath(path.slug)}>
                Learn More
              </StyledButton>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
}
