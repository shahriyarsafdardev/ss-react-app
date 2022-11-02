import React from 'react';
import { Grid } from '@material-ui/core';
import ResourcesTile from './ResourcesTile';

function ResourcesList({ sessionMaterials }: { sessionMaterials: any }) {
  return (
    <>
      <Grid container spacing={2} style={{ overflow: 'wrap' }}>
        {sessionMaterials.map((material: any, index: any) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <ResourcesTile material={material} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ResourcesList;
