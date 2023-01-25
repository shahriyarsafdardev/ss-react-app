import { Stack } from '@material-ui/core';
import { CardText, formatTime, getAccessText, CALENDAR, getLocalTimeZone } from './Common';

export default function EventText({ event }: { event: any }) {
  return (
    <Stack>
      <Stack direction="row" spacing={2} alignItems="baseline">
        {CALENDAR}&nbsp;&nbsp;
        <CardText>
          {formatTime(event.time)} {getLocalTimeZone()}
        </CardText>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="baseline" width="100%">
        {event?.is_registered ? (
          <Stack direction="row" justifyContent="space-between" width="100%">
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
  );
}
