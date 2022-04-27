import React from 'react';
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
import EmptyAttendanceTab from '../onboarding/empty-states/EmptyAttendanceTab';

const StyledContainer = styled(Card)(() => ({
  minHeight: '500px',
  width: '100%'
}));

const displayData = true;

function AnalyticsTable() {
  return (
    <StyledContainer>
      {displayData ? (
        <TableContainer sx={{ minWidth: 720, paddingTop: '10px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Source</TableCell>
                <TableCell>Number of page views</TableCell>
                <TableCell>Average Engagement</TableCell>
                <TableCell>No. registrations</TableCell>
                <TableCell>No. paid</TableCell>
              </TableRow>
            </TableHead>
            <TableBody />
          </Table>
        </TableContainer>
      ) : (
        <EmptyAttendanceTab imageLink="/static/cohort-empty-states/empty-list.svg" />
      )}
    </StyledContainer>
  );
}

export default AnalyticsTable;
