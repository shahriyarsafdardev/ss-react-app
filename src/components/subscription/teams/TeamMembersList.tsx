import { Table, TableBody, TableContainer, TableRow, TableCell } from '@material-ui/core';
import Scrollbar from 'components/Scrollbar';
import UserListHead from 'components/_dashboard/user/list/UserListHead';
import { TeamMember } from '../../../pages/subscription/teams/InviteMembersForm';

const TeamMemberRow = ({ member, id }: { member: TeamMember; id: string }) => (
  <TableRow hover key={id} tabIndex={-1}>
    <TableCell style={{ width: 100 }} align="left">
      {member.email}
    </TableCell>
    <TableCell style={{ width: 100 }} align="center">
      {member.fullName}
    </TableCell>
    <TableCell style={{ width: 100 }} align="center">
      {member.courseName}
    </TableCell>
    <TableCell style={{ width: 100 }} align="center">
      ✅
    </TableCell>
  </TableRow>
);

export default function TeamMembersList({
  teamMembers,
  isSinglePayee
}: {
  teamMembers: TeamMember[];
  isSinglePayee: boolean;
}) {
  const TABLE_HEAD = [
    { id: 'email', label: 'Email' },
    { id: 'full_name', label: 'Full Name', align: 'center' },
    { id: 'course_name', label: 'Course Name', align: 'center' },
    { id: 'checked', label: isSinglePayee ? 'Added' : 'Sent', align: 'center' }
  ];

  return (
    <div style={{ width: '100%' }}>
      <Scrollbar>
        <TableContainer sx={{ maxHeight: 300 }}>
          <Table>
            <UserListHead
              order="asc"
              orderBy="full_name"
              headLabel={TABLE_HEAD}
              rowCount={teamMembers.length}
              numSelected={0}
              onRequestSort={() => {}}
            />
            <TableBody id="sales-list-container" data-testid="sales-list">
              {teamMembers.map((member: any, index) => (
                <TeamMemberRow key={index} member={member} id={`${index}`} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </div>
  );
}
