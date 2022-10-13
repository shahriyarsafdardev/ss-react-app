import {
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@material-ui/core';
import UserListHead from 'components/_dashboard/user/list/UserListHead';
import { StyledHeading } from './Common';

export type BillHistory = {
  date: string;
  description: string;
  amount: number;
  invoice: string;
};

const BillRow = ({ key, billHistory }: { key: number; billHistory: BillHistory }) => (
  <TableRow hover key={key} tabIndex={-1} sx={{ borderBottom: '1px solid #E5E8EB' }}>
    <TableCell style={{ width: 100 }} align="left">
      {billHistory.date}
    </TableCell>
    <TableCell style={{ width: 100 }} align="center">
      {billHistory.description}
    </TableCell>
    <TableCell style={{ width: 100 }} align="center">
      {billHistory.amount}
    </TableCell>
    <TableCell style={{ width: 100 }} align="center">
      <Link href={billHistory.invoice} color="#4D4DCD">
        Download
      </Link>
    </TableCell>
  </TableRow>
);

export default function PaymentHistory() {
  const TABLE_HEAD = [
    { id: 'date', label: 'Date' },
    { id: 'description', label: 'Description', align: 'center' },
    { id: 'amount', label: 'Amount', align: 'center' },
    { id: 'invoice', label: 'Invoice', align: 'center' }
  ];

  const TABLE_CONTENT = [
    {
      date: '20/01/2003',
      description: 'This is description',
      amount: 2400
    },
    {
      date: '10/01/2004',
      description: 'This is description',
      amount: 2400
    },
    {
      date: '10/01/2001',
      description: 'This is description',
      amount: 2400
    }
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
              rowCount={TABLE_CONTENT.length}
              numSelected={0}
              onRequestSort={() => {}}
            />
            <TableBody id="sales-list-container" data-test-id="billing-history-table">
              {TABLE_CONTENT.map((billHistory: any, index) => (
                <BillRow key={index} billHistory={billHistory} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
}
