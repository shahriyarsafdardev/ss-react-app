import { useEffect, useState, useMemo } from 'react';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import { useDispatch, RootState, useSelector } from 'redux/store';
import { initializeAlumnies } from 'redux/slices/adminRegistrations';
import { Alumni } from '../../@types/cohorts';
import { AlumniFooter } from '../../components/cohorts/registrations/Common';
import AlumniList from '../../components/cohorts/alumni/AlumniList';
import AlumniHeader from './AlumniHeader';
import { LoadingContainer, AlumniContainer } from './Common';

export default function AlumniTab() {
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const alumnies = useSelector((state: RootState) => state.adminRegistrations.alumnies);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!alumnies.length) {
      dispatch(initializeAlumnies()).then((res) => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  const filteredRows = useMemo(() => {
    const searchedRows = alumnies
      .filter((item: Alumni) => item.paid_cohorts.length > 0)
      .filter(
        (item: Alumni) =>
          (item.full_name || '').toLowerCase().includes(search.toLowerCase()) ||
          (item.company_name || '').toLowerCase().includes(search.toLowerCase()) ||
          (item.notes || '').toLowerCase().includes(search.toLowerCase())
      );
    return searchedRows;
  }, [alumnies]);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }
  return (
    <Page title="Sphere | Alumni">
      <AlumniContainer>
        <AlumniHeader alumnies={alumnies} updateSearch={setSearch} search={search} />
        <AlumniList alumnies={filteredRows.slice(0, limit)} />
        {limit !== filteredRows.length && (
          <AlumniFooter handleClick={() => setLimit(filteredRows.length)} />
        )}
      </AlumniContainer>
    </Page>
  );
}
