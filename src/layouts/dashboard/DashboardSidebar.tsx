import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// material
import { alpha } from '@material-ui/core/styles';
import { Drawer, Switch } from '@material-ui/core';
// redux
import useAuth from 'hooks/useAuth';
import { updateInstructorViewState } from 'redux/slices/viewMode';

import {
  communitySidebarConfigEvents,
  SidebarRootStyle,
  LogoContainer,
  StyledBox,
  ViewSwitcherStyle,
  SwitcherButtonContainer,
  LabelStyled,
  ReferralStyledBox,
  ViewReferralLinks,
  filteredPaths
} from 'layouts/Common';
import {
  getCategories,
  getSortedLearnerCohorts,
  getInstructorCohorts,
  ShareReferralLink
} from './Common';
import { RootState, useSelector } from '../../redux/store';

// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// components
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';

//
import adminToolsConfig from './AdminToolsConfig';
import { instructorCohortsConfig, learnerCohortsConfigV2 } from './cohortsConfig';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;

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
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const paths = useSelector((state: RootState) => state?.path?.paths);

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

        <NavSection navConfig={communitySidebarConfigEvents()} isShow={!isCollapse} />

        {mode === 'Learner' && (
          <>
            <NavSection
              data-testid="member-sidebar"
              navConfig={learnerCohortsConfigV2(
                getSortedLearnerCohorts(cohorts),
                filteredPaths(paths)
              )}
              isShow={!isCollapse}
            />
          </>
        )}
        {mode === 'Instructor' &&
          getCategories(cohorts).map((category) => (
            <NavSection
              data-testid="instructor-sidebar"
              key={category}
              navConfig={instructorCohortsConfig(getInstructorCohorts(cohorts, category), category)}
              isShow={!isCollapse}
            />
          ))}
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
