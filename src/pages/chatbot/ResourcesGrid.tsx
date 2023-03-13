import { Typography, Stack, Card, Link } from '@material-ui/core';
import { trackEvent } from 'utils/eventTracking';
import { useStyles } from './Common';

function ResourcesGrid({ resources, messagesList }: { resources: any[]; messagesList: any }) {
  const classes = useStyles();

  const handleResourceOnclick = (resource: any) => {
    trackEvent(null, 'AI Search Assistant Page - Resource Opened', {
      'Resource ID': resource?.id,
      'Resource Name': resource?.name,
      History: messagesList
    });
    window.open(resource?.url, '_blank');
  };

  return (
    <>
      {resources.map((resource: any) => (
        <Card className={classes.resourceCard} key={resource?.id}>
          <Stack direction="row">
            <img
              src={resource?.thumbnail_image}
              alt="Resource Preview"
              style={{ borderRadius: '7px 7px 0px 0px' }}
              className={`${resource?.resource_type === 'Session Recording' && classes.darkImage}`}
            />
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
                {resource.text}
                <Link
                  className={classes.resourceName}
                  sx={{ cursor: 'pointer', display: 'inline !important' }}
                  onClick={() => handleResourceOnclick(resource)}
                >
                  <u>Click here to open</u>
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </Card>
      ))}
    </>
  );
}

export default ResourcesGrid;
