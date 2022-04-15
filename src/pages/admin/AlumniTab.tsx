import { useEffect, useState } from 'react';
import { Box, TextField, Stack, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import { useDispatch, RootState, useSelector } from 'redux/store';
import { initializeAlumnies } from 'redux/slices/adminRegistrations';
import moment from 'moment';
import { Alumni } from '../../@types/cohorts';
import { AlumniFooter, ExportAlumniToExcel } from '../../components/cohorts/registrations/Common';
import AlumniList from '../../components/cohorts/alumni/AlumniList';
import AlumniHeader from './AlumniHeader';

const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));

const AlumniContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  margin: '0 1rem 1rem 1rem',
  padding: '1rem 0',
  background: 'white',
  borderRadius: '10px',
  boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px, rgb(145 158 171 / 24%) 0px 16px 32px -4px'
}));

export default function AlumniTab() {
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const alumnies = useSelector((state: RootState) => state.adminRegistrations.alumnies);
  const [loading, setLoading] = useState(true);
  const fileName = `${moment().format()}-Alumni Data`;
  const [rows, setRows] = useState<Alumni[]>(alumnies);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(initializeAlumnies()).then((res) => setLoading(false));
  }, [dispatch]);

  const filteredRows = () => {
    const searchedRows = alumnies.filter(
      (item: Alumni) =>
        (item.full_name || '').toLowerCase().includes(search.toLowerCase()) ||
        (item.company_name || '').toLowerCase().includes(search.toLowerCase()) ||
        (item.notes || '').toLowerCase().includes(search.toLowerCase())
    );
    return searchedRows;
  };

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }
  return (
    <Page title="ScholarSite | Alumni">
      <AlumniContainer>
        <AlumniHeader alumnies={alumnies} updateSearch={setSearch} search={search} />
        <AlumniList alumnies={filteredRows().slice(0, limit)} />
        {limit !== filteredRows().length && (
          <AlumniFooter handleClick={() => setLimit(filteredRows().length)} />
        )}
      </AlumniContainer>
    </Page>
  );
}
