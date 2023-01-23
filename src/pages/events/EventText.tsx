import { Stack } from '@material-ui/core';
import { CardText, CardTitle, formatTime, getAccessText, CALENDAR } from './Common';

export default function EventText({ event }: { event: any }) {
  return (
    <Stack spacing={2} sx={{ p: '30px 20px', width: '100%' }}>
      <CardTitle>{event.name}</CardTitle>
      <Stack>
        <Stack direction="row" spacing={2} alignItems="baseline">
          {CALENDAR}&nbsp;&nbsp;
          <CardText>{formatTime(event.time)}</CardText>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="baseline">
          {event?.is_registered ? (
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={2} alignItems="baseline">
                {getAccessText(event.access_type)}
              </Stack>
              <img src="/static/icons/note-check.svg" alt="event check" />
            </Stack>
          ) : (
            getAccessText(event.access_type)
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
