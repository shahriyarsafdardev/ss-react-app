import { StyledCard, StyledImage } from './Common';
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
      <EventText event={event} />
    </StyledCard>
  );
}
