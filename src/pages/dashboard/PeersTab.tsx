import { useEffect, useState } from 'react';

// material
import {
  Container,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  MenuItem,
  ListItemText,
  OutlinedInput
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

// redux
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

const ViewSelector = styled('div')(() => ({
  paddingBottom: '40px'
}));

export default function PeersTab() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [modalState, modalHandler] = useState({});
  const cohort_id: any = window.location.pathname.split('/')[2] || '';
  const [view, setView] = useState('card');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

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
        <HeaderBreadcrumbs heading="Peers" links={[]} />

        <ViewSelector>
          <FormControl>
            <Select label="Category" native onChange={(e: any) => setView(e.target.value)}>
              <option value="card">Grid View</option>
              <option value="list">Table View</option>
            </Select>
          </FormControl>
          <FormControl sx={{ marginLeft: 1, width: 110 }}>
            <InputLabel id="multiple-checkbox-label">Company</InputLabel>
            <Select
              labelId="multiple-checkbox-label"
              id="multiple-checkbox"
              multiple
              value={selectedCompanies}
              onChange={handleChange}
              input={<OutlinedInput label="company" />}
              renderValue={(selected) => selected.join(', ')}
              // MenuProps={MenuProps}
            >
              {companies?.map((name: any) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={selectedCompanies.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ marginLeft: 1, width: 110 }}>
            <InputLabel id="multiple-checkbox-label">Strength</InputLabel>
            <Select
              labelId="strength-label"
              id="multiple-checkbox-strength"
              multiple
              value={selectedStrengths}
              onChange={handleStrengthChange}
              input={<OutlinedInput label="strength" />}
              renderValue={(selected) => selected.join(', ')}
              // MenuProps={MenuProps}
            >
              {strengths?.map((name: any) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={selectedStrengths.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ marginLeft: 1, width: 100 }}>
            <InputLabel id="multiple-checkbox-label">Interest</InputLabel>
            <Select
              labelId="interest-label"
              id="multiple-checkbox-interest"
              multiple
              value={selectedInterests}
              onChange={handleInterestChange}
              input={<OutlinedInput label="interest" />}
              renderValue={(selected) => selected.join(', ')}
              // MenuProps={MenuProps}
            >
              {interests?.map((name: any) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={selectedInterests.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ViewSelector>

        <StudentProfileModal
          modalState={Object.keys(modalState).length > 0}
          modalHandler={modalHandler}
          modalUser={modalState}
        />

        {view === 'card' ? showCardView() : showTableView()}
      </Container>
    </Page>
  );
}
