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
      <Stack height="100%" direction="row">
        <TileImage
          key={event.thumbnail_url}
          sx={{
            backgroundImage: `url(${
              event.thumbnail_url ||
              'https://sphere-public.s3.eu-west-2.amazonaws.com/Default+thumbnail.png'
            })`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <EventText event={event} />
      </Stack>
    </StyledCard>
  );
}

export default memo(EventTile);
