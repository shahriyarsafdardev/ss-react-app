import { Box, CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'utils/axios';
import { StudentProfile } from '../../@types/cohorts';
import AlumniProfileContainer from './AlumniProfileContainer';

export const Loader = () => (
  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
    <CircularProgress />
  </Box>
);

export default function AlumniData({
  viewMode,
  modalHandler,
  setCompanies
}: {
  viewMode: string;
  modalHandler: Function;
  setCompanies: Function;
}) {
  const [offset, setOffset] = useState(0);
  const [alumnis, setAlumnis] = useState<StudentProfile[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    getPeers(offset);
  }, []);

  const getPeers = async (offset: number) => {
    await axios
      .get(`/cohorts/peers_in_batches.json?offset=${offset}`)
      .then((res) => {
        const updatedAlumni = [...alumnis, ...res.data.alumnis];
        setAlumnis(updatedAlumni);
        let newCompanies = updatedAlumni
          ?.map((peer) => peer.current_company.name)
          ?.filter((name) => !!name);
        newCompanies = Array.from(new Set(newCompanies)).sort((a, b) => a.localeCompare(b));
        setCompanies(newCompanies);
        setTotalCount(res.data.total_count);
        setOffset(offset + 50);
      })
      .catch((err) => {
        console.log(err.message || 'Some error occurred!');
      });
  };

  const loadMore = () => {
    getPeers(offset);
  };

  return (
    <AlumniProfileContainer
      alumnis={alumnis}
      loadMore={loadMore}
      viewMode={viewMode}
      hasMore={totalCount > alumnis.length}
      modalHandler={modalHandler}
    />
  );
}
