import { Stack, Typography } from '@material-ui/core';
import { StyledCard } from './Common';
import EventTime from './EventTime';

export default function EventCard({
  event,
  openModal,
  setEvent
}: {
  event: any;
  openModal: Function;
  setEvent: Function;
}) {
  return (
    <StyledCard
      variant="outlined"
      onClick={() => {
        setEvent(event);
        openModal(true);
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography>{event.name}</Typography>
        <EventTime eventTime={event.time} />
      </Stack>
    </StyledCard>
  );
}
