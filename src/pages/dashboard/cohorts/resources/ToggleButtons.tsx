import React from 'react';
import { ToggleButtonGroup } from '@material-ui/core';
import { StyledToggleButton, ToggleButtonTypography } from './Common';

const materialTypes = [
  {
    type: 'Academic Paper',
    display: 'Academic Paper'
  },
  {
    type: 'Article',
    display: 'Articles'
  },
  {
    type: 'Book',
    display: 'Books'
  },
  {
    type: 'Book Passage',
    display: 'Book Passages'
  },
  {
    type: 'Github',
    display: 'Github'
  },
  {
    type: 'Jupyter Notebook',
    display: 'Jupyter'
  },
  {
    type: 'Slides',
    display: 'Slides'
  },
  {
    type: 'Spreadsheet',
    display: 'Spreadsheets'
  },
  {
    type: 'Other',
    display: 'Other'
  }
];

export default function ToggleButtons() {
  return (
    <ToggleButtonGroup
      style={{
        marginBottom: '2rem',
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto auto auto auto auto auto',
        gridGap: '20px'
      }}
      fullWidth={true}
    >
      {materialTypes.map((m) => (
        <StyledToggleButton selected={true} key={m.type} value={m.type}>
          <ToggleButtonTypography>{m.display}</ToggleButtonTypography>
        </StyledToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
