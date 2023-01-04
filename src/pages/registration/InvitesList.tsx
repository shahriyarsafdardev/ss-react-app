import { memo } from 'react';
import { Table, TableBody, TableContainer, TableRow, TableCell } from '@material-ui/core';
import Scrollbar from 'components/Scrollbar';
import UserListHead from 'components/_dashboard/user/list/UserListHead';
import { ReferralTypeUser } from './InvitePeersForm';

const TABLE_HEAD = [
  { id: 'email', label: 'Email' },
  { id: 'full_name', label: 'Full Name', align: 'center' },
  { id: 'checked', label: 'Sent', align: 'center' }
];

const InviteRow = memo(({ invite, id }: { invite: ReferralTypeUser; id: string }) => (
  <TableRow hover key={id} tabIndex={-1}>
    <TableCell style={{ width: 100 }} align="left">
      {invite.email}
    </TableCell>
    <TableCell style={{ width: 100 }} align="center">
      {invite.fullName}
    </TableCell>
    <TableCell style={{ width: 100 }} align="center">
      ✅
    </TableCell>
  </TableRow>
));

function InvitesList({ invites }: { invites: ReferralTypeUser[] }) {
  return (
    <div style={{ width: '100%' }}>
      <Scrollbar>
        <TableContainer sx={{ maxHeight: 300 }}>
          <Table>
            <UserListHead
              order="asc"
              orderBy="full_name"
              headLabel={TABLE_HEAD}
              rowCount={invites.length}
              numSelected={0}
              onRequestSort={() => {}}
            />
            <TableBody id="sales-list-container" data-testid="sales-list">
              {invites.map((invite: any, index) => (
                <InviteRow key={index} invite={invite} id={`${index}`} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </div>
  );
}

export default memo(InvitesList);
