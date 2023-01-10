import { Typography, Stack, Button } from '@material-ui/core';
import { StyledModal, Event, StyledButton } from './Common';
import EventTime from './EventTime';

export default function EventModal({
  setEvent,
  event
}: {
  setEvent: Function;
  event: Event | null;
}) {
  return (
    <>
      <Button
        sx={{ marginBottom: '20px', width: 'fit-content' }}
        variant="text"
        onClick={() => setEvent({})}
      >
        {'< Back to all Events'}
      </Button>
      <StyledModal>
        <Stack textAlign="center" spacing={3}>
          <Typography variant="h4">{event?.name}</Typography>
          <EventTime eventTime={event?.time} />
          <Typography>{event?.description}</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 2 }}>
            <StyledButton variant="contained">Add to your calendar</StyledButton>
            <StyledButton variant="outlined">Share free invite</StyledButton>
          </Stack>
        </Stack>
      </StyledModal>
    </>
  );
}
