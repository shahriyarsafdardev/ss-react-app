import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography, Stack, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

export default function EventNavbar({ eventName }: { eventName: string }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

      {!isMobile && <Typography sx={{ color: '#071A33', px: '30px' }}>{eventName}</Typography>}
    </Stack>
  );
}
