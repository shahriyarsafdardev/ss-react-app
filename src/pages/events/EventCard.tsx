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
      <StyledImage
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
    </StyledCard>
  );
}
