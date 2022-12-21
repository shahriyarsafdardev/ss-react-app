// material
import { TableRow, TableCell, TableHead } from '@material-ui/core';
import { memo } from 'react';

// ----------------------------------------------------------------------

type UserListHeadProps = {
  order: 'asc' | 'desc';
  orderBy: string;
  rowCount: number;
  headLabel: any[];
  numSelected?: number;
  onRequestSort: (id: string) => void;
  onSelectAllClick?: (checked: boolean) => void;
};

const UserListHead = ({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick
}: UserListHeadProps) => (
  <TableHead>
    <TableRow>
      {headLabel.map((headCell) => (
        <TableCell key={headCell.id} align={headCell.align || 'left'}>
          {headCell.label}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

export default memo(UserListHead);
