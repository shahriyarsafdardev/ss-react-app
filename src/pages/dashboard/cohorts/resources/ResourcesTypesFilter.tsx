import React from 'react';
import { Stack } from '@material-ui/core';
import { StyledToggleButton, ToggleButtonTypography, getDisplayName } from './Common';

function ResourcesTypesFilter({
  types,
  selectedTypes,
  setSelectedTypes
}: {
  types: String[];
  selectedTypes: String[];
  setSelectedTypes: Function;
}) {
  const handleChange = (type: String) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t === type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

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
            onChange={() => handleChange(type)}
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
