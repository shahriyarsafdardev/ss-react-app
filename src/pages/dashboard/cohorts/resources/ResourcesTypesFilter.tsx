import { memo } from 'react';
import { Stack } from '@material-ui/core';
import {
  StyledToggleButton,
  ToggleButtonTypography,
  getDisplayName,
  getColor,
  AdditionalFilters,
  useStyles
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
  const classes = useStyles();
  return (
    <>
      <Stack className={classes.filtersStack}>
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
