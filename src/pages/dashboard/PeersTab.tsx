import { useCallback, useEffect, useState } from 'react';
// utils
import {
  sendAmplitudeData,
  EVENT_TYPES,
  trackPeersPageEvent,
  PEERS_PAGE_EVENTS
} from 'utils/amplitude';
import useAuth from 'hooks/useAuth';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

// material
import { Container, Box, Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
// redux
import StudentProfileFilters from 'components/students/StudentProfileFilters';
import { CohortContext } from 'contexts/CohortContext';
import EmptyNetworkingTab from 'components/cohorts/onboarding/empty-states/EmptyNetworkingTab';
import { ExportToExcel } from 'components/students/Common';
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
  const [analyticsSent, setAnalyticsSent] = useState(false);
  const dispatch = useDispatch();
  const [modalState, modalHandler] = useState<StudentProfile | any>({});
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

  const userObject = {
    id: user?.id,
    slug: user?.displayName,
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    current_company: {
      id: '',
      name: user?.current_company,
      number_of_employees: '',
      logo_url: user?.company_image_url
    },
    current_position: user?.current_position,
    preferred_pronoun: user?.preferred_pronoun,
    linkedin_url: user?.linkedin_url,
    is_managing_team: user?.is_managing_team,
    city: '',
    country: '',
    current_role_category_selections: user?.current_role_category_selections,
    current_industry_category_selections: user?.current_industry_category_selections,
    strengths: user?.strengths,
    interests: user?.interests,
    matchings: [],
    opted_in_for_matching_suggestions: user?.opted_in_for_matching_suggestions,
    networking_matching_preferences: user?.networking_matching_preferences,
    profile_image_url: user?.profile_image_url,
    bio_text: user?.bio_text,
    type: user?.type,
    is_onboarded: true
  };

  const { peers } = cohort || { peers: null };
  let filteredPeers: Array<StudentProfile> = [];

  if (peers) {
    filteredPeers = peers.filter((peer) => {
      if (peer.type === 'learner' && peer.is_onboarded === true) {
        return peer;
      }
      return false;
    });
    filteredPeers = [userObject, ...filteredPeers];
  }

  const createSelectMenu = (items: string) => {
    const newItems: any = filteredPeers
      ? filteredPeers?.map((peer: any) => peer[items]?.map((item: any) => item)).sort()
      : [];
    return Array.from<any>(new Set([].concat(...newItems)));
  };

  useEffect(() => {
    // get all the companies to choose from peers.
    let newCompanies = filteredPeers?.map((peer) => peer.current_company.name);
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
  }, [peers, cohort_id]);

  useEffect(() => {
    if (cohort && !analyticsSent) {
      sendAmplitudeData(EVENT_TYPES.page_view, {
        page_type: EVENT_TYPES.peers_tab,
        [EVENT_TYPES.cohort_name]: cohort?.name,
        [EVENT_TYPES.cohort_intake_number]: cohort?.intake
      });
      setAnalyticsSent(true);
    }
  }, [cohort]);

  const handleChange = (event: any) => {
    const {
      target: { value }
    } = event;

    setSelectedCompanies(value);
  };

  const handleInterestChange = (event: any) => {
    const {
      target: { value }
    } = event;

    setSelectedInterests(value);
  };
  useEffect(() => {
    if (cohort && !peers) {
      dispatch(getPeers(cohort_id.toString(), 'null'));
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

  const trackModalEvent = () =>
    trackPeersPageEvent(
      cohort?.name,
      cohort?.intake,
      `${view} view`.toUpperCase(),
      PEERS_PAGE_EVENTS.modal_open_event
    );

  const showCardView = () => (
    <StudentProfileGrid
      students={applyFilters()}
      modalHandler={(peer: any) => {
        modalHandler(peer);
        trackModalEvent();
      }}
    />
  );

  const showTableView = () => (
    <StudentProfileList
      students={applyFilters()}
      modalHandler={(peer: any) => {
        modalHandler(peer);
        trackModalEvent();
      }}
    />
  );

  const renderPeers = () =>
    peers ? (
      <Container maxWidth={themeStretch ? false : 'lg'} style={{ paddingBottom: '50px' }}>
        <HeaderBreadcrumbs id="cohort-tab-title" heading="Peers" links={[]} />
        <StudentProfileModal
          modalState={Object.keys(modalState).length > 0}
          modalHandler={modalHandler}
          modalUser={modalState}
          cohortID={cohort_id}
          dispalyChatLink={
            modalState.id !== user?.id && cohort_id !== 'e5659779-2c87-43b1-98f7-93d8b7173d61'
          }
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
          />
          {user?.type === 'admin' && mode === 'Instructor' && (
            <ExportToExcel
              students={filteredPeers}
              fileName={`${moment().format()}-${cohort?.name} Students Data`}
            />
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
    <Page title="ScholarSite | Peers">
      {cohort?.released_for_learners === true || mode === 'Instructor' ? (
        renderPeers()
      ) : (
        <EmptyNetworkingTab key={cohort_id} cohortHost={cohort?.host_names} />
      )}
    </Page>
  );
}
