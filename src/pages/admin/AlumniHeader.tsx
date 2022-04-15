import { Stack, TextField, Typography } from '@material-ui/core';
import { ExportAlumniToExcel } from 'components/cohorts/registrations/Common';
import React, { useState } from 'react';
import moment from 'moment';
import { Alumni } from '../../@types/cohorts';

function AlumniHeader({
  alumnies,
  updateSearch,
  search
}: {
  alumnies: Alumni[];
  updateSearch: Function;
  search: string;
}) {
  const fileName = `${moment().format()}-Alumni Data`;

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      width="-webkit-fill-available"
      sx={{ mx: 2, mb: 2 }}
    >
      <Typography variant="h5">Alumni List</Typography>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <ExportAlumniToExcel alumnies={alumnies} fileName={fileName} />
        <TextField
          InputProps={{
            startAdornment: <img src="/static/icons/search-icon.svg" alt="icon" />
          }}
          placeholder="Search"
          value={search}
          onChange={(e) => {
            updateSearch(e.target.value);
          }}
        />
      </Stack>
    </Stack>
  );
}

export default AlumniHeader;
