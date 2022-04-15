// material
import { Table, TableBody, TableContainer } from '@material-ui/core';
import Scrollbar from 'components/Scrollbar';
import { Alumni } from '../../../@types/cohorts';
import { UserListHead } from '../../_dashboard/user/list';
import AlumniRow from './AlumniRow';

const TABLE_HEAD = [
  { id: 'full_name', label: 'Full name' },
  { id: 'company', label: 'Company' },
  { id: 'cohorts', label: 'Cohorts' },
  { id: 'notes', label: 'Notes' },
  { id: 'mailing_list', label: 'Mailing List', align: 'center' },
  { id: 'actions', label: 'Actions', align: 'center' }
];

export default function AlumniList({ aluminies }: { aluminies: Alumni[] }) {
  return (
    <div style={{ width: '-webkit-fill-available' }}>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order="asc"
              orderBy="time"
              headLabel={TABLE_HEAD}
              rowCount={aluminies.length}
              numSelected={0}
              onRequestSort={() => {}}
            />
            <TableBody id="alumni-list-container" data-testid="alumni-list">
              {aluminies.map((alumni: any, index) => (
                <AlumniRow key={alumni.id} alumni={alumni} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </div>
  );
}
