import { Icon } from '@iconify/react';
import { RootState, useSelector } from 'redux/store';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
import { Box, Stack, IconButton } from '@material-ui/core';
// hooks
import { useEffect, useState } from 'react';
import useAuth from 'hooks/useAuth';
import ZoopAppAnnouncementPopover from 'pages/zoom/ZoopAppAnnouncementPopover';
import {
  COLLAPSE_WIDTH,
  CompanyLogo,
  HeadText,
  NavbarRootStyle,
  ToolbarStyle
} from 'layouts/Common';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// components
import { MHidden } from '../../components/@material-extend';
import AccountPopover from './AccountPopover';
import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

type DashboardNavbarProps = {
  onOpenSidebar: VoidFunction;
};

export default function DashboardNavbar({ onOpenSidebar }: DashboardNavbarProps) {
  const { isCollapse } = useCollapseDrawer();
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState<string | null>(null);
  const paths = useSelector((state: RootState) => state?.path?.paths);
  const pathSlugs = paths.map((path) => path.slug);
  const visibleHeaders = [
    ...pathSlugs,
    'messaging',
    'home',
    'events',
    'registrations',
    'cohort_sales',
    'cohort_experiences',
    'alumni',
    'waitlist_form',
    'monthly-registrations',
    'sessions',
    'peers',
    'Q&A',
    'attendance',
    'analytics',
    'surveys',
    'resources',
    'code',
    'onboarding-calendar-instructions',
    'referrals',
    'all-courses'
  ];

  const pathName = (slug: any) => paths.filter((path) => path.slug === slug)[0].name;

  useEffect(() => {
    const tab = window.location.href.split('/');
    const section = tab.reverse()[0];

    if (tab.length > 3) {
      if (visibleHeaders.includes(section)) {
        if (section === 'peers') {
          setCurrentTab('networking');
        } else if (section === 'cohort_sales') {
          setCurrentTab('Sales Overview');
        } else if (section === 'monthly-registrations') {
          setCurrentTab('Registrations Overview');
        } else if (section === 'analytics') {
          setCurrentTab('Analytics');
        } else if (section === 'cohort_experiences') {
          setCurrentTab('Cohort Experience Overview');
        } else if (section === 'waitlist_form') {
          setCurrentTab('Waitlist Form');
        } else if (section === 'alumni') {
          setCurrentTab('Alumni Overview');
        } else if (section === 'surveys') {
          setCurrentTab('Surveys Questions Form');
        } else if (section === 'code') {
          setCurrentTab('Code');
        } else if (section === 'onboarding-calendar-instructions') {
          setCurrentTab('Calendar');
        } else if (section === 'referrals') {
          setCurrentTab('Balance');
        } else if (section === 'sessions') {
          setCurrentTab('Recordings & Slides');
        } else if (section === 'all-courses') {
          setCurrentTab('All Courses');
        } else if (pathSlugs.includes(section)) {
          setCurrentTab(pathName(section));
        } else {
          setCurrentTab(section);
        }
      } else {
        setCurrentTab(null);
      }
    }
  }, [window.location.href, pathSlugs]);

  let TOP_NAVBAR_WIDTH = '100%';
  if (user?.type! === 'company') {
    TOP_NAVBAR_WIDTH = `calc(100% - ${COLLAPSE_WIDTH}px)`;
  }

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        {user?.type === 'company' && (
          <CompanyLogo>
            <img data-testid="company-logo" src="/static/sphere_with_logo.svg" alt="logo" />
          </CompanyLogo>
        )}
        <NavbarRootStyle
          sx={{
            ...(isCollapse && {
              width: { lg: `${TOP_NAVBAR_WIDTH}` }
            })
          }}
        >
          <ToolbarStyle>
            <MHidden width="lgUp">
              <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
                <Icon icon={menu2Fill} />
              </IconButton>
            </MHidden>

            {currentTab && (
              <HeadText
                color="text.primary"
                data-testid={`dashboard-navbar-${currentTab}`}
                variant="h4"
              >
                {currentTab}
              </HeadText>
            )}

            <Box sx={{ flexGrow: 1 }} />

            <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
              <ZoopAppAnnouncementPopover />
              <NotificationsPopover />
              <AccountPopover />
            </Stack>
          </ToolbarStyle>
        </NavbarRootStyle>
      </Box>
    </Box>
  );
}
