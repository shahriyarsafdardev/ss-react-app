import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Checkbox,
  ListItemText
} from '@material-ui/core';
import { memo } from 'react';

function SeniorityFilter({
  types,
  selectedTypes,
  handleOnChange
}: {
  types: String[];
  selectedTypes: String[];
  handleOnChange: Function;
}) {
  return (
    <FormControl sx={{ width: '100%', marginBottom: '20px' }}>
      <InputLabel id="resource-filter">Filter by Seniority</InputLabel>
      <Select
        MenuProps={{ sx: { maxHeight: 500 } }}
        multiple
        onChange={(e: any) => handleOnChange(e.target?.value)}
        labelId="seniority-filter"
        value={selectedTypes}
        renderValue={(selected) => selected.join(', ')}
        label="Filter by Seniority"
        sx={{ width: { sm: '100%', md: '35%' } }}
      >
        {types.map((type: any) => (
          <MenuItem onClick={() => selectedTypes.indexOf(type) === -1} key={type} value={type}>
            <Checkbox checked={selectedTypes.includes(type)} />
            <ListItemText primary={type} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default memo(SeniorityFilter);
