import { useEffect, useState } from 'react';
import EmptyAttendanceTab from 'components/cohorts/onboarding/empty-states/EmptyAttendanceTab';

import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  TableContainer,
  TextField,
  Tooltip,
  Stack
} from '@material-ui/core';

import { styled } from '@material-ui/core/styles';

import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import useAuth from 'hooks/useAuth';
import moment from 'moment';
import { ExportAttendanceToExcel } from '../registrations/Common';
import {
  CohortAttendanceRecord,
  AttendanceType,
  SessionAttendanceRecord
} from '../../../@types/cohorts';
// ----------------------------------------------------------

const StyledContainer = styled(Card)(() => ({
  minHeight: '500px'
}));

const getIcon = (status: any) => {
  if (status === AttendanceType.live) {
    return (
      <Tooltip arrow placement="top" title="Attended Live">
        <img style={{ margin: 'auto' }} src="/static/icons/attended-live.svg" alt="icon" />
      </Tooltip>
    );
  }
  if (status === AttendanceType.recorded) {
    return (
      <Tooltip arrow placement="top" title="Watched Recording">
        <img style={{ margin: 'auto' }} src="/static/icons/attended-recording.svg" alt="icon" />
      </Tooltip>
    );
  }
  if (status === AttendanceType.none) {
    return (
      <Tooltip arrow placement="top" title="Not Attended">
        <img style={{ margin: 'auto' }} src="/static/icons/not-attended.svg" alt="icon" />
      </Tooltip>
    );
  }
  return null;
};

const AttendanceTable = ({
  attendance,
  displayData
}: {
  attendance: CohortAttendanceRecord;
  displayData: boolean;
}) => {
  const [rows, setRows] = useState<SessionAttendanceRecord[]>([]);
  const [search, setSearch] = useState('');
  const { user } = useAuth();
  const { mode } = useSelector((state: RootState) => state.instructorView);
  const cohort_id: any = window.location.pathname.split('/')[2] || '';

  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );

  useEffect(() => {
    setRows(attendance.sessionAttendanceRecords);
  }, [attendance]);

  const handleSearch = (searchVal: string) => {
    setSearch(searchVal);
    const searchedRows = attendance.sessionAttendanceRecords.filter(
      (item: SessionAttendanceRecord) =>
        item.name.toLowerCase().includes(searchVal.toLowerCase()) ||
        item.position.toLowerCase().includes(searchVal.toLowerCase())
    );

    setRows(searchedRows);
  };

  return (
    <StyledContainer>
      <CardHeader
        action={
          <TextField
            InputProps={{
              startAdornment: <img src="/static/icons/search-icon.svg" alt="icon" />
            }}
            placeholder="Search"
            fullWidth
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        }
        title="Participant Overview"
        sx={{ mb: 3 }}
      />
      <Stack
        width="100%"
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="flex-end"
        alignItems="center"
        paddingRight="18px"
        marginBottom="24px"
      >
        {user?.type === 'admin' && mode === 'Instructor' && (
          <ExportAttendanceToExcel
            attendance={attendance}
            fileName={`${moment().format()}-${cohort?.name} Students Data`}
          />
        )}
      </Stack>
      {displayData ? (
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={3}>Participant</TableCell>
                {[...Array(attendance.totalSessions)].map((x, i) => (
                  <TableCell data-testid={`Session-${i + 1}`} align="center" key={i}>
                    Session {i + 1}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: SessionAttendanceRecord) => (
                <TableRow hover key={row.user_id}>
                  <TableCell
                    data-testid={`user-name-${row.name}`}
                    colSpan={3}
                  >{`${row.name} ${row.position}`}</TableCell>
                  {[...Array(attendance.totalSessions)].map((x, i) => (
                    <TableCell data-testid={`Session-${i + 1}-attendance`} key={`data-${i + 1}`}>
                      {getIcon(row.attendanceData[i])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <EmptyAttendanceTab imageLink="/static/cohort-empty-states/empty-list.svg" />
      )}
    </StyledContainer>
  );
};

export default AttendanceTable;
