import { Typography, Grid, Stack, Box } from '@material-ui/core';
import { useStyles } from './Common';

function ResourcesGrid({ resources }: { resources: any[] }) {
  const classes = useStyles();

  const handleResourceOnclick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Grid container sx={{ width: '70% !important' }}>
      {resources.map((resource: any) => (
        <Grid item xs={12} sm={6} md={4} className={classes.resourceGrid} key={resource?.id}>
          <Stack
            className={classes.resourceStack}
            onClick={() => handleResourceOnclick(resource?.url)}
          >
            <Box sx={{ position: 'relative' }}>
              <img
                src={resource?.thumbnail_image}
                alt="Resource Preview"
                style={{ borderRadius: '7px 7px 0px 0px' }}
                className={`${
                  resource?.resource_type === 'Session Recording' && classes.darkImage
                }`}
              />
              {resource?.resource_type === 'Session Recording' && (
                <img
                  src="https://sphere-public.s3.eu-west-2.amazonaws.com/play-button.png"
                  alt="Play Button"
                  style={{ width: '60px', position: 'absolute', top: '30%', left: '35%' }}
                />
              )}
            </Box>
            <Stack spacing={1} sx={{ padding: '8px' }}>
              <Typography className={classes.resourceName}>{resource?.name}</Typography>
              <Typography className={classes.resourceInstructorNames}>
                {resource?.instructor_names}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}

export default ResourcesGrid;
