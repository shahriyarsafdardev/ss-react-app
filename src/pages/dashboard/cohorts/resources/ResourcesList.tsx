import React from 'react';
import { Stack } from '@material-ui/core';
import { SessionMaterial } from '../../../../@types/cohorts';
import ResourcesTile from './ResourcesTile';

function ResourcesList({
  sessionID,
  sessionMaterials,
  sessionData
}: {
  sessionID: string;
  sessionMaterials: any;
  sessionData: any;
}) {
  return (
    <>
      <Stack spacing={2}>
        {sessionMaterials.map((material: SessionMaterial, index: any) => (
          <ResourcesTile
            key={index}
            sessionID={sessionID}
            material={material}
            sessionData={sessionData}
          />
        ))}
      </Stack>
    </>
  );
}

export default ResourcesList;
