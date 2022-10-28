import { useCallback, useEffect, useState } from 'react';
// utils;
import { trackEvent } from 'utils/eventTracking';
import useAuth from 'hooks/useAuth';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

// material
import { Container, Box, Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
// redux
import StudentProfileFilters from 'components/students/StudentProfileFilters';
import EmptyNetworkingTab from 'components/cohorts/onboarding/empty-states/EmptyNetworkingTab';
import { ExportToExcel, ExportOnboardingResponse } from 'components/students/Common';
import StudentProfilePrompt from 'components/students/StudentProfilePrompt';
import NetworkProfileModal from 'components/cohorts/home/NetworkProfileModal';
import AlumniData from 'components/students/AlumniData';
import LoadingScreen from '../../components/LoadingScreen';
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { StudentProfile } from '../../@types/cohorts';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { getPeers } from '../../redux/slices/cohort';

import {
  StudentProfileGrid,
  StudentProfileList,
  StudentProfileModal
} from '../../components/students';
// ----------------------------------------------------------------------
const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));

export default function PeersTab() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [modalState, modalHandler] = useState<StudentProfile | any>({});
  const [networkingModalState, setNetworkingModalState] = useState(false);
  const cohort_id: any = window.location.pathname.split('/')[2] || '';
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [view, setView] = useState('grid');
  const { user } = useAuth();
  const url = new URLSearchParams(useLocation().search);
  const { mode } = useSelector((state: RootState) => state.instructorView);

  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );

  const { peers } = cohort || { peers: null };
  let filteredPeers: Array<StudentProfile> = [];

  if (peers) {
    filteredPeers = peers.filter((peer) => peer.type === 'learner' && peer.profile_image_url);
  }

  useEffect(() => {
    if (cohort?.released_for_learners) {
      // get all the companies to choose from peers.
      let newCompanies = filteredPeers
        ?.map((peer) => peer.current_company.name)
        ?.filter((name) => !!name);
      // make the companies array unique
      newCompanies = Array.from(new Set(newCompanies)).sort((a, b) => a.localeCompare(b));
      setCompanies(newCompanies);
      // make select items for strengths
      setSelectedCompanies([]);
      const user_id = url.get('user_id');
      if (user_id && filteredPeers?.length > 0) {
        const peer = filteredPeers.filter((peer) => peer.id === user_id)[0];
        if (peer) {
          modalHandler(peer);
        }
      }
    }
  }, [peers, cohort_id]);

  useEffect(() => {
    if (cohort?.released_for_learners) {
      if (cohort && peers?.length > 0) {
        trackEvent(cohort, 'Networking Page - Page Loaded', {});
      }
    }
  }, [cohort, peers]);

  const handleChange = (event: any) => {
    const {
      target: { value }
    } = event;

    setSelectedCompanies(value);
  };

  useEffect(() => {
    if (cohort?.released_for_learners) {
      if (cohort && !peers) {
        dispatch(getPeers(cohort_id.toString(), user?.id));
      }
    }
  }, [dispatch, cohort]);

  const applyFilters = useCallback(() => {
    let filteredStudents: any = filteredPeers;
    if (selectedCompanies.length > 0) {
      filteredStudents = filteredStudents?.filter((student: any) =>
        selectedCompanies?.includes(student?.current_company?.name)
      );
    }

    if (selectedInterests.length > 0) {
      filteredStudents = filteredStudents?.filter(
        (student: any) =>
          selectedInterests?.filter((interest) =>
            student?.interests?.find((item: any) => item === interest)
          ).length
      );
    }

    return filteredStudents;
  }, [selectedCompanies, selectedInterests, peers]);

  const trackModalEvent = (eventName: string, student: StudentProfile) => {
    trackEvent(cohort, eventName, {
      'Profile User ID': student.id,
      'Profile User First Name': student.first_name,
      'Profile User Last Name': student.last_name,
      'Profile User Full Name': `${student.first_name} ${student.last_name}`,
      'Profile User Company ID': student.current_company?.id,
      'Profile User Company': student.current_company?.name,
      'Profile User Role': student.current_position,
      'Profile User LinkedIn': student.linkedin_url,
      'Profile User Email': student.email,
      'Profile User Sphere Messaging Link': `/cohorts/${cohort_id}/messaging?direct=true&receiver_id=${student.id}`
    });
  };

  const showCardView = () =>
    !cohort?.released_for_learners ? (
      <AlumniData
        viewMode="grid"
        setCompanies={setCompanies}
        modalHandler={(peer: any) => {
          modalHandler(peer);
          trackModalEvent('Networking Page - Profile Modal - Modal Opened', peer);
        }}
      />
    ) : (
      <StudentProfileGrid
        students={applyFilters()}
        modalHandler={(peer: any) => {
          modalHandler(peer);
          trackModalEvent('Networking Page - Profile Modal - Modal Opened', peer);
        }}
      />
    );

  const showTableView = () =>
    !cohort?.released_for_learners ? (
      <AlumniData
        viewMode="list"
        setCompanies={setCompanies}
        modalHandler={(peer: any) => {
          modalHandler(peer);
          trackModalEvent('Networking Page - Profile Modal - Modal Opened', peer);
        }}
      />
    ) : (
      <StudentProfileList
        students={applyFilters()}
        modalHandler={(peer: any) => {
          modalHandler(peer);
          trackModalEvent('Networking Page - Profile Modal - Modal Opened', peer);
        }}
      />
    );

  const renderPeers = () =>
    !cohort?.released_for_learners || peers ? (
      <Container maxWidth={themeStretch ? false : 'lg'} style={{ paddingBottom: '50px' }}>
        {mode === 'Learner' && (
          <StudentProfilePrompt setNetworkingModalState={setNetworkingModalState} cohort={cohort} />
        )}
        <NetworkProfileModal
          networkingModalState={networkingModalState}
          setNetworkingModalState={setNetworkingModalState}
          cohort={cohort}
        />
        <HeaderBreadcrumbs
          id="cohort-tab-title"
          heading={!cohort?.released_for_learners ? 'Alumni' : 'Peers'}
          links={[]}
        />
        <StudentProfileModal
          modalState={Object.keys(modalState).length > 0}
          modalHandler={modalHandler}
          trackModalEvent={trackModalEvent}
          modalUser={modalState}
          dispalyChatLink={
            modalState.id !== user?.id && cohort_id !== 'e5659779-2c87-43b1-98f7-93d8b7173d61'
          }
          cohort={cohort}
        />
        <Stack
          width="100%"
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <StudentProfileFilters
            companies={companies}
            selectedCompanies={selectedCompanies}
            handleCompanyChange={handleChange}
            setView={setView}
            view={view}
            cohort={cohort}
          />
          {((user?.type === 'admin' && mode === 'Instructor') || user?.type === 'expert') && (
            <Stack direction={{ xs: 'row', md: 'row' }} style={{ gap: '16px' }}>
              <ExportToExcel
                cohort={cohort}
                students={filteredPeers}
                fileName={`${moment().format()}-${cohort?.name} Students Data`}
              />
              <ExportOnboardingResponse
                cohort={cohort}
                fileName={`${moment().format()}-${cohort?.name} Onboarding Response`}
              />
            </Stack>
          )}
        </Stack>
        {view === 'grid' ? showCardView() : showTableView()}
      </Container>
    ) : (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );

  return (
    <Page title="Sphere | Peers">
      {mode === 'Instructor' || mode === 'Learner' ? (
        renderPeers()
      ) : (
        <EmptyNetworkingTab key={cohort_id} cohortHost={cohort?.host_names} />
      )}
    </Page>
  );
}
