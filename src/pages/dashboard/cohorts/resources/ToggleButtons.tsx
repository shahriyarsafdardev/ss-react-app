import React from 'react';
import { ToggleButtonGroup } from '@material-ui/core';
import { RootState, useSelector } from 'redux/store';
import { StyledToggleButton, ToggleButtonTypography } from './Common';

function ToggleButtons({ filters, setFilters }: { filters: String[]; setFilters: Function }) {
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const resourcesTypes = useSelector(
    (state: RootState) =>
      state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]?.resources_types
  );
  const options = resourcesTypes.map((type) => ({
    type,
    display: ['Github', 'Other'].includes(type) ? type : `${type}s`
  }));

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
      {options.map((m) => (
        <StyledToggleButton key={m.type} value={m.type}>
          <ToggleButtonTypography>{m.display}</ToggleButtonTypography>
        </StyledToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default ToggleButtons;
