import { Stack, Typography, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import SessionDetails from './SessionDetails';

const StyledButton = styled(Button)(({ theme }) => ({
  width: '50%',
  borderRadius: '30px',
  padding: '10px',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export default function CourseDetails({ courseData }: { courseData: any }) {
  return (
    <>
      <Stack spacing={2} sx={{ px: '50px', paddingTop: '50px', color: '#1E293B' }}>
        {courseData.is_next_reccommended && !courseData.is_complete && (
          <Typography sx={{ fontWeight: '700' }}>
            The next recommended course in this track is:
          </Typography>
        )}
        <Typography variant="h3" sx={{ fontSize: '38px' }}>
          {courseData.name}
        </Typography>
        <Typography>{courseData.description}</Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <StyledButton variant="outlined">See More Details</StyledButton>
          <StyledButton variant="contained">Enroll</StyledButton>
        </Stack>
      </Stack>
      {courseData.sessions.map((session: any) => (
        <SessionDetails key={session.number} sessionData={session} />
      ))}
    </>
  );
}
