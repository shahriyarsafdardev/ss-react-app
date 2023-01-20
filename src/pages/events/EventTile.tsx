import { memo } from 'react';
import { Stack } from '@material-ui/core';
import { StyledCard, TileImage } from './Common';
import EventText from './EventText';

function EventTile({ event, setEvent }: { event: any; setEvent: Function }) {
  return (
    <StyledCard
      variant="outlined"
      onClick={() => {
        setEvent(event);
      }}
    >
      <Stack height="100%" direction={{ xs: 'column', md: 'row' }}>
        <TileImage key={event.thumbnail_url} src={event.thumbnail_url} alt="thumbnail" />
        <EventText event={event} />
      </Stack>
    </StyledCard>
  );
}

export default memo(EventTile);
