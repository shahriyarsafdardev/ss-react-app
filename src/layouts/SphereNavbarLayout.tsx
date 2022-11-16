import { useState, useRef, useEffect } from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
// material
import { AppBar, Button, Stack, Link, MenuItem, IconButton } from '@material-ui/core';
import { styled, alpha } from '@material-ui/core/styles';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import axios from 'utils/axios';
import { trackEvent } from 'utils/eventTracking';
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
  const [cohort, setCohort] = useState<any>();
  const cohort_id = window.location.pathname.split('/')[2] || '';

  useEffect(() => {
    const getCohort = async () => {
      await axios.get(`/cohorts/${cohort_id}.json`).then((res) => {
        setCohort(res.data.cohort);
      });
    };
    !!cohort_id && getCohort();
  }, [cohort_id]);

  const sendAnalyticsEvent = (eventName: string, eventData?: any) => {
    trackEvent(cohort, eventName, eventData);
  };

  return (
    <>
      <HeaderStyle>
        <RouterLink to="/" style={{ width: '150px', marginRight: 0 }}>
          <img src="/static/sphere_with_logo.svg" alt="logo" width="150px" />
        </RouterLink>
        <Stack sx={{ display: { xs: 'none', md: 'block' } }} direction="row" spacing={3}>
          <Button
            variant="text"
            size="large"
            href="https://www.getsphere.com/#cohort-tabs?source=Sphere-Outbound-Resources-Page"
            target="_blank"
            onClick={() => sendAnalyticsEvent('Resources Page - "Our Courses" Selected')}
          >
            Our Courses
          </Button>
          <Button
            size="large"
            variant="text"
            href="https://www.getsphere.com/#businesses?source=Sphere-Outbound-Resources-Page"
            target="_blank"
            onClick={() => sendAnalyticsEvent('Resources Page - "For Business" Selected')}
          >
            For Businesses
          </Button>
          <Button
            variant="text"
            size="large"
            href="https://www.getsphere.com/pages/expert-instructors?source=Sphere-Outbound-Resources-Page"
            target="_blank"
            onClick={() => sendAnalyticsEvent('Resources Page - "For Experts" Selected')}
          >
            For Experts
          </Button>
          <Button
            variant="contained"
            target="_blank"
            href={`${cohort?.registration_page_url}?source=Sphere-Outbound-Resources-Page`}
            sx={{
              height: '48px',
              borderRadius: '4px',
              background: 'linear-gradient(135.12deg, #7474D0 0.07%, #4D4DCD 100.02%)'
            }}
            onClick={() => sendAnalyticsEvent('Resources Page - "View Course Details" Selected')}
          >
            View Course Details
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
            <Link
              target="_blank"
              href="https://www.getsphere.com/#cohort-tabs?source=Sphere-Outbound-Resources-Page"
              onClick={() => sendAnalyticsEvent('Resources Page - "Our Courses" Selected')}
            >
              Our Courses
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="https://www.getsphere.com/#businesses?source=Sphere-Outbound-Resources-Page"
              target="_blank"
              onClick={() => sendAnalyticsEvent('Resources Page - "For Business" Selected')}
            >
              For Businesses
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="https://www.getsphere.com/pages/expert-instructors?source=Sphere-Outbound-Resources-Page"
              target="_blank"
              onClick={() => sendAnalyticsEvent('Resources Page - "For Experts" Selected')}
            >
              For Experts
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              target="_blank"
              href={`${cohort?.registration_page_url}?source=Sphere-Outbound-Resources-Page`}
              onClick={() => sendAnalyticsEvent('Resources Page - "View Course Details" Selected')}
            >
              View Course Details
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
