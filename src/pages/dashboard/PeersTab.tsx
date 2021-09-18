import { useEffect, useState } from 'react';

// material
import { Container, Select, InputLabel, FormControl } from '@material-ui/core';
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

  const { peers } = useSelector((state: RootState) => state.cohort.cohorts[0]);

  useEffect(() => {
    dispatch(getPeers(cohort_id.toString()));
  }, [dispatch]);

  const showCardView = () => <StudentProfileGrid students={peers} modalHandler={modalHandler} />;

  const showTableView = () => <StudentProfileList students={peers} modalHandler={modalHandler} />;

  return (
    <Page title="Peers | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="Peers Tab" links={[]} />

        <ViewSelector>
          <FormControl>
            <InputLabel>View</InputLabel>
            <Select label="Category" native onChange={(e: any) => setView(e.target.value)}>
              <option value="card">Card</option>
              <option value="list">List</option>
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
