import { memo } from 'react';
import { Stack, useMediaQuery, useTheme } from '@material-ui/core';
import { CardTitle, StyledCard, TileImage, useStyles } from './Common';
import EventText from './EventText';

function EventTile({ event, setEvent }: { event: any; setEvent: Function }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const classes = useStyles();

  return (
    <StyledCard
      variant="outlined"
      onClick={() => {
        setEvent(event);
      }}
    >
      <Stack height="100%" direction={{ xs: 'column', md: 'row' }}>
        <TileImage key={event.thumbnail_url} src={event.thumbnail_url} alt="thumbnail" />
        <Stack spacing={2} sx={{ p: '30px 20px', width: '100%' }}>
          <CardTitle className={`${isDesktop && classes.oneLineText}`} variant="body1">
            {event.name}
          </CardTitle>
          <EventText event={event} />
        </Stack>
      </Stack>
    </StyledCard>
  );
}

export default memo(EventTile);
