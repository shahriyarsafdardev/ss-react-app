import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// material
import { alpha } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';

// hooks
import { communitySidebarConfig, SidebarRootStyle, LogoContainer } from 'layouts/Common';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// components
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';

//

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;
// ----------------------------------------------------------------------

type DashboardSidebarProps = {
  isOpenSidebar: boolean;
  onCloseSidebar: VoidFunction;
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }: DashboardSidebarProps) {
  const { pathname } = useLocation();

  const { isCollapse, collapseClick, collapseHover, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const renderContent = (
    <>
      <Scrollbar
        sx={{
          height: 1,
          '& .simplebar-content': {
            height: 1,
            display: 'flex',
            flexDirection: 'column'
          }
        }}
      >
        <LogoContainer>
          <img src="/static/sphere_with_logo.svg" alt="logo.svg" width={150} />
        </LogoContainer>

        <>
          <NavSection navConfig={communitySidebarConfig[0]} isShow={!isCollapse} />
          <NavSection navConfig={communitySidebarConfig[1]} isShow={!isCollapse} />
        </>
      </Scrollbar>
    </>
  );

  return (
    <SidebarRootStyle
      sx={{
        width: {
          lg: isCollapse ? COLLAPSE_WIDTH : DRAWER_WIDTH
        },
        ...(collapseClick && {
          position: 'absolute'
        })
      }}
    >
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              ...(isCollapse && {
                width: COLLAPSE_WIDTH
              }),
              ...(collapseHover && {
                borderRight: 0,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
                boxShadow: (theme) => theme.customShadows.z20,
                bgcolor: (theme) => alpha(theme.palette.background.default, 0.88)
              })
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </SidebarRootStyle>
  );
}
