import { memo, useState } from 'react';
// material
import { Table, TableBody, TableContainer } from '@material-ui/core';

import { UserListHead } from '../_dashboard/user/list';
import Scrollbar from '../Scrollbar';
import { StudentProfile } from '../../@types/cohorts';
import StudentProfileRow from './StudentProfileRow';

type StudentProfileListProps = {
  students: StudentProfile[];
  modalHandler: Function;
};

const TABLE_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'company', label: 'Company' },
  { id: 'currentRole', label: 'Current Role' },
  { id: 'goodAt', label: 'What I am good at' },
  { id: 'lookingFor', label: 'What I am looking for' }
];

const StudentProfileList = ({ students, modalHandler }: StudentProfileListProps) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const [selected, setSelected] = useState<string[]>([]);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const newSelecteds = students.map((n) => n.first_name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={students.length}
              numSelected={0}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody id="peer-list-container" data-testid="peers-list">
              {students.map((row: any, index) => (
                <StudentProfileRow
                  key={row.id}
                  row={row}
                  index={index}
                  modalHandler={modalHandler}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </div>
  );
};

export default memo(StudentProfileList);
