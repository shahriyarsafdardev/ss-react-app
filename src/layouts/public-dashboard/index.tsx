import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { useTheme } from '@material-ui/core/styles';
// hooks
import { RootStyle, MainStyle } from 'layouts/Common';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
//
import DashboardSidebar from './DashboardSidebar';
import DashboardNavbar from './DashboardNavbar';
import { LoginModal } from './Common';

export default function PublicDashboardLayout() {
  const theme = useTheme();
  const { collapseClick } = useCollapseDrawer();
  const [open, setOpen] = useState(false);
  const [loginModalState, setLoginModalState] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <RootStyle>
      <LoginModal
        loginModalState={loginModalState}
        setLoginModalState={setLoginModalState}
        isRegistered={isRegistered}
        setIsRegistered={setIsRegistered}
      />
      <DashboardNavbar
        onOpenSidebar={() => setOpen(true)}
        setLoginModalState={setLoginModalState}
      />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle
        sx={{
          transition: theme.transitions.create('margin', {
            duration: theme.transitions.duration.complex
          }),
          ...(collapseClick && {
            ml: '102px'
          })
        }}
      >
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
