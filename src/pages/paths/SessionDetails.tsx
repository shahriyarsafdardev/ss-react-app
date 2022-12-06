import { Typography, Stack } from '@material-ui/core';
import { SessionSummary } from './Common';

export default function SessionDetails({ sessionData }: { sessionData: any }) {
  return (
    <Stack spacing={2} sx={{ color: '#1E293B' }}>
      <Typography sx={{ fontSize: '18px', marginTop: '60px', fontWeight: 900 }}>
        Session {sessionData.number}: {sessionData.name}
      </Typography>
      <SessionSummary innerContent={sessionData.summary} />
    </Stack>
  );
}
