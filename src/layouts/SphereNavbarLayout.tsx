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
  padding: '25px 50px ',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between'
}));

// ----------------------------------------------------------------------

export default function SphereNavbarLayout() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  return (
    <>
      <HeaderStyle>
        <RouterLink to="/" style={{ width: '150px', marginRight: 0 }}>
          <img src="/static/sphere_with_logo.svg" alt="logo" width="150px" />
        </RouterLink>
        <Stack sx={{ display: { xs: 'none', md: 'block' } }} direction="row" spacing={3}>
          <Button
            size="large"
            variant="text"
            href="https://www.getsphere.com/#businesses"
            target="_blank"
          >
            For Businesses
          </Button>
          <Button
            variant="text"
            size="large"
            href="https://www.getsphere.com/pages/expert-instructors"
            target="_blank"
          >
            For Experts
          </Button>
          <Button variant="contained" target="_blank" href="https://www.getsphere.com/#cohort-tabs">
            Our Courses
          </Button>
        </Stack>
        <MenuPopover
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          anchorEl={menuRef.current}
        >
          <MenuItem>
            <Link href="https://www.getsphere.com/#businesses" target="_blank">
              For Businesses
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="https://www.getsphere.com/pages/expert-instructors" target="_blank">
              For Experts
            </Link>
          </MenuItem>
          <MenuItem>
            <Link target="_blank" href="https://www.getsphere.com/#cohort-tabs">
              Our Courses
            </Link>
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
