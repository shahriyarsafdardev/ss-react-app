import { Stack } from '@material-ui/core';
import { StyledToggleButton, PUBLIC, LOCK, ToggleButtonText } from './Common';

export default function EventFilters({
  selectedFilters,
  handleOnChange
}: {
  selectedFilters: String[];
  handleOnChange: Function;
}) {
  return (
    <Stack direction="row" py="24px">
      <StyledToggleButton
        key="public"
        selected={selectedFilters.includes('public')}
        onChange={() => handleOnChange('public')}
        value="public"
      >
        <ToggleButtonText>{PUBLIC}&nbsp;&nbsp;Open to everyone</ToggleButtonText>
      </StyledToggleButton>
      <StyledToggleButton
        key="alumni"
        selected={selectedFilters.includes('alumni')}
        onChange={() => handleOnChange('alumni')}
        value="alumni"
      >
        <ToggleButtonText>{LOCK}&nbsp;&nbsp;Open to Sphere alumni only</ToggleButtonText>
      </StyledToggleButton>
    </Stack>
  );
}
