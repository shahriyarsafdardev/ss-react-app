import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Box, Drawer, Switch } from '@material-ui/core';
// redux
import useAuth from 'hooks/useAuth';
import { updateInstructorViewState } from 'redux/slices/viewMode';

import { initializeReferralLink } from 'redux/slices/cohort';
import {
  getCategories,
  getInstructorCohorts,
  groupByIntake,
  getLearnerCohorts,
  ShareReferralLink
} from './Common';
import { dispatch, RootState, useSelector } from '../../redux/store';

// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// components
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';

//
import sidebarConfig from './SidebarConfig';
import adminToolsConfig from './AdminToolsConfig';
import { learnerCohortsConfig, instructorCohortsConfig } from './cohortsConfig';

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

const ReferralStyledBox = styled(Box)(({ theme }) => ({
  height: '500px',
  [theme.breakpoints.down('md')]: {
    height: '700px'
  }
}));

const LabelStyled = styled('label')(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 700,
  lineHeight: '20px',
  '&.blue': {
    color: theme.palette.primary.main
  },
  '&.gray': {
    color: theme.palette.text.primary
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

const ViewReferralLinks = styled(ViewSwitcherStyle)(({ theme }) => ({
  margin: '30px 20px'
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  padding: '2.5rem',
  display: 'flex'
}));

type DashboardSidebarProps = {
  isOpenSidebar: boolean;
  onCloseSidebar: VoidFunction;
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }: DashboardSidebarProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { cohorts } = useSelector((state: RootState) => state.cohort);
  const { mode } = useSelector((state: RootState) => state.instructorView);
  const { user } = useAuth();
  const [referralEmailModal, setReferralEmailModal] = useState(false);
  const referralLink = useSelector((state: RootState) => state.cohort.referralLink);
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const uuidRegexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );

  const { isCollapse, collapseClick, collapseHover, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  const switchView = () => {
    let url = '/';
    if (mode === 'Instructor') {
      updateInstructorViewState('Learner');
      if (cohorts.length > 0) {
        url = `/cohorts/${cohorts[0].id}/home`;
      }
    } else {
      updateInstructorViewState('Instructor');
      const hostCohorts = cohorts.filter((cohort) => cohort.is_host);
      if (hostCohorts.length > 0) {
        url = `/cohorts/${hostCohorts[0].id}/registrations`;
      }
    }
    navigate(url);
  };

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    if (user?.type === 'learner') {
      updateInstructorViewState('Learner');
      if (uuidRegexExp.test(cohort_id)) {
        dispatch(initializeReferralLink(cohort_id));
      }
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

        {user?.type === 'admin' && (
          <NavSection data-testid="admin-tools" navConfig={adminToolsConfig} isShow={!isCollapse} />
        )}

        {mode === 'Learner' &&
          groupByIntake(cohorts).map((intakeCategory: string) => (
            <NavSection
              data-testid="member-sidebar"
              key={intakeCategory || 'With no intake Name'}
              navConfig={learnerCohortsConfig(
                getLearnerCohorts(cohorts, intakeCategory),
                intakeCategory || 'With no intake Name'
              )}
              isShow={!isCollapse}
            />
          ))}
        {mode === 'Instructor' &&
          getCategories(cohorts).map((category) => (
            <NavSection
              data-testid="instructor-sidebar"
              key={category}
              navConfig={instructorCohortsConfig(getInstructorCohorts(cohorts, category), category)}
              isShow={!isCollapse}
            />
          ))}

        <NavSection navConfig={sidebarConfig} isShow={!isCollapse} />
        {user?.type !== 'learner' && (
          <StyledBox>
            <ViewSwitcherStyle>
              <p data-testid="dashboard-infotext" style={{ textAlign: 'center' }}>
                You are currently viewing the
                <b> {mode} Dashboard,</b> to access your{' '}
                {mode === 'Learner' ? 'instructor dashboard' : 'cohorts as a learner'}, use the
                toggle below:
              </p>
              <SwitcherButtonContainer>
                <LabelStyled className={mode === 'Learner' ? 'blue' : 'gray'}>Learner</LabelStyled>
                <Switch
                  data-testid="dashboard-switch"
                  size="small"
                  checked={mode === 'Instructor'}
                  onChange={() => switchView()}
                />
                <LabelStyled className={mode === 'Instructor' ? 'blue' : 'gray'}>
                  Instructor
                </LabelStyled>
              </SwitcherButtonContainer>
            </ViewSwitcherStyle>
          </StyledBox>
        )}
        {user?.type === 'learner' && (
          <ReferralStyledBox>
            <ViewReferralLinks>
              <ShareReferralLink
                referralEmailModal={referralEmailModal}
                setReferralEmailModal={setReferralEmailModal}
                referralLink={referralLink}
                cohort={cohort}
              />
            </ViewReferralLinks>
          </ReferralStyledBox>
        )}
      </Scrollbar>
    </>
  );

  return (
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
  );
}
