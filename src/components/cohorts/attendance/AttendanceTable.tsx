import { useEffect, useState } from 'react';

import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  TableContainer,
  TextField
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

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
    return <img style={{ margin: 'auto' }} src="/static/icons/attended-live.svg" alt="icon" />;
  }
  if (status === AttendanceType.recorded) {
    return <img style={{ margin: 'auto' }} src="/static/icons/attended-recording.svg" alt="icon" />;
  }
  if (status === AttendanceType.none) {
    return <img style={{ margin: 'auto' }} src="/static/icons/not-attended.svg" alt="icon" />;
  }
  return null;
};

const AttendanceTable = ({ attendance }: { attendance: CohortAttendanceRecord }) => {
  const [rows, setRows] = useState<SessionAttendanceRecord[]>(attendance.sessionAttendanceRecords);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setRows(attendance.sessionAttendanceRecords);
  }, [[...attendance.sessionAttendanceRecords]]);

  const handleSearch = (searchVal: string) => {
    setSearch(searchVal);
    const searchedRows = rows.filter(
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
      <TableContainer sx={{ minWidth: 720 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>Participant</TableCell>
              {[...Array(attendance.totalSessions)].map((x, i) => (
                <TableCell align="center" key={i}>
                  Session {i + 1}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: SessionAttendanceRecord) => (
              <TableRow key={row.user_id}>
                <TableCell colSpan={3}>{`${row.name} ${row.position}`}</TableCell>
                {[...Array(attendance.totalSessions)].map((x, i) => (
                  <TableCell key={`data-${i + 1}`}>{getIcon(row.attendanceData[i])}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledContainer>
  );
};

export default AttendanceTable;
