import { memo } from 'react';
import { TextField, InputAdornment, Stack, Typography } from '@material-ui/core';
import searchFill from '@iconify/icons-eva/search-fill';
import { Icon } from '@iconify/react';
import { useStyles } from './Common';

function SearchBar({
  searchQuery,
  setSearchQuery
}: {
  searchQuery: string;
  setSearchQuery: Function;
}) {
  const classes = useStyles();

  return (
    <Stack
      spacing={{ xs: 2, md: 12 }}
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'flex-start', md: 'center' }}
      className={classes.coursesHeader}
    >
      <Typography className={classes.coursesHeaderText}>Courses</Typography>
      <TextField
        fullWidth
        placeholder="Searching for a specific course?"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          style: { background: '#ffffff' },
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
      />
    </Stack>
  );
}

export default memo(SearchBar);
