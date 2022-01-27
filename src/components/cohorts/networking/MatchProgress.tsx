import { styled } from '@material-ui/core/styles';
import { Typography, Stack } from '@material-ui/core';
import LinearProgress, { linearProgressClasses } from '@material-ui/core/LinearProgress';
import { SectionContainer } from './Common';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: '100%',
  height: 8,
  borderRadius: 5,
  marginRight: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 400 : 800]
  }
}));

const MatchProgress = ({ current, total }: { current: number; total: number }) => (
  <SectionContainer className="white">
    <Stack width="100%" flexDirection="column" spacing={2}>
      <Stack flexDirection="row" alignItems="center">
        <Typography variant="h5" color="primary">
          {current}/{total}
        </Typography>
        <Typography sx={{ ml: '7px' }} variant="h5">
          Participants have been matched
        </Typography>
      </Stack>
      <BorderLinearProgress color="primary" variant="determinate" value={(current / total) * 100} />
    </Stack>
  </SectionContainer>
);

export default MatchProgress;
