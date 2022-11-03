import React from 'react';
import { Stack } from '@material-ui/core';
import ResourcesTile from './ResourcesTile';

function ResourcesList({ sessionMaterials }: { sessionMaterials: any }) {
  return (
    <>
      <Stack spacing={2}>
        {sessionMaterials.map((material: any, index: any) => (
          <ResourcesTile key={index} material={material} />
        ))}
      </Stack>
    </>
  );
}

export default ResourcesList;
