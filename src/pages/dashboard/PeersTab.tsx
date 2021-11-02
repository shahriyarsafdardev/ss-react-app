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

// material
import { Container, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
// redux
import StudentProfileFilters from 'components/students/StudentProfileFilters';
import { CohortContext } from 'contexts/CohortContext';
import LoadingScreen from '../../components/LoadingScreen';
import { RootState, useDispatch, useSelector } from '../../redux/store';
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
  const [modalState, modalHandler] = useState<any>({});
  const cohort_id: any = window.location.pathname.split('/')[2] || '';
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [view, setView] = useState('grid');
  const { user } = useAuth();
  const url = new URLSearchParams(useLocation().search);

  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );

  const { peers } = cohort || { peers: [] };

  const createSelectMenu = (items: string) => {
    const newItems: any = peers
      ? peers?.map((peer: any) => peer[items]?.map((item: any) => item))
      : [];
    return Array.from<any>(new Set([].concat(...newItems)));
  };

  useEffect(() => {
    // get all the companies to choose from peers.
    let newCompanies = peers?.map((peer) => peer.current_company.name);
    // make the companies array unique
    newCompanies = Array.from(new Set(newCompanies));
    setCompanies(newCompanies);
    // make select items for strengths
    const Strengths: any = createSelectMenu('strengths');
    setStrengths(Strengths);
    // make select items for interests
    const Interests: any = createSelectMenu('interests');
    setInterests(Interests);
    // remove sort on tab change
    setSelectedCompanies([]);
    setSelectedStrengths([]);
    setSelectedInterests([]);
    const user_id = url.get('user_id');
    if (user_id && peers?.length > 0) {
      const peer = peers.filter((peer) => peer.id === user_id)[0];
      if (peer) {
        modalHandler(peer);
      }
    }
  }, [peers, cohort_id]);

  useEffect(() => {
    sendAmplitudeData(EVENT_TYPES.page_view, {
      page_type: EVENT_TYPES.peers_tab
    });
  }, []);

  const handleChange = (event: any) => {
    const {
      target: { value }
    } = event;

    setSelectedCompanies(value);
  };
  const handleStrengthChange = (event: any) => {
    const {
      target: { value }
    } = event;

    setSelectedStrengths(value);
  };
  const handleInterestChange = (event: any) => {
    const {
      target: { value }
    } = event;

    setSelectedInterests(value);
  };
  useEffect(() => {
    if (cohort && !peers) {
      dispatch(getPeers(cohort_id.toString()));
    }
  }, [dispatch, cohort]);

  useEffect(() => {
    const filtereStudents = applyFilters();
    const filteredInterests = filtereStudents?.map((student: any) => student?.interests)?.flat(1);
    const filterInterestsList: any = filteredInterests?.filter(
      (x: any, i: any, a: any) => a.indexOf(x) === i
    );
    const filteredStrengths = filtereStudents?.map((student: any) => student?.strengths)?.flat(1);
    const filterStrengthsList: any = filteredStrengths?.filter(
      (x: any, i: any, a: any) => a.indexOf(x) === i
    );
    setInterests(filterInterestsList);
    setStrengths(filterStrengthsList);
  }, [selectedCompanies]);

  const applyFilters = useCallback(() => {
    let filteredStudents: any = peers;
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

    if (selectedStrengths.length > 0) {
      filteredStudents = filteredStudents?.filter(
        (student: any) =>
          selectedStrengths?.filter((strength) =>
            student.strengths.find((item: any) => item === strength)
          ).length
      );
    }
    return filteredStudents;
  }, [selectedCompanies, selectedStrengths, selectedInterests, peers]);

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

  return (
    <Page title="ScholarSite | Peers">
      {peers ? (
        <Container maxWidth={themeStretch ? false : 'lg'} style={{ paddingBottom: '50px' }}>
          <HeaderBreadcrumbs id="cohort-tab-title" heading="Peers" links={[]} />
          <StudentProfileModal
            modalState={Object.keys(modalState).length > 0}
            modalHandler={modalHandler}
            modalUser={modalState}
            cohortID={cohort_id}
            dispalyChatLink={
              modalState.id !== user?.id && cohort_id === 'c46fa46a-afe5-4175-adf0-65ba653cf5c8'
            }
          />
          <StudentProfileFilters
            companies={companies}
            selectedCompanies={selectedCompanies}
            strengths={strengths}
            selectedStrengths={selectedStrengths}
            interests={interests}
            selectedInterests={selectedInterests}
            handleCompanyChange={handleChange}
            handleStrengthChange={handleStrengthChange}
            handleInterestChange={handleInterestChange}
            setView={setView}
            view={view}
          />
          {view === 'grid' ? showCardView() : showTableView()}
        </Container>
      ) : (
        <LoadingContainer>
          <LoadingScreen />
        </LoadingContainer>
      )}
    </Page>
  );
}
