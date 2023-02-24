import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography, Stack } from '@material-ui/core';

export default function EventNavbar({ eventName }: { eventName: string }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center">
      <Stack
        sx={{ backgroundColor: '#F1F1FB', height: '92px', minWidth: '230px' }}
        justifyContent="center"
      >
        <Link
          component={RouterLink}
          to="/events"
          sx={{ color: '#101658', fontWeight: 700, fontSize: '20px', px: '30px' }}
        >
          All Sphere Events
        </Link>
      </Stack>
      <Typography sx={{ color: '#071A33', px: '30px' }}>{eventName}</Typography>
    </Stack>
  );
}
