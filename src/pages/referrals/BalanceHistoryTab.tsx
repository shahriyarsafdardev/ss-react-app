import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@material-ui/core';
import moment from 'moment';
import UserListHead from 'components/_dashboard/user/list/UserListHead';
import { ReferralHistory } from '../../@types/referral';
import { getBackgroundColor, getColor } from './Common';

const HISTORIES = [
  {
    date: new Date(),
    status: 'Credit received',
    description: 'Description#1'
  },
  {
    date: new Date(),
    status: 'Enrolled',
    description: 'Description#2'
  },
  {
    date: new Date(),
    status: 'Invited',
    description: 'Description#3'
  },
  {
    date: new Date(),
    status: 'Redeemed',
    description: 'Description#4'
  }
];

const BillRow = ({ key, balanceHistory }: { key: number; balanceHistory: ReferralHistory }) => (
  <TableRow hover key={key} tabIndex={-1}>
    <TableCell style={{ width: '15%' }} align="left">
      {moment(new Date(balanceHistory?.date)).format('ll').toString()}
    </TableCell>
    <TableCell style={{ width: '20%' }}>
      <Box
        sx={{
          backgroundColor: getBackgroundColor(balanceHistory.status),
          color: getColor(balanceHistory.status),
          width: 'fit-content',
          padding: '2px 5px',
          borderRadius: '6px',
          fontWeight: 'bold'
        }}
      >
        {balanceHistory.status}
      </Box>
    </TableCell>
    <TableCell style={{ width: '65%' }}>{balanceHistory.description}</TableCell>
  </TableRow>
);

export default function BalanceHistoryTab() {
  const TABLE_HEAD = [
    { id: 'date', label: 'Date' },
    { id: 'status', label: 'Status' },
    { id: 'description', label: 'Description' }
  ];

  return (
    <>
      <Stack
        spacing={1}
        padding="30px 0px"
        sx={{ border: '1px solid #E2E8F0', borderRadius: '16px' }}
      >
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table>
            <UserListHead
              order="asc"
              orderBy="date"
              headLabel={TABLE_HEAD}
              rowCount={3}
              numSelected={0}
              onRequestSort={() => {}}
            />
            <TableBody id="sales-list-container" data-test-id="billing-history-table">
              {HISTORIES &&
                HISTORIES.map((balanceHistory: ReferralHistory, index) => (
                  <BillRow key={index} balanceHistory={balanceHistory} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
}
