import React from 'react';
import { Stack } from '@material-ui/core';
import { SessionMaterial } from '../../../../@types/cohorts';
import ResourcesTile from './ResourcesTile';

function ResourcesList({
  sessionID,
  sessionMaterials
}: {
  sessionID: string;
  sessionMaterials: any;
}) {
  return (
    <>
      <Stack spacing={2}>
        {sessionMaterials.map((material: SessionMaterial, index: any) => (
          <ResourcesTile key={index} sessionID={sessionID} material={material} />
        ))}
      </Stack>
    </>
  );
}

export default ResourcesList;
