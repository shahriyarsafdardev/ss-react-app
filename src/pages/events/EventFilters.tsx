import { Stack, Typography } from '@material-ui/core';
import { StyledToggleButton, PUBLIC, LOCK, ToggleButtonText } from './Common';

export default function EventFilters({
  selectedFilters,
  handleOnChange
}: {
  selectedFilters: string;
  handleOnChange: Function;
}) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      my="30px"
      alignItems={{ xs: 'left', sm: 'center' }}
      spacing={2}
    >
      <Typography sx={{ color: '#101658', fontWeight: 700 }}>Filter by: </Typography>
      <StyledToggleButton
        key="public"
        selected={selectedFilters === 'public'}
        onChange={() => handleOnChange(selectedFilters === 'public' ? '' : 'public')}
        value="public"
      >
        <ToggleButtonText>{PUBLIC}&nbsp;&nbsp;Open to everyone</ToggleButtonText>
      </StyledToggleButton>
      <StyledToggleButton
        key="alumni"
        selected={selectedFilters === 'alumni'}
        onChange={() => handleOnChange(selectedFilters === 'alumni' ? '' : 'alumni')}
        value="alumni"
      >
        <ToggleButtonText>{LOCK}&nbsp;&nbsp;Open to Sphere alumni only</ToggleButtonText>
      </StyledToggleButton>
    </Stack>
  );
}
