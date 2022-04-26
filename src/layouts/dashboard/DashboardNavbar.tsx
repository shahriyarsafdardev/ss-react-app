import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
// hooks
import { useEffect, useState } from 'react';
import useAuth from 'hooks/useAuth';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// components
import { MHidden } from '../../components/@material-extend';
import AccountPopover from './AccountPopover';
import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

const CompanyLogo = styled(Box)(({ theme }) => ({
  margin: '2rem 0 0 2rem',
  [theme.breakpoints.down('md')]: {
    display: 'none',
    margin: '0'
  }
}));

// ----------------------------------------------------------------------

type DashboardNavbarProps = {
  onOpenSidebar: VoidFunction;
};

export default function DashboardNavbar({ onOpenSidebar }: DashboardNavbarProps) {
  const { isCollapse } = useCollapseDrawer();
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState<string | null>(null);
  const visibleHeaders = [
    'messaging',
    'home',
    'registrations',
    'cohort_sales',
    'monthly-registrations',
    'sessions',
    'peers',
    'Q&A',
    'attendance'
  ];

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
        } else {
          setCurrentTab(section);
        }
      } else {
        setCurrentTab(null);
      }
    }
  }, [window.location.href]);

  let TOP_NAVBAR_WIDTH = '100%';
  if (user?.type! === 'company') {
    TOP_NAVBAR_WIDTH = `calc(100% - ${COLLAPSE_WIDTH}px)`;
  }

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        {user?.type === 'company' && (
          <CompanyLogo>
            <img
              data-testid="company-logo"
              src="/static/business-empty-states/scholarsite-logo.svg"
              alt="logo"
            />
          </CompanyLogo>
        )}
        <RootStyle
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
              <Typography
                data-testid={`dashboard-navbar-${currentTab}`}
                variant="h4"
                style={{ color: '#071A33', textTransform: 'capitalize' }}
              >
                {currentTab}
              </Typography>
            )}

            <Box sx={{ flexGrow: 1 }} />

            <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
              <NotificationsPopover />
              <AccountPopover />
            </Stack>
          </ToolbarStyle>
        </RootStyle>
      </Box>
    </Box>
  );
}
