import React from 'react';
import { Stack, Avatar, TableRow, TableCell, Typography, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { PreReadingList } from '../../../@types/cohorts';
import MarkCheckbox from './MarkCheckbox';

type PreReadingRowProps = {
  item: PreReadingList;
};

const StyledTableCell = styled(TableCell)(() => ({
  borderBottom: '1px solid rgba(224, 224, 224, 1)',
  position: 'relative'
}));

export default function PreReadingRow({ item }: PreReadingRowProps) {
  return (
    <TableRow
      hover
      key={item.name}
      tabIndex={-1}
      style={{ cursor: 'pointer', background: 'rgba(229, 231, 235, 0.3)' }}
    >
      <StyledTableCell align="left" style={{ width: '80%', height: 110, maxHeight: 110 }}>
        {item.name}
      </StyledTableCell>
      <StyledTableCell align="left">{item.action_text}</StyledTableCell>
      <StyledTableCell align="right">
        <MarkCheckbox completed={item.complete} />
      </StyledTableCell>
    </TableRow>
  );
}
