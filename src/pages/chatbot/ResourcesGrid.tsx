import { Typography, Stack } from '@material-ui/core';
import { trackEvent } from 'utils/eventTracking';
import { useStyles, StyledImage, StyledLink, Resource } from './Common';

function ResourcesGrid({ resources, messagesList }: { resources: Resource[]; messagesList: any }) {
  const classes = useStyles();

  const handleResourceOnclick = (resource: Resource) => {
    trackEvent(null, 'AI Search Assistant Page - Resource Opened', {
      'Resource ID': resource?.id,
      'Resource Name': resource?.name,
      History: messagesList
    });
    window.open(resource?.url, '_blank');
  };

  return (
    <>
      {resources.map((resource: Resource) => (
        <Stack className={classes.resourceCard} key={resource?.id}>
          <Stack key={resource?.id} direction={{ xs: 'column', md: 'row' }}>
            <StyledImage src={resource?.thumbnail_image} alt="Resource Preview" />
            <Stack className={classes.resourceDescriptionStack} spacing={2}>
              <Typography className={classes.resourceName}>
                {resource?.resource_type === 'Other' ? (
                  <></>
                ) : (
                  <strong>{resource?.resource_type}: </strong>
                )}
                {resource?.name}
                {resource?.instructor_names ? ` | ${resource?.instructor_names}` : ''}
              </Typography>
              <Typography className={classes.resourceName}>
                {resource.text}&nbsp;
                <StyledLink onClick={() => handleResourceOnclick(resource)}>
                  Click here to open
                </StyledLink>
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </>
  );
}

export default ResourcesGrid;
