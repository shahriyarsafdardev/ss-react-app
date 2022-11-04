import React, { useState } from 'react';
import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
  Stack,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import searchFill from '@iconify/icons-eva/search-fill';
import { Icon } from '@iconify/react';
import ResourcesTypesFilter from './ResourcesTypesFilter';
import { getDisplayName } from './Common';

function ResourceFilter({ types, handleSearch }: { types: String[]; handleSearch: Function }) {
  const theme = useTheme();
  const [selectedTypes, setSelectedTypes] = useState<String[]>([]);
  const [searchQuery, setSearchQuery] = useState<String>('');
  const mobileView = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack direction="column" width="100%">
      <TextField
        fullWidth
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon
                style={{ marginLeft: '5px' }}
                icon={searchFill}
                width={25}
                height={25}
                color="#101658"
              />
            </InputAdornment>
          )
        }}
        color="primary"
        sx={{ marginBottom: '30px' }}
      />
      {!mobileView ? (
        <ResourcesTypesFilter
          types={types}
          selectedTypes={selectedTypes}
          setSelectedTypes={(values: String[]) => setSelectedTypes(values)}
        />
      ) : (
        <FormControl sx={{ width: '100%', marginBottom: '20px' }}>
          <InputLabel id="resource-filter">Filter by Material Type</InputLabel>
          <Select
            MenuProps={{ sx: { maxHeight: 500 } }}
            multiple
            onChange={(e: any) => setSelectedTypes(e.target?.value)}
            labelId="resource-filter"
            value={selectedTypes}
            renderValue={(selected) => selected.join(', ')}
            label="Filter by Material Type"
            sx={{ width: '100%' }}
          >
            {types.map((type: any) => (
              <MenuItem key={type} value={type}>
                <Checkbox checked={selectedTypes.includes(type)} />
                <ListItemText primary={getDisplayName(type)} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Stack>
  );
}

export default ResourceFilter;
