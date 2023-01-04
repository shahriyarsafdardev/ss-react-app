import {
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@material-ui/core';
import moment from 'moment';
import UserListHead from 'components/_dashboard/user/list/UserListHead';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { memo, useContext } from 'react';
import { BillHistory } from '../../../@types/cohorts';
import { StyledHeading } from './Common';

const BillRow = ({ key, billHistory }: { key: number; billHistory: BillHistory }) => {
  const { sendAnalyticsData } = useContext(AnalyticsContext);
  return (
    <TableRow hover key={key} tabIndex={-1} sx={{ borderBottom: '1px solid #E5E8EB' }}>
      <TableCell style={{ width: 100 }} align="left">
        {moment(new Date(billHistory?.date)).format('ll').toString()}
      </TableCell>
      <TableCell style={{ width: 100 }} align="center">
        {billHistory.description}
      </TableCell>
      <TableCell style={{ width: 100 }} align="center">
        ${billHistory.amount}
      </TableCell>
      <TableCell style={{ width: 100 }} align="center">
        <Link
          href={billHistory.invoice}
          style={{ color: '#101658 !importent', textDecoration: 'underline', cursor: 'pointer' }}
          onClick={() =>
            sendAnalyticsData('Balance Page - Subscription Tab - Invoice downloaded', {
              'Billing Date': billHistory?.date,
              'Billing Description': billHistory?.description,
              'Billing Amount': billHistory?.amount
            })
          }
        >
          Download
        </Link>
      </TableCell>
    </TableRow>
  );
};

function PaymentHistory({ transactions }: { transactions: BillHistory[] }) {
  const TABLE_HEAD = [
    { id: 'date', label: 'Date' },
    { id: 'description', label: 'Description', align: 'center' },
    { id: 'amount', label: 'Amount', align: 'center' },
    { id: 'invoice', label: 'Invoice', align: 'center' }
  ];

  return (
    <>
      <Stack spacing={1} padding="30px 0px">
        <StyledHeading>Billing History</StyledHeading>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table>
            <UserListHead
              order="asc"
              orderBy="date"
              headLabel={TABLE_HEAD}
              rowCount={transactions.length}
              numSelected={0}
              onRequestSort={() => {}}
            />
            <TableBody id="sales-list-container" data-test-id="billing-history-table">
              {transactions &&
                transactions.map((billHistory: BillHistory, index) => (
                  <BillRow key={index} billHistory={billHistory} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
}

export default memo(PaymentHistory);
