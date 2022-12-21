import { memo } from 'react';
import { Stack } from '@material-ui/core';
import {
  StyledToggleButton,
  ToggleButtonTypography,
  getDisplayName,
  getColor,
  AdditionalFilters
} from './Common';

function ResourcesTypesFilter({
  types,
  selectedTypes,
  materialCategory,
  sessionNumber,
  handleOnChange
}: {
  types: String[];
  materialCategory: String;
  sessionNumber: Number | null;
  selectedTypes: String[];
  handleOnChange: Function;
}) {
  return (
    <>
      <Stack
        direction="row"
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
        <AdditionalFilters
          handleOnChange={handleOnChange}
          sessionNumber={sessionNumber}
          materialCategory={materialCategory}
        />
      </Stack>
    </>
  );
}

export default memo(ResourcesTypesFilter);
