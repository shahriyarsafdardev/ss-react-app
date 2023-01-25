import { Stack } from '@material-ui/core';
import { CardTitle, StyledCard, StyledImage } from './Common';
import EventText from './EventText';

export default function EventCard({ event, setEvent }: { event: any; setEvent: Function }) {
  return (
    <StyledCard
      variant="outlined"
      onClick={() => {
        setEvent(event);
      }}
    >
      <StyledImage key={event.thumbnail_url} src={event.thumbnail_url} alt="thumbnail" />
      <Stack spacing={2} sx={{ p: '30px 20px', width: '100%' }}>
        <CardTitle variant="body1">{event.name}</CardTitle>
        <EventText event={event} />
      </Stack>
    </StyledCard>
  );
}
