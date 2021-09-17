import { useEffect, useState } from 'react';
import { filter } from 'lodash';
// material
import {
  Table,
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Grid,
  Skeleton,
  Box
} from '@material-ui/core';
import { sentenceCase } from 'change-case';
import { styled } from '@material-ui/core/styles';
// modal
import { Modal } from 'components/animate';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { getUsers } from '../../redux/slices/user';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import { PeerCard } from '../../components/_dashboard/cohort/cards';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../components/_dashboard/user/list';

import { getPeers } from '../../redux/slices/cohort';

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <>
    {[...Array(8)].map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '115%', borderRadius: 2 }} />
      </Grid>
    ))}
  </>
);

const StyledContainer = styled(Box)(() => ({
  backgroundColor: '#fff',
  boxShadow:
    '0px 0px 4.60729px rgba(145, 158, 171, 0.24), 0px 36.8583px 73.7167px -9.21459px rgba(145, 158, 171, 0.24)',
  borderRadius: 20,
  padding: '20px 30px',
  marginBottom: 16
}));

const StyledRow = styled(Box)(() => ({
  display: 'flex',
  marginBottom: 20
}));

const Title = styled(Typography)(() => ({
  fontFamily: 'Public Sans',
  fontWeight: 'bold',
  fontSize: 22,
  color: '#212B36',
  marginBottom: 30
}));

const Text = styled(Typography)(() => ({
  fontFamily: 'Public Sans',
  color: '#212B36',
  fontSize: 12,
  whiteSpace: 'nowrap'
}));
const TagsContainer = styled(Box)(() => ({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  flexWrap: 'wrap'
}));
const ColoredText = styled(Box)((props: any) => ({
  display: 'flex',
  fontFamily: 'Public Sans',
  fontWeight: 'bold',
  color: props.color,
  backgroundColor: props.backgroundColor,
  borderRadius: 10,
  padding: '3px 10px',
  marginRight: 10,
  whiteSpace: 'nowrap',
  marginBottom: 10
}));

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

type Anonymous = Record<string | number, string>;

function descendingComparator(a: Anonymous, b: Anonymous, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: string, orderBy: string) {
  return order === 'desc'
    ? (a: Anonymous, b: Anonymous) => descendingComparator(a, b, orderBy)
    : (a: Anonymous, b: Anonymous) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array: any, comparator: (a: any, b: any) => number, query: string) {
  const stabilizedThis = array.map((el: any, index: number) => [el, index] as const);
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user: any) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el: any) => el[0]);
}

export default function UserCards() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.user);
  const { peers } = useSelector((state: RootState) => state.cohort);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;
  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);
  const toggleModal = () => setOpenModal(!openModal);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPeers('cohort-1'));
  }, [dispatch]);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  return (
    <Page title="Peers | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="Peers Tab" links={[]} />
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid key={user.id} item xs={12} sm={6} md={4}>
              <PeerCard user={user} openModal={toggleModal} />
            </Grid>
          ))}

          {!users.length && SkeletonLoad}
          <Modal open={openModal} onClose={toggleModal}>
            <StyledContainer>
              <Title>Information</Title>
              <StyledRow>
                <img
                  alt="sketch icon"
                  src="/static/peers/job.svg"
                  width={20}
                  height={20}
                  style={{ marginRight: 15 }}
                />
                <Text>Adobe</Text>
              </StyledRow>
              <StyledRow>
                <img
                  alt="sketch icon"
                  src="/static/peers/mail.svg"
                  width={20}
                  height={20}
                  style={{ marginRight: 15 }}
                />
                <Text>nihalhakim@gmail.com</Text>
              </StyledRow>
              <StyledRow>
                <img
                  alt="sketch icon"
                  src="/static/peers/done_all.svg"
                  width={20}
                  height={20}
                  style={{ marginRight: 15 }}
                />
                <Text style={{ marginRight: 10 }}>What I am looking for</Text>
                <TagsContainer>
                  <ColoredText color="#229A16" backgroundColor="rgba(84, 214, 44, 0.16)">
                    mentor
                  </ColoredText>
                  <ColoredText color="#1890FF" backgroundColor="rgba(24, 144, 255, 0.16)">
                    Networking
                  </ColoredText>
                  <ColoredText color="#B78103" backgroundColor="rgba(255, 193, 7, 0.16)">
                    Discuss Materials
                  </ColoredText>
                </TagsContainer>
              </StyledRow>
              <StyledRow>
                <img
                  alt="sketch icon"
                  src="/static/peers/star.svg"
                  width={20}
                  height={20}
                  style={{ marginRight: 15 }}
                />
                <Text style={{ marginRight: 10 }}>What I am good at</Text>
                <TagsContainer>
                  <ColoredText color="#229A16" backgroundColor="rgba(84, 214, 44, 0.16)">
                    Marketing
                  </ColoredText>
                  <ColoredText color="#1890FF" backgroundColor="rgba(24, 144, 255, 0.16)">
                    Content Recommendation System
                  </ColoredText>
                  <ColoredText color="#FF4842" backgroundColor="rgba(255, 72, 66, 0.16)">
                    Personalization
                  </ColoredText>
                  <ColoredText color="#637381" backgroundColor="#C4CDD5">
                    User tracking
                  </ColoredText>
                </TagsContainer>
              </StyledRow>
            </StyledContainer>
            <StyledContainer>
              <Title>Social</Title>
              <StyledRow>
                <img
                  alt="sketch icon"
                  src="/static/peers/discord.svg"
                  width={20}
                  height={20}
                  style={{ marginRight: 15 }}
                />
                <Text>Message Nihal on Discord here</Text>
              </StyledRow>
              <StyledRow>
                <img
                  alt="sketch icon"
                  src="/static/peers/linkedin.svg"
                  width={20}
                  height={20}
                  style={{ marginRight: 15 }}
                />
                <Text>Connect with Nihal on LinkedIn Here</Text>
              </StyledRow>
            </StyledContainer>
          </Modal>
        </Grid>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => {
                    const { id, name, role, status, company, avatarUrl, isVerified } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onClick={() => handleClick(name)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{company}</TableCell>
                        <TableCell align="left">{role}</TableCell>
                        <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, page) => setPage(page)}
          onRowsPerPageChange={(e) => handleChangeRowsPerPage}
        />
      </Container>
    </Page>
  );
}
