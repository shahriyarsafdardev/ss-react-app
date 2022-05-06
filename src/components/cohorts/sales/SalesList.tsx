// material
import { Table, TableBody, TableContainer } from '@material-ui/core';
import Scrollbar from 'components/Scrollbar';
import { CohortSale } from '../../../@types/cohorts';
import { UserListHead } from '../../_dashboard/user/list';
import SalesRow from './SalesRow';

const TABLE_HEAD = [
  { id: 'code', label: 'Cohort Code' },
  { id: 'start_DATE', label: 'Start Date', align: 'center' },
  { id: 'seats_sold', label: 'Seats Sold', align: 'center' },
  { id: 'revenue', label: 'Revenue', align: 'center' },
  { id: 'seats_sold_week', label: 'Seats Sold (Last week)', align: 'center' },
  { id: 'revenue_week', label: 'Revenue (Last Week)', align: 'center' }
];

export default function SalesList({ cohortSales }: { cohortSales: CohortSale[] }) {
  return (
    <div style={{ width: '-webkit-fill-available' }}>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order="asc"
              orderBy="time"
              headLabel={TABLE_HEAD}
              rowCount={cohortSales.length}
              numSelected={0}
              onRequestSort={() => {}}
            />
            <TableBody id="sales-list-container" data-testid="sales-list">
              {cohortSales.map((sale: any, index) => (
                <SalesRow key={sale.id} cohortSale={sale} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </div>
  );
}
