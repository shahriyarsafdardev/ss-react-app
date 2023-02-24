import { Icon } from '@iconify/react';
import { RootState, useSelector } from 'redux/store';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
import { Box, IconButton, useMediaQuery } from '@material-ui/core';
import { HeadText, NavbarRootStyle, ToolbarStyle } from 'layouts/Common';
import { useTheme } from '@material-ui/core/styles';
// hooks
import { useEffect, useState } from 'react';
import useAuth from 'hooks/useAuth';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// components
import { MHidden } from '../../components/@material-extend';
import EventNavbar from '../main/EventNavbar';
import { StyledButton } from './Common';
// ----------------------------------------------------------------------

type DashboardNavbarProps = {
  onOpenSidebar: VoidFunction;
  setLoginModalState?: Function;
};

export default function DashboardNavbar({
  onOpenSidebar,
  setLoginModalState
}: DashboardNavbarProps) {
  const { isAuthenticated } = useAuth();
  const { isCollapse } = useCollapseDrawer();
  const [currentTab, setCurrentTab] = useState<string | null>(null);
  const paths = useSelector((state: RootState) => state?.path?.paths);
  const pathSlugs = paths.map((path) => path.slug);
  const visibleHeaders = [...pathSlugs, 'messaging', 'contact-us', 'all-courses'];
  const communityEvent = useSelector((state: RootState) => state?.event.communityEvent);
  const pathTabs = window.location.pathname.split('/');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const displayEventsNavbar =
    !isMobile && communityEvent.id !== '' && pathTabs[1] === 'events' && !!pathTabs[2];

  useEffect(() => {
    const tab = window.location.href.split('/');
    const section = tab.reverse()[0];

    if (tab.length > 3) {
      if (visibleHeaders.includes(section)) {
        if (section === 'all-courses') {
          setCurrentTab('All Courses');
        } else if (section === 'contact-us') {
          setCurrentTab('Contact Us');
        } else {
          setCurrentTab(section);
        }
      } else if (pathTabs[1] === 'events') {
        setCurrentTab('Events');
      } else {
        setCurrentTab(null);
      }
    }
  }, [window.location.href, pathSlugs]);

  const TOP_NAVBAR_WIDTH = '100%';

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <NavbarRootStyle
          sx={{
            ...(isCollapse && {
              width: { lg: `${TOP_NAVBAR_WIDTH}` }
            })
          }}
        >
          <ToolbarStyle
            sx={{
              ...(displayEventsNavbar && {
                padding: '0 40px 0 0 !important'
              })
            }}
          >
            <MHidden width="lgUp">
              <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
                <Icon icon={menu2Fill} />
              </IconButton>
            </MHidden>

            {displayEventsNavbar && <EventNavbar eventName={communityEvent.name} />}

            {!displayEventsNavbar && currentTab && (
              <HeadText
                color="text.primary"
                data-testid={`dashboard-navbar-${currentTab}`}
                variant="h4"
              >
                {currentTab}
              </HeadText>
            )}
            <Box sx={{ flexGrow: 1 }} />
            {!isAuthenticated && (
              <Box sx={{ minWidth: { xs: '70px', md: '110px' } }}>
                <StyledButton
                  variant="contained"
                  onClick={() => setLoginModalState && setLoginModalState(true)}
                >
                  Log In
                </StyledButton>
              </Box>
            )}
          </ToolbarStyle>
        </NavbarRootStyle>
      </Box>
    </Box>
  );
}
