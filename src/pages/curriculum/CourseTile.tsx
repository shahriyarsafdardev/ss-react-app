import { Avatar, Stack, Typography, Box } from '@material-ui/core';
import { useStyles } from './Common';

export default function CourseTile({ course }: { course: any }) {
  const classes = useStyles();

  return (
    <Stack className={classes.courseTile}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        {course.name}
      </Typography>
      <Stack>
        <Stack direction="row" spacing={2.5} alignItems="center" marginBottom="20px">
          <Avatar sx={{ width: 56, height: 56 }} />
          <Stack>
            <Typography>Live with Ronny Kohavi</Typography>
            <Typography>Technical Fellow and Corporate VP</Typography>
          </Stack>
        </Stack>
        <Box sx={{ borderTop: '1px solid #64748B' }}>
          <img
            src="https://global-uploads.webflow.com/62b10e6dc5648dfcaf401a94/637549dd346f273befe8c42a_Frame%2048095550%20(1).svg"
            alt="instructor-companies"
            width="140"
            height="25"
            style={{ margin: '20px auto 0px auto' }}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
