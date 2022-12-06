import { Box, Container, Stack, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useStyles, StyledButton } from './Common';
import { PATH_DASHBOARD } from '../../routes/paths';

export default function PathHeader() {
  const classes = useStyles();
  const navigate = useNavigate();

  const navigateToPath = (slug: string) => {
    navigate(`${PATH_DASHBOARD.coursePaths.root(slug)}`);
  };

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      spacing={4}
      sx={{ backgroundColor: '#F1F1FB', p: '50px', textAlign: 'center', color: '#000' }}
    >
      <Stack spacing={2} className={classes.whiteBox}>
        <Typography>The Complete</Typography>
        <Typography className={classes.font24Headings}>Experimentation Professional</Typography>
        <Typography>Scale and Optimize a reliable data engineering stack</Typography>
        <StyledButton
          variant="outlined"
          onClick={() => navigateToPath('the-complete-experimentation-professional')}
        >
          Learn More
        </StyledButton>
      </Stack>
      <Stack spacing={2} className={classes.whiteBox}>
        <Typography>The Complete</Typography>
        <Typography className={classes.font24Headings}>Search & Discovery Professional</Typography>
        <Typography>Scale and Optimize a reliable data engineering stack</Typography>
        <StyledButton
          variant="outlined"
          onClick={() => navigateToPath('the-complete-search-discovery-professional')}
        >
          Learn More
        </StyledButton>
      </Stack>
    </Stack>
  );
}
