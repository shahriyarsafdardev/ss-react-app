import { Stack } from '@material-ui/core';
import { StyledToggleButton, PUBLIC, LOCK, ToggleButtonText } from './Common';

export default function EventFilters({
  selectedFilters,
  setSelectedFilters
}: {
  selectedFilters: String[];
  setSelectedFilters: Function;
}) {
  const handleOnChange = (filter: string) => {
    let filters = [];
    if (selectedFilters.includes(filter)) {
      filters = selectedFilters.filter((f) => f !== filter);
      setSelectedFilters(filters);
    } else {
      filters = [...selectedFilters, filter];
      setSelectedFilters(filters);
    }
  };

  return (
    <Stack direction="row">
      <StyledToggleButton
        key="public"
        selected={selectedFilters.includes('public')}
        onChange={() => handleOnChange('public')}
        value="public"
      >
        <ToggleButtonText>{PUBLIC} Open to everyone</ToggleButtonText>
      </StyledToggleButton>
      <StyledToggleButton
        key="alumni"
        selected={selectedFilters.includes('alumni')}
        onChange={() => handleOnChange('alumni')}
        value="alumni"
      >
        <ToggleButtonText>{LOCK} Open to Sphere alumni only</ToggleButtonText>
      </StyledToggleButton>
    </Stack>
  );
}
