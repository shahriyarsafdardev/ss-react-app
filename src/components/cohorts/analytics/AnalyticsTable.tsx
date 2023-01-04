import { memo } from 'react';
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import EmptyAttendanceTab from '../onboarding/empty-states/EmptyAttendanceTab';

const StyledContainer = styled(Card)(({ theme }) => ({
  minHeight: '100%',
  width: '100%',
  paddingTop: '20px',
  [theme.breakpoints.down('sm')]: {
    overflow: 'scroll'
  }
}));

function AnalyticsTable({ rows }: { rows: any }) {
  return (
    <StyledContainer>
      {rows.length > 0 ? (
        <TableContainer sx={{ minWidth: 720 }}>
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
            <TableBody>
              {rows.map((row: any) => {
                const {
                  source,
                  no_of_pages_views,
                  avg_engagement,
                  no_of_registerations,
                  no_of_paid
                } = row;

                return (
                  <TableRow hover key={source}>
                    <TableCell align="left">{source}</TableCell>
                    <TableCell align="left">{no_of_pages_views}</TableCell>
                    <TableCell align="left">{avg_engagement}</TableCell>
                    <TableCell align="left">{no_of_registerations}</TableCell>
                    <TableCell align="left">{no_of_paid}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <EmptyAttendanceTab imageLink="/static/cohort-empty-states/empty-list.svg" />
      )}
    </StyledContainer>
  );
}

export default memo(AnalyticsTable);
