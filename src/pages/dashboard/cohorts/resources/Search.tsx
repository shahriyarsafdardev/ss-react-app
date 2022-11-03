import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import ResourcesTile from './ResourcesTile';

function Search({ searchInput, results }: { searchInput: string; results: any[] }) {
  if (!results.length) return <Typography>No results found for "{searchInput}"</Typography>;

  return (
    <>
      <Typography>All results for {searchInput}</Typography>
      {results.map((result) => (
        <ResourcesTile key={result.materialID} material={result} />
      ))}
    </>
  );
}

export default Search;
