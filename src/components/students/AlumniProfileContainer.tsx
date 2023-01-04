import { memo, useState } from 'react';
// material
import { Grid, Table, Box, CircularProgress, TableBody, TableContainer } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { UserListHead } from '../_dashboard/user/list';
import { StudentProfile } from '../../@types/cohorts';
import StudentProfileRow from './StudentProfileRow';
import StudentProfileCard from './StudentProfileCard';

const Loader = () => (
  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
    <CircularProgress />
  </Box>
);
const TABLE_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'company', label: 'Company' },
  { id: 'currentRole', label: 'Current Role' },
  { id: 'goodAt', label: 'What I am good at' },
  { id: 'lookingFor', label: 'What I am looking for' }
];

const AlumniProfileContainer = ({
  alumnis,
  loadMore,
  hasMore,
  modalHandler,
  viewMode
}: {
  alumnis: StudentProfile[];
  loadMore: any;
  viewMode: string;
  hasMore: boolean;
  modalHandler: Function;
}) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState('name');

  const [selected, setSelected] = useState<string[]>([]);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const newSelected = alumnis.map((alumni) => alumni.first_name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  return (
    <InfiniteScroll
      next={loadMore}
      hasMore={hasMore}
      dataLength={alumnis.length}
      loader={<Loader />}
      style={{ overflow: 'unset' }}
    >
      {/* <Scrollbar> */}
      {viewMode === 'list' && (
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={alumnis.length}
              numSelected={0}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody id="alumni-list-container" data-testid="alumnis-list">
              {alumnis.map((alumni: any, index) => (
                <StudentProfileRow
                  key={alumni.id}
                  row={alumni}
                  index={alumni}
                  modalHandler={modalHandler}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {viewMode === 'grid' && (
        <Grid container spacing={3} id="alumni-grid-container" data-testid="alumni-grid">
          {alumnis?.map((alumni) => (
            <Grid
              data-testid={`peer-card-${alumni?.peer_id}`}
              key={alumni?.peer_id}
              item
              xs={12}
              sm={4}
              md={3}
            >
              <StudentProfileCard peer={alumni} modalHandler={modalHandler} />
            </Grid>
          ))}
        </Grid>
      )}
      {/* </Scrollbar> */}
    </InfiniteScroll>
  );
};

export default memo(AlumniProfileContainer);
