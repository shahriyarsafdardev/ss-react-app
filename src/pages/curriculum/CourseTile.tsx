import { Avatar, Stack, Typography } from '@material-ui/core';

export default function CourseTile({ course }: { course: any }) {
  return (
    <Stack
      sx={{
        width: '32.5%',
        backgroundColor: '#fff',
        color: '#000',
        borderRadius: '8px',
        padding: '20px 20px 16px',
        marginBottom: '16px',
        minHeight: '250px',
        justifyContent: 'space-between'
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        {course.name}
      </Typography>
      <Stack>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5} alignItems="center">
          <Avatar sx={{ width: 56, height: 56 }} />
          <Stack>
            <Typography>Live with Ronny Kohavi</Typography>
            <Typography>Technical Fellow and Corporate VP</Typography>
          </Stack>
        </Stack>
        <img
          src="https://global-uploads.webflow.com/62b10e6dc5648dfcaf401a94/637549dd346f273befe8c42a_Frame%2048095550%20(1).svg"
          alt="instructor-companies"
          width="140"
          height="25"
          style={{ margin: '20px auto 0px auto' }}
        />
      </Stack>
    </Stack>
  );
}
