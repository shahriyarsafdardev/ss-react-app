import { memo } from 'react';
import { Stack } from '@material-ui/core';
import { SessionMaterial } from '../../../../@types/cohorts';
import ResourcesTile from './ResourcesTile';

const ResourcesList = memo(
  ({
    sessionID,
    sessionMaterials,
    isPublic,
    sessionData,
    hostName,
    setState
  }: {
    sessionID: string;
    sessionMaterials: any;
    sessionData: any;
    isPublic: boolean;
    hostName?: string;
    setState: Function;
  }) => (
    <Stack spacing={2}>
      {sessionMaterials.map((material: SessionMaterial, index: any) => (
        <ResourcesTile
          isPublic={isPublic}
          hostName={hostName}
          key={material.id}
          sessionID={sessionID}
          material={material}
          sessionData={sessionData}
          setState={setState}
        />
      ))}
    </Stack>
  )
);

export default ResourcesList;
