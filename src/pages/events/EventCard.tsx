import { Stack } from '@material-ui/core';
import {
  StyledCard,
  CardText,
  CardTitle,
  StyledImage,
  formatTime,
  PUBLIC,
  CALENDAR
} from './Common';

export default function EventCard({ event, setEvent }: { event: any; setEvent: Function }) {
  return (
    <StyledCard
      variant="outlined"
      onClick={() => {
        setEvent(event);
      }}
    >
      <StyledImage src={event.thumbnail_url} alt="thumbnail" />
      <Stack spacing={2} sx={{ p: '30px 20px' }}>
        <CardTitle>{event.name}</CardTitle>
        <Stack>
          <Stack direction="row" spacing={2} alignItems="left">
            {CALENDAR}
            <CardText>{formatTime(event.time)}</CardText>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="left">
            {PUBLIC}
            <CardText>Open to Everyone</CardText>
          </Stack>
        </Stack>
      </Stack>
    </StyledCard>
  );
}
