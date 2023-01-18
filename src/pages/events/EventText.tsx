import { Stack } from '@material-ui/core';
import { CardText, CardTitle, formatTime, getAccessText, CALENDAR } from './Common';

export default function EventText({ event }: { event: any }) {
  return (
    <Stack spacing={2} sx={{ p: '30px 20px' }}>
      <CardTitle>{event.name}</CardTitle>
      <Stack>
        <Stack direction="row" spacing={2} alignItems="baseline">
          {CALENDAR}
          <CardText>{formatTime(event.time)}</CardText>
        </Stack>
        {getAccessText(event.access_type)}
      </Stack>
    </Stack>
  );
}
