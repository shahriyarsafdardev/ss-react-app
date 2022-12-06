import LinearProgress, { linearProgressClasses } from '@material-ui/core/LinearProgress';
import { Typography, Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: '100%',
  height: 4,
  borderRadius: 5,
  marginRight: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 400 : 800]
  }
}));

export default function PathHeader({
  pathName,
  pathDescription,
  total,
  complete
}: {
  pathName: string;
  pathDescription: string;
  total: any;
  complete: any;
}) {
  const progress = () => Math.floor((complete / total) * 100);

  return (
    <Stack spacing={2} sx={{ p: '0 50px 50px' }}>
      <Typography sx={{ fontSize: '28px', fontWeight: '600', color: '#000' }}>
        {pathName}
      </Typography>
      <Typography sx={{ color: '#363853' }}>{pathDescription}</Typography>
      <Stack spacing={1}>
        <Typography sx={{ color: '#000' }}>
          {complete}/{total} courses completed
        </Typography>
        <BorderLinearProgress
          variant="determinate"
          value={progress()}
          sx={{
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#007B55'
            }
          }}
        />
      </Stack>
    </Stack>
  );
}
