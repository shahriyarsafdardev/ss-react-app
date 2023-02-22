import { useState, useRef, useEffect } from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { trackEvent } from 'utils/eventTracking';
// material
import { AppBar, Button, Stack, Link, MenuItem, IconButton, Box } from '@material-ui/core';
import { styled, alpha } from '@material-ui/core/styles';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import useAuth from 'hooks/useAuth';
import MenuPopover from '../components/MenuPopover';
import { StyledButton as StyledLoginButton, LoginModal } from './public-dashboard/Common';
import AccountPopover from './dashboard/AccountPopover';

// ----------------------------------------------------------------------

const HeaderStyle = styled(AppBar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  backdropFilter: 'blur(10px)',
  padding: '0px 50px ',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '73px',
  filter: 'drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.15))',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'row-reverse',
    padding: '0px 20px '
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: 400
}));

const StyledImage = styled('img')(({ theme }) => ({}));
// ----------------------------------------------------------------------

const sendAnalyticsData = (tabSelected: string) =>
  trackEvent(null, 'All Courses Page - Navbar Tab Selected', { 'Tab Name': tabSelected });

export default function CourseNavbarLayout() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { isAuthenticated } = useAuth();
  const [loginModalState, setLoginModalState] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setLoginModalState(false);
      setIsRegistered(false);
    }
  }, [isAuthenticated]);
  return (
    <>
      <MenuPopover
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        anchorEl={menuRef.current}
      >
        <MenuItem>
          <Link href="/events">Events</Link>
        </MenuItem>
        <MenuItem>
          <Link sx={{ fontWeight: 700 }}>All Courses</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/contact-us">Contact us</Link>
        </MenuItem>
      </MenuPopover>
      <LoginModal
        loginModalState={loginModalState}
        setLoginModalState={setLoginModalState}
        isRegistered={isRegistered}
        setIsRegistered={setIsRegistered}
      />
      <HeaderStyle>
        <Link
          component={RouterLink}
          to="/"
          sx={{ width: '150px', marginRight: 0, display: { xs: 'none', md: 'unset' } }}
        >
          <StyledImage src="/static/sphere_with_logo.svg" alt="logo" width="150px" />
        </Link>
        <Stack direction="row" spacing={3}>
          <Stack sx={{ display: { xs: 'none', md: 'flex' } }} direction="row" spacing={3}>
            <StyledButton
              variant="text"
              size="large"
              href="/events"
              onClick={() => sendAnalyticsData('Events')}
            >
              Events
            </StyledButton>
            <Button size="large" variant="text" onClick={() => sendAnalyticsData('All Courses')}>
              All Courses
            </Button>
            <StyledButton
              variant="text"
              size="large"
              href="/contact-us"
              onClick={() => sendAnalyticsData('Contact Us')}
            >
              Contact us
            </StyledButton>
          </Stack>
          {!isAuthenticated ? (
            <Box sx={{ minWidth: { xs: '70px', md: '110px' } }}>
              <StyledLoginButton
                variant="contained"
                onClick={() => setLoginModalState && setLoginModalState(true)}
              >
                Log In
              </StyledLoginButton>
            </Box>
          ) : (
            <AccountPopover publicNavbar={true} />
          )}
        </Stack>
        <IconButton
          sx={{ display: { xs: 'block', md: 'none' } }}
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={() => setOpen(!open)}
          ref={menuRef}
        >
          <Icon icon={menu2Fill} />
        </IconButton>
      </HeaderStyle>
      <Outlet />
    </>
  );
}
