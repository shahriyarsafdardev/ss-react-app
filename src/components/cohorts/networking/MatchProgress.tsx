import { styled } from '@material-ui/core/styles';
import { Typography, Stack } from '@material-ui/core';
import LinearProgress, { linearProgressClasses } from '@material-ui/core/LinearProgress';
import { SectionContainer, ExportToExcel } from './Common';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: '100%',
  height: 8,
  borderRadius: 5,
  marginRight: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 400 : 800]
  }
}));

const MatchProgress = ({
  current,
  total,
  cohortID,
  fileName
}: {
  current: number;
  total: number;
  cohortID: string;
  fileName: string;
}) => (
  <SectionContainer className="white">
    <Stack width="100%" flexDirection="column" spacing={2}>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
        <Stack flexDirection="row" alignItems="center">
          <Typography variant="h5" color="primary">
            {current === total ? 'All' : `${current}/${total}`}
          </Typography>
          <Typography sx={{ ml: '7px' }} variant="h5">
            Participants have been matched
          </Typography>
        </Stack>
        {current !== 0 && <ExportToExcel cohortID={cohortID} fileName={fileName} />}
      </Stack>
      <BorderLinearProgress color="primary" variant="determinate" value={(current / total) * 100} />
    </Stack>
  </SectionContainer>
);

export default MatchProgress;
