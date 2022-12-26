import { useCallback, useEffect, useMemo, useState } from 'react';
// utils;
import { trackEvent } from 'utils/eventTracking';
import useAuth from 'hooks/useAuth';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import axios from 'utils/axios';
// material
import { debounce, uniq } from 'lodash';
import { Container, Box, Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
// redux
import StudentProfileFilters from 'components/students/StudentProfileFilters';
import EmptyNetworkingTab from 'components/cohorts/onboarding/empty-states/EmptyNetworkingTab';
import { ExportToExcel, ExportOnboardingResponse } from 'components/students/Common';
import StudentProfilePrompt from 'components/students/StudentProfilePrompt';
import NetworkProfileModal from 'components/cohorts/home/NetworkProfileModal';
import AlumniProfileContainer from 'components/students/AlumniProfileContainer';
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
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [view, setView] = useState('grid');
  const { user } = useAuth();
  const url = new URLSearchParams(useLocation().search);
  const { mode } = useSelector((state: RootState) => state.instructorView);
  const [alumni, setAlumni] = useState<StudentProfile[]>([]);

  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );

  const { peers } = cohort || { peers: null };
  let filteredPeers: Array<StudentProfile> = [];

  const displayPeers = useMemo(
    () =>
      cohort?.released_for_learners ||
      user?.type === 'expert' ||
      user?.type === 'admin' ||
      user?.admin,
    [cohort?.released_for_learners, user?.type, user?.admin]
  );

  if (displayPeers && peers) {
    filteredPeers = peers.filter((peer) => peer.type === 'learner' && peer.profile_image_url);
  }

  useEffect(() => {
    const getCompanies = () => {
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
    };
    if (displayPeers) {
      getCompanies();
    }
  }, [peers, cohort_id]);

  useEffect(() => {
    if (displayPeers) {
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
    if (cohort) {
      if (displayPeers) {
        !peers && dispatch(getPeers(cohort_id.toString(), user?.id));
      } else {
        getAlumni();
      }
    }
  }, [dispatch, cohort]);

  const getAlumni = debounce(async () => {
    await axios
      .get(`/cohorts/peers_in_batches.json?offset=${offset}`)
      .then((res: any) => {
        const updatedAlumni = [
          ...alumni,
          ...res.data.alumnis.filter(
            (peer: StudentProfile) => peer.type === 'learner' && peer.profile_image_url
          )
        ];
        setAlumni(updatedAlumni);
        const newCompanies = Array.from(
          new Set(
            uniq(
              updatedAlumni
                ?.map((peer: StudentProfile) => peer.current_company.name)
                ?.filter((name: string) => !!name)
            )
          )
        ).sort((a, b) => a.localeCompare(b));
        setCompanies(newCompanies);
        setTotalCount(res.data.total_count);
        setOffset(offset + 50);
      })
      .catch((err) => {
        console.log(err.message || 'Some error occurred!');
      });
  }, 300);

  const applyFilters = useCallback(
    (students: StudentProfile[]) => {
      let filteredStudents: any = students;
      if (selectedCompanies.length > 0) {
        filteredStudents = filteredStudents?.filter((student: any) =>
          selectedCompanies?.includes(student?.current_company?.name)
        );
      }
      return filteredStudents;
    },
    [selectedCompanies]
  );

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

  const handlePeerModal = (peer: any) => {
    modalHandler(peer);
    trackModalEvent('Networking Page - Profile Modal - Modal Opened', peer);
  };

  const showCardView = () =>
    !displayPeers ? (
      <AlumniProfileContainer
        alumnis={applyFilters(alumni)}
        loadMore={getAlumni}
        viewMode="grid"
        hasMore={totalCount > alumni.length}
        modalHandler={handlePeerModal}
      />
    ) : (
      <StudentProfileGrid students={applyFilters(filteredPeers)} modalHandler={handlePeerModal} />
    );

  const showTableView = () =>
    !displayPeers ? (
      <AlumniProfileContainer
        alumnis={applyFilters(alumni)}
        loadMore={getAlumni}
        viewMode="list"
        hasMore={totalCount > alumni.length}
        modalHandler={handlePeerModal}
      />
    ) : (
      <StudentProfileList students={applyFilters(filteredPeers)} modalHandler={handlePeerModal} />
    );

  const renderPeers = () =>
    !displayPeers || peers ? (
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
          heading={displayPeers ? 'Peers' : 'Alumni'}
          links={[]}
        />
        <StudentProfileModal
          modalState={Object.keys(modalState).length > 0}
          modalHandler={modalHandler}
          trackModalEvent={trackModalEvent}
          modalUser={modalState}
          dispalyChatLink={
            modalState.id !== user?.id &&
            cohort_id !== 'e5659779-2c87-43b1-98f7-93d8b7173d61' &&
            displayPeers
          }
          dispalyEmailLink={displayPeers}
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
