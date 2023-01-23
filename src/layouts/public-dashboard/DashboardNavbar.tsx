import { Icon } from '@iconify/react';
import { RootState, useSelector } from 'redux/store';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
import { Box, IconButton } from '@material-ui/core';
import { COLLAPSE_WIDTH, HeadText, NavbarRootStyle, ToolbarStyle } from 'layouts/Common';
// hooks
import { useEffect, useState } from 'react';
import useAuth from 'hooks/useAuth';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// components
import { MHidden } from '../../components/@material-extend';
import EventNavbar from '../main/EventNavbar';
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
  const visibleHeaders = [...pathSlugs, 'messaging', 'events', 'contact-us'];
  const communityEvent = useSelector((state: RootState) => state?.event.communityEvent);

  useEffect(() => {
    const tab = window.location.href.split('/');
    const section = tab.reverse()[0];

    if (tab.length > 3) {
      if (visibleHeaders.includes(section)) {
        if (section === 'contact-us') {
          setCurrentTab('Contact Us');
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
        <NavbarRootStyle
          sx={{
            ...(isCollapse && {
              width: { lg: `${TOP_NAVBAR_WIDTH}` }
            })
          }}
        >
          <ToolbarStyle
            sx={{
              ...(communityEvent.id !== '' && {
                padding: '0 !important'
              })
            }}
          >
            <MHidden width="lgUp">
              <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
                <Icon icon={menu2Fill} />
              </IconButton>
            </MHidden>

            {communityEvent.id !== '' && <EventNavbar eventName={communityEvent.name} />}

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
          </ToolbarStyle>
        </NavbarRootStyle>
      </Box>
    </Box>
  );
}
