// material
import { Table, TableBody, TableContainer } from '@material-ui/core';

import Scrollbar from 'components/Scrollbar';
import { Enrollment } from '../../../@types/cohorts';
import { UserListHead } from '../../_dashboard/user/list';
import RegistrationRow from './RegistrationRow';

type StudentProfileListProps = {
  enrollments: Enrollment[];
};

const TABLE_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'time', label: 'Sign Up Date', align: 'center' },
  { id: 'price', label: 'Price', align: 'center' },
  { id: 'status', label: 'Status', align: 'center' },
  { id: 'tags', label: 'Tags', align: 'center' },
  { id: 'actions', label: 'Actions', align: 'center' }
];

export default function RegistrationsList({ enrollments }: StudentProfileListProps) {
  return (
    <div style={{ width: '-webkit-fill-available' }}>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order="asc"
              orderBy="time"
              headLabel={TABLE_HEAD}
              rowCount={enrollments.length}
              numSelected={0}
              onRequestSort={() => {}}
            />
            <TableBody id="registration-list-container" data-testid="registration-list">
              {enrollments.map((enrollment: any, index) => (
                <RegistrationRow key={enrollment.id} enrollment={enrollment} index={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </div>
  );
}
