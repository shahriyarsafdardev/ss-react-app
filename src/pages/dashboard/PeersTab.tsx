import { useEffect, useState } from 'react';

// material
import { Container } from '@material-ui/core';

// redux
import StudentProfileFilters from 'components/students/StudentProfileFilters';
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

export default function PeersTab() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [modalState, modalHandler] = useState({});
  const cohort_id: any = window.location.pathname.split('/')[2] || '';
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [view, setView] = useState('card');

  const { peers } = useSelector(
    (state: RootState) => state.cohort.cohorts.filter((cohort) => cohort_id === cohort.id)[0]
  );

  const createSelectMenu = (items: string) => {
    const newItems: any = peers
      ? peers?.map((peer: any) => peer[items]?.map((item: any) => item.name))
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
  }, [peers, cohort_id]);

  const handleChange = (event: any) => {
    const {
      target: { value }
    } = event;
    setSelectedCompanies(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  const handleStrengthChange = (event: any) => {
    const {
      target: { value }
    } = event;
    setSelectedStrengths(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  const handleInterestChange = (event: any) => {
    const {
      target: { value }
    } = event;
    setSelectedInterests(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  useEffect(() => {
    dispatch(getPeers(cohort_id.toString()));
  }, [dispatch, cohort_id]);

  const filtereStudents = peers?.filter(
    (peer: any) =>
      selectedCompanies?.includes(peer.current_company?.name) ||
      selectedInterests?.filter((interest) =>
        peer.interests.find((item: any) => item.name === interest)
      ).length ||
      selectedStrengths?.filter((strength) =>
        peer.strengths.find((item: any) => item.name === strength)
      ).length
  );
  const showCardView = () => (
    <StudentProfileGrid
      students={filtereStudents?.length ? filtereStudents : peers}
      modalHandler={modalHandler}
    />
  );

  const showTableView = () => (
    <StudentProfileList
      students={filtereStudents?.length ? filtereStudents : peers}
      modalHandler={modalHandler}
    />
  );

  return (
    <Page title="Peers | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs id="cohort-tab-title" heading="Peers" links={[]} />
        <StudentProfileModal
          modalState={Object.keys(modalState).length > 0}
          modalHandler={modalHandler}
          modalUser={modalState}
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
        {view === 'card' ? showCardView() : showTableView()}
      </Container>
    </Page>
  );
}
