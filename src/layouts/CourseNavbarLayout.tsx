import { useState, useRef } from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
// material
import { AppBar, Button, Stack, Link, MenuItem, IconButton } from '@material-ui/core';
import { styled, alpha } from '@material-ui/core/styles';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import MenuPopover from '../components/MenuPopover';

// ----------------------------------------------------------------------

const HeaderStyle = styled(AppBar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  backdropFilter: 'blur(10px)',
  boxShadow: 'none',
  padding: '0px 50px ',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '73px'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: 300
}));
// ----------------------------------------------------------------------

export default function CourseNavbarLayout() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  return (
    <>
      <HeaderStyle>
        <RouterLink to="/" style={{ width: '150px', marginRight: 0 }}>
          <img src="/static/sphere_with_logo.svg" alt="logo" width="150px" />
        </RouterLink>
        <Stack sx={{ display: { xs: 'none', md: 'block' } }} direction="row" spacing={3}>
          <StyledButton variant="text" size="large" href="/">
            My Courses
          </StyledButton>
          <StyledButton variant="text" size="large" href="/events">
            Events
          </StyledButton>
          <Button size="large" variant="text">
            All Courses
          </Button>
          <StyledButton variant="text" size="large" href="/contact-us">
            Contact us
          </StyledButton>
        </Stack>
        <MenuPopover
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          anchorEl={menuRef.current}
        >
          <MenuItem>
            <Link href="/">My Courses</Link>
          </MenuItem>
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
