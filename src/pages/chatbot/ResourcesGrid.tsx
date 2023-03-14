import { Typography, Stack, styled, Link } from '@material-ui/core';
import { trackEvent } from 'utils/eventTracking';
import { useStyles } from './Common';

const StyledImage = styled('img')(({ theme }) => ({
  borderRadius: '7px 0 0 7px',
  width: '25%',
  minWidth: '150px',
  [theme.breakpoints.down('md')]: {
    display: 'none !important'
  }
}));

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
                <Link
                  className={classes.resourceName}
                  sx={{
                    cursor: 'pointer',
                    display: 'inline !important',
                    color: '#43009A !important'
                  }}
                  onClick={() => handleResourceOnclick(resource)}
                >
                  <u>Click here to open</u>
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </>
  );
}

export default ResourcesGrid;
