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

  const { peers } = useSelector(
    (state: RootState) => state.cohort.cohorts.filter((cohort) => cohort_id === cohort.id)[0]
  );
  useEffect(() => {
    // get all the companies to choose from peers.
    let newCompanies = peers?.map((peer) => peer.current_company.name);
    // make the companies array unique
    newCompanies = Array.from(new Set(newCompanies));
    setCompanies(newCompanies);
    // remove sort on tab change
    setSelectedCompanies([]);
  }, [peers, cohort_id]);
  console.log(selectedCompanies);
  const handleChange = (event: any) => {
    const {
      target: { value }
    } = event;
    setSelectedCompanies(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  useEffect(() => {
    dispatch(getPeers(cohort_id.toString()));
  }, [dispatch, cohort_id]);
  const filtereStudents = peers?.filter((peer: any) =>
    selectedCompanies.includes(peer.current_company?.name)
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
        <HeaderBreadcrumbs heading="Peers Tab" links={[]} />

        <ViewSelector>
          <FormControl>
            <Select label="Category" native onChange={(e: any) => setView(e.target.value)}>
              <option value="card">Grid View</option>
              <option value="list">Table View</option>
            </Select>
          </FormControl>
          <FormControl sx={{ marginLeft: 1, width: 300 }}>
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
