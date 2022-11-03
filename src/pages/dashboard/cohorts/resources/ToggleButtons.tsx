import React from 'react';
import { ToggleButtonGroup } from '@material-ui/core';
import { StyledToggleButton, ToggleButtonTypography, MaterialTypes } from './Common';

function ToggleButtons({ filters, setFilters }: { filters: String[]; setFilters: Function }) {
  return (
    <ToggleButtonGroup
      style={{
        marginBottom: '50px',
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto auto auto auto auto auto',
        gridGap: '20px',
        flexWrap: 'wrap'
      }}
      fullWidth={true}
      value={filters}
      onChange={(event, newFilters) => {
        setFilters(newFilters);
        console.log('Filters:', filters);
      }}
    >
      {MaterialTypes.map((m) => (
        <StyledToggleButton key={m.type} value={m.type}>
          <ToggleButtonTypography>{m.display}</ToggleButtonTypography>
        </StyledToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default ToggleButtons;
