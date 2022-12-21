import { memo } from 'react';
import { Stack } from '@material-ui/core';
import { SessionMaterial } from '../../../../@types/cohorts';
import ResourcesTile from './ResourcesTile';

function ResourcesList({
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
}) {
  return (
    <>
      <Stack spacing={2}>
        {sessionMaterials.map((material: SessionMaterial, index: any) => (
          <ResourcesTile
            isPublic={isPublic}
            hostName={hostName}
            key={index}
            sessionID={sessionID}
            material={material}
            sessionData={sessionData}
            setState={setState}
          />
        ))}
      </Stack>
    </>
  );
}

export default memo(ResourcesList);
