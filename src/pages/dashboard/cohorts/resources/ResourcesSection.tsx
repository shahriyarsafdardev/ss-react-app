import React, { useState } from 'react';
import { Typography, Box, Stack, Button } from '@material-ui/core';
import { Icon } from '@iconify/react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import arrowIosUpwardFill from '@iconify/icons-eva/arrow-ios-upward-fill';
import { useDispatch } from 'redux/store';
import { getCohortSessionResources } from 'redux/slices/cohort';
import { SessionResource } from '../../../../@types/cohorts';
import ResourcesList from './ResourcesList';
import { BorderLinearProgress } from './Common';

function ResourcesSection({ resourceData }: { resourceData: SessionResource }) {
  const [more, setMore] = useState(false);
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const dispatch = useDispatch();

  const progress = () => {
    if (resourceData.session_materials_count === 0) {
      return 0;
    }
    return Math.floor(
      (resourceData.completed_session_materials_count / resourceData.session_materials_count) * 100
    );
  };

  const handleShowMore = () => {
    if (resourceData?.session_materials_count !== resourceData?.materials?.length) {
      dispatch(getCohortSessionResources(cohort_id, resourceData?.session_id));
    }
    setMore(!more);
  };

  return (
    <Box style={{ marginBottom: '2rem' }}>
      <Typography variant="h3" style={{ marginBottom: '1rem', color: '#101658' }}>
        {resourceData.session_name}
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: '10px' }}
      >
        <Typography>
          {resourceData.completed_session_materials_count}/{resourceData.session_materials_count}{' '}
          resources read
        </Typography>

        {resourceData.session_materials_count > 3 && (
          <Button variant="text" onClick={handleShowMore}>
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
                <Typography>Show {resourceData.session_materials_count - 3} More</Typography>
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
        sessionID={resourceData?.session_id}
        sessionData={{
          session_number: resourceData?.session_number,
          session_name: resourceData?.session_name
        }}
        sessionMaterials={
          more === false ? resourceData.materials.slice(0, 3) : resourceData.materials
        }
      />
    </Box>
  );
}

export default ResourcesSection;
