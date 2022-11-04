import React from 'react';
import { Stack } from '@material-ui/core';
import { StyledToggleButton, ToggleButtonTypography, getDisplayName, getColor } from './Common';

function ResourcesTypesFilter({
  types,
  selectedTypes,
  handleOnChange
}: {
  types: String[];
  selectedTypes: String[];
  handleOnChange: Function;
}) {
  return (
    <>
      <Stack
        direction="row"
        spacing={3}
        sx={{
          marginBottom: '25px',
          width: '100%',
          flexWrap: 'wrap'
        }}
        justifyContent="flex-start"
      >
        {types.map((type: any) => (
          <StyledToggleButton
            key={type}
            value={type}
            selected={selectedTypes.includes(type)}
            onChange={() => handleOnChange(type, 'desktop-view-types')}
            sx={{
              '&.Mui-selected': {
                backgroundColor: getColor(type),
                '& .toggleText': {
                  color: '#ffffff !important'
                }
              },
              ':hover': {
                backgroundColor: getColor(type),
                '& .toggleText': {
                  color: '#ffffff !important'
                }
              }
            }}
          >
            <ToggleButtonTypography className="toggleText">
              {getDisplayName(type)}
            </ToggleButtonTypography>
          </StyledToggleButton>
        ))}
      </Stack>
    </>
  );
}

export default ResourcesTypesFilter;
