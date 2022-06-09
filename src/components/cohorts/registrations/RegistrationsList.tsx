// material
import { Table, TableBody, TableContainer } from '@material-ui/core';
import Scrollbar from 'components/Scrollbar';
import { Enrollment, ReferralCode } from '../../../@types/cohorts';
import { UserListHead } from '../../_dashboard/user/list';
import RegistrationRow from './RegistrationRow';

type StudentProfileListProps = {
  enrollments: Enrollment[];
  codes: ReferralCode[];
  isAdminView?: boolean;
};

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'time', label: 'Sign Up Date', align: 'center' },
  { id: 'last_action_date', label: 'Last Action Date', align: 'center' },
  { id: 'price', label: 'Price', align: 'center' },
  { id: 'source', label: 'Source', align: 'center' },
  { id: 'status', label: 'Status', align: 'center' },
  { id: 'tags', label: 'Tags', align: 'center' },
  { id: 'actions', label: 'Actions', align: 'center' }
];

export default function RegistrationsList({
  enrollments,
  codes = [],
  isAdminView = false
}: StudentProfileListProps) {
  return (
    <div style={{ width: '-webkit-fill-available' }}>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order="asc"
              orderBy="time"
              headLabel={
                isAdminView
                  ? [{ id: 'cohortCode', label: 'Cohort Code', align: 'left' }, ...TABLE_HEAD]
                  : TABLE_HEAD
              }
              rowCount={enrollments.length}
              numSelected={0}
              onRequestSort={() => {}}
            />
            <TableBody id="registration-list-container" data-testid="registration-list">
              {enrollments.map((enrollment: any, index) => (
                <RegistrationRow
                  codes={codes.filter((code) => code.cohort_id === enrollment.cohort_id)}
                  key={enrollment.id}
                  enrollment={enrollment}
                  index={index}
                  isAdminView={isAdminView}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </div>
  );
}
