import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Box, Drawer, Switch } from '@material-ui/core';
// redux
import useAuth from '../../hooks/useAuth';
import { getCategories, getInstructorCohorts, getLearnerCohorts } from './Common';
import { RootState, useSelector } from '../../redux/store';
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// components
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';

//
import sidebarConfig from './SidebarConfig';
import cohortsConfig from './cohortsConfig';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.complex
    })
  }
}));

const StyledBox = styled(Box)(({ theme }) => ({
  padding: '25px'
}));

const LabelStyled = styled('label')(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 700,
  lineHeight: '20px',
  '&.blue': {
    color: '#4D4DCD'
  },
  '&.gray': {
    color: '#637381'
  }
}));

const SwitcherButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  marginTop: '10px'
}));

const ViewSwitcherStyle = styled('div')(({ theme }) => ({
  padding: 18,
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '24px',
  background: '#F1F1FB',
  borderRadius: 8
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  padding: '2.5rem'
}));

type DashboardSidebarProps = {
  isOpenSidebar: boolean;
  onCloseSidebar: VoidFunction;
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }: DashboardSidebarProps) {
  const { pathname } = useLocation();
  const { cohorts } = useSelector((state: RootState) => state.cohort);
  const { user, updateProfile } = useAuth();

  const setViewMode = (mode: string) => {
    if (user) {
      const new_user: any = user;
      updateProfile({ ...new_user, view_type: mode });
    }
  };

  const { isCollapse, collapseClick, collapseHover, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  const switchView = () => {
    if (user?.view_type === 'Instructor') {
      setViewMode('Member');
    } else {
      setViewMode('Instructor');
    }
  };

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const renderContent = (
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
        <img src="/static/ScholarSite.svg" alt="logo.svg" width={150} />
      </LogoContainer>
      {user?.view_type === 'Member' && (
        <NavSection
          navConfig={cohortsConfig(getLearnerCohorts(cohorts), 'Your Cohorts', false)}
          isShow={!isCollapse}
        />
      )}
      {user?.view_type === 'Instructor' &&
        getCategories(cohorts).map((category: string) => (
          <NavSection
            key={category}
            navConfig={cohortsConfig(getInstructorCohorts(cohorts, category), category, true)}
            isShow={!isCollapse}
          />
        ))}

      <NavSection navConfig={sidebarConfig} isShow={!isCollapse} />
      {user?.type !== 'learner' && (
        <StyledBox>
          <ViewSwitcherStyle>
            <p style={{ textAlign: 'center' }}>
              You are currently viewing the
              <b> {user?.view_type} Dashboard,</b> to access your{' '}
              {user?.view_type === 'Member' ? 'instructor toggle' : 'cohorts as a member'}, use the
              toggle bellow:
            </p>
            <SwitcherButtonContainer>
              <LabelStyled className={user?.view_type === 'Member' ? 'blue' : 'gray'}>
                Member
              </LabelStyled>
              <Switch
                size="small"
                checked={user?.view_type === 'Instructor'}
                onChange={() => switchView()}
              />
              <LabelStyled className={user?.view_type === 'Instructor' ? 'blue' : 'gray'}>
                Instructor
              </LabelStyled>
            </SwitcherButtonContainer>
          </ViewSwitcherStyle>
        </StyledBox>
      )}
    </Scrollbar>
  );

  return (
    <>
      {cohorts && (
        <RootStyle
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
        </RootStyle>
      )}
    </>
  );
}
