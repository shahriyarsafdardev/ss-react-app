import React, { useState } from 'react';
import { Typography, Box, Stack, Button } from '@material-ui/core';
import { Icon } from '@iconify/react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import arrowIosUpwardFill from '@iconify/icons-eva/arrow-ios-upward-fill';
import ResourcesList from './ResourcesList';
import { BorderLinearProgress } from './Common';

function ResourcesSection({ sessionData }: { sessionData: any }) {
  const [more, setMore] = useState(false);
  const progress = () => {
    if (sessionData.total_materials === 0) {
      return 0;
    }
    return Math.floor((sessionData.completedMaterials / sessionData.totalMaterials) * 100);
  };

  return (
    <Box style={{ marginBottom: '2rem' }}>
      <Typography variant="h3" style={{ marginBottom: '1rem', color: '#101658' }}>
        {sessionData.sessionName}
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: '10px' }}
      >
        <Typography>
          {sessionData.completedMaterials}/{sessionData.totalMaterials} resources read
        </Typography>

        {sessionData.totalMaterials > 3 && (
          <Button variant="text" onClick={() => setMore(!more)}>
            {more ? (
              <>
                <Typography>Show Less</Typography>
                <Icon
                  style={{ marginLeft: '5px' }}
                  key={String(more)}
                  icon={arrowIosUpwardFill}
                  width={20}
                  height={20}
                />
              </>
            ) : (
              <>
                <Typography>Show {sessionData.totalMaterials - 3} More</Typography>
                <Icon
                  style={{ marginLeft: '5px' }}
                  key={String(more)}
                  icon={arrowIosDownwardFill}
                  width={20}
                  height={20}
                />
              </>
            )}
          </Button>
        )}
      </Stack>
      <BorderLinearProgress
        variant="determinate"
        value={progress()}
        style={{ marginBottom: '30px' }}
      />
      <ResourcesList
        sessionMaterials={
          more === false ? sessionData.materials.slice(0, 3) : sessionData.materials
        }
      />
    </Box>
  );
}

export default ResourcesSection;
