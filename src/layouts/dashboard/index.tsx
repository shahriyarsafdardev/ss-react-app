import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { useTheme } from '@material-ui/core/styles';
// hooks
import useAuth from 'hooks/useAuth';
import { Box, useMediaQuery } from '@material-ui/core';
import PreCohortChecklist from 'components/cohorts/home/PreCohortChecklist';
import { RootState, useSelector } from 'redux/store';
import { RootStyle, MainStyle } from 'layouts/Common';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';

//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

export default function DashboardLayout() {
  const theme = useTheme();
  const { collapseClick } = useCollapseDrawer();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const current_url = window.location.pathname.split('/');
  const current_tab = current_url[current_url.length - 1];
  const isChecklistVisible = current_url[1] === 'cohorts';
  const { mode } = useSelector((state: RootState) => state.instructorView);
  const isAnyCohortExist = useSelector((state: RootState) => state?.cohort?.cohorts).length > 0;
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      {user?.type !== 'company' && (
        <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      )}
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
        {mode === 'Learner' &&
          isDesktop &&
          current_tab !== 'home' &&
          isChecklistVisible &&
          isAnyCohortExist && (
            <Box
              sx={{
                maxWidth: '360px',
                width: '22%',
                position: 'fixed',
                bottom: '30px',
                left: '40px',
                zIndex: '1200'
              }}
            >
              <PreCohortChecklist />
            </Box>
          )}
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
