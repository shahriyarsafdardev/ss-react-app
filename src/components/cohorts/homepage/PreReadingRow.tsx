import React from 'react';
import { Stack, Avatar, TableRow, TableCell, Typography, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { PreReadingList } from '../../../@types/cohorts';

type PreReadingRowProps = {
  item: PreReadingList;
};

const StyledTableCell = styled(TableCell)(() => ({
  borderBottom: '1px solid rgba(224, 224, 224, 1)'
}));

export default function PreReadingRow({ item }: PreReadingRowProps) {
  return (
    <TableRow hover key={item.name} tabIndex={-1} style={{ cursor: 'pointer' }}>
      <StyledTableCell align="left" style={{ width: '80%', height: 110, maxHeight: 110 }}>
        {item.name}
      </StyledTableCell>
      <StyledTableCell align="right">{item.action_text}</StyledTableCell>
    </TableRow>
  );
}
