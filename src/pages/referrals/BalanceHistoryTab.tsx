import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@material-ui/core';
import moment from 'moment';
import UserListHead from 'components/_dashboard/user/list/UserListHead';
import { useEffect } from 'react';
import { RootState, useDispatch, useSelector } from 'redux/store';
import { getReferralsDetails } from 'redux/slices/referral';
import useAuth from 'hooks/useAuth';
import { ReferralHistory } from '../../@types/referral';
import { getBackgroundColor, getColor } from './Common';

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
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { referrals_details } = useSelector((state: RootState) => state.referral.referral);

  useEffect(() => {
    dispatch(getReferralsDetails(user?.credit_account_id));
  }, []);

  return (
    <>
      <Stack
        spacing={1}
        padding="30px 0px"
        paddingTop="0px !important"
        sx={{ border: '1px solid #E2E8F0', borderRadius: '16px' }}
      >
        <Typography variant="h4" margin="24px">
          Track your balance
        </Typography>
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
              {referrals_details &&
                referrals_details.map((referrals_detail: ReferralHistory, index) => (
                  <BillRow key={index} balanceHistory={referrals_detail} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
}
