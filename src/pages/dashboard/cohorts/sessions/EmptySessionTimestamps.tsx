import { Stack, Typography, Link } from '@material-ui/core';
import { styled } from '@material-ui/styles';

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: '#64748B',
  fontSize: '14px'
}));

export default function EmptySessionTimestamps() {
  return (
    <Stack spacing={2} sx={{}}>
      <StyledTypography>
        Use{' '}
        <Link href="#" target="_blank" sx={{ textDecoration: 'underline' }}>
          Sphere's Zoom App
        </Link>{' '}
        to save timestamps during sessions.
      </StyledTypography>
      <StyledTypography>
        Timestamps allow you to easily save points in your sessions so that you can review them
        later!
      </StyledTypography>
    </Stack>
  );
}
