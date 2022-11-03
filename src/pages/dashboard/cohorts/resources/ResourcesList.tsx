import React from 'react';
import { List, ListItem } from '@material-ui/core';
import ResourcesTile from './ResourcesTile';

function ResourcesList({ sessionMaterials }: { sessionMaterials: any }) {
  return (
    <>
      <List>
        {sessionMaterials.map((material: any, index: any) => (
          <ListItem key={index}>
            <ResourcesTile material={material} />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default ResourcesList;
