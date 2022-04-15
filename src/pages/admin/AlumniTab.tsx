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
  const aluminies = useSelector((state: RootState) => state.adminRegistrations.alumnies);
  const [loading, setLoading] = useState(true);
  const fileName = `${moment().format()}-Alumni Data`;
  const [rows, setRows] = useState<Alumni[]>(aluminies);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (rows.length === 0) {
      dispatch(initializeAlumnies()).then((res) => setLoading(false));
      setRows(aluminies);
    }
  }, [aluminies]);

  const handleSearch = (searchVal: string) => {
    setSearch(searchVal);
    const searchedRows = aluminies.filter(
      (item: Alumni) =>
        (item.full_name || '').toLowerCase().includes(searchVal.toLowerCase()) ||
        (item.company_name || '').toLowerCase().includes(searchVal.toLowerCase()) ||
        (item.notes || '').toLowerCase().includes(searchVal.toLowerCase())
    );
    setRows(searchedRows);
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
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          width="-webkit-fill-available"
          sx={{ mx: 2, mb: 2 }}
        >
          <Typography variant="h5">Alumni List</Typography>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <ExportAlumniToExcel aluminies={aluminies} fileName={fileName} />
            <TextField
              InputProps={{
                startAdornment: <img src="/static/icons/search-icon.svg" alt="icon" />
              }}
              placeholder="Search"
              value={search}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
          </Stack>
        </Stack>
        <AlumniList aluminies={rows.slice(0, limit)} />
        {limit !== rows.length && <AlumniFooter handleClick={() => setLimit(rows.length)} />}
      </AlumniContainer>
    </Page>
  );
}
