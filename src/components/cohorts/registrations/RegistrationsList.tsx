// material
import { Table, TableBody, TableContainer } from '@material-ui/core';

import Scrollbar from 'components/Scrollbar';
import { Enrollment } from '../../../@types/cohorts';
import { UserListHead } from '../../_dashboard/user/list';
import RegistrationRow from './RegistrationRow';

type RegistrationsListProps = {
  enrollments: Enrollment[];
  page: string;
};

const REGISTRATIONS_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'time', label: 'Sign Up Date', align: 'center' },
  { id: 'price', label: 'Price', align: 'center' },
  { id: 'status', label: 'Status', align: 'center' },
  { id: 'tags', label: 'Tags', align: 'center' },
  { id: 'actions', label: 'Actions', align: 'center' }
];

const HOME_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'tags', label: 'Tags', align: 'center' },
  { id: 'actions', label: 'Actions', align: 'center' }
];

export default function RegistrationsList({ enrollments, page }: RegistrationsListProps) {
  const width = page === 'Home' ? 300 : 800;
  return (
    <div style={{ width: '-webkit-fill-available' }}>
      <Scrollbar>
        <TableContainer sx={{ minWidth: width }}>
          <Table>
            <UserListHead
              order="asc"
              orderBy="time"
              headLabel={page === 'Home' ? HOME_HEAD : REGISTRATIONS_HEAD}
              rowCount={enrollments.length}
              numSelected={0}
              onRequestSort={() => {}}
            />
            <TableBody id="registration-list-container" data-testid="registration-list">
              {enrollments.map((enrollment: any, index) => (
                <RegistrationRow
                  page={page}
                  key={enrollment.id}
                  enrollment={enrollment}
                  index={index}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </div>
  );
}
