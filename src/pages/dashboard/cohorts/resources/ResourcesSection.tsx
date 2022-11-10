import React, { useState } from 'react';
import { Typography, Box, Stack, useMediaQuery, Button, useTheme } from '@material-ui/core';
import { Icon } from '@iconify/react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import arrowIosUpwardFill from '@iconify/icons-eva/arrow-ios-upward-fill';
import { SessionResource } from '../../../../@types/cohorts';
import ResourcesList from './ResourcesList';
import { BorderLinearProgress } from './Common';

function ResourcesSection({
  resourceData,
  handleShowMore,
  isPublic,
  hostName
}: {
  resourceData: SessionResource;
  handleShowMore: Function;
  isPublic: boolean;
  hostName?: string;
}) {
  const theme = useTheme();
  const [more, setMore] = useState(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const progress = () => {
    if (resourceData.session_materials_count === 0) {
      return 0;
    }
    return Math.floor(
      (resourceData.completed_session_materials_count / resourceData.session_materials_count) * 100
    );
  };

  const showMore = async () => {
    if (resourceData?.session_materials_count !== resourceData?.materials?.length) {
      await handleShowMore(resourceData?.session_id);
    }
    setMore(!more);
  };

  const ShowMoreButton = () => (
    <Button sx={{ minWidth: '200px' }} variant="text" onClick={showMore}>
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
  );

  return (
    <Box style={{ marginBottom: '2rem', marginTop: '32px' }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: '10px', alignItems: 'baseline' }}
      >
        <Typography variant="h3" sx={{ color: '#101658' }}>
          {resourceData.session_name}
        </Typography>
        {isPublic && resourceData.session_materials_count > 3 && <ShowMoreButton />}
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: '10px' }}
      >
        {!isPublic && (
          <Typography>
            {resourceData.completed_session_materials_count}/{resourceData.session_materials_count}{' '}
            resources read
          </Typography>
        )}

        {!isPublic && resourceData.session_materials_count > 3 && <ShowMoreButton />}
      </Stack>
      {!isPublic && (
        <BorderLinearProgress
          variant="determinate"
          value={progress()}
          style={{ marginBottom: '30px' }}
        />
      )}
      <ResourcesList
        isPublic={isPublic}
        hostName={hostName}
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
