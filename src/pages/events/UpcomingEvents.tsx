import { useState, memo } from 'react';
import { Stack, Grid } from '@material-ui/core';
import EventCard from './EventCard';
import { SectionTitle } from './Common';
import ShowMoreButton from './ShowMoreButton';
import EventTile from './EventTile';

function UpcomingEvents({
  events,
  setEvent,
  category,
  totalEvents,
  handleShowMore
}: {
  events: any;
  category: string;
  totalEvents: number;
  setEvent: Function;
  handleShowMore: Function;
}) {
  const [more, setMore] = useState(false);

  const showMore = async () => {
    if (totalEvents !== events.length) {
      await handleShowMore();
    }
    setMore(!more);
  };

  return (
    <Stack sx={{ mb: 3 }}>
      <SectionTitle>{category}</SectionTitle>
      <Grid container spacing={3} sx={{ marginTop: '20px' }}>
        {events.slice(0, 2).map((event: any) => (
          <Grid key={event.name} item xs={12} md={6}>
            <EventCard event={event} setEvent={setEvent} />
          </Grid>
        ))}
      </Grid>
      <Grid container>
        {more
          ? events.slice(2, events.length).map((event: any) => (
              <Grid sx={{ marginTop: '50px' }} item key={event.name} xs={12}>
                <EventTile event={event} setEvent={setEvent} />
              </Grid>
            ))
          : events.slice(2, 5).map((event: any) => (
              <Grid sx={{ marginTop: '50px' }} item key={event.name} xs={12}>
                <EventTile event={event} setEvent={setEvent} />
              </Grid>
            ))}
      </Grid>
      {totalEvents > 5 && (
        <ShowMoreButton showMore={showMore} more={more} remainingEvents={totalEvents - 5} />
      )}
    </Stack>
  );
}

export default memo(UpcomingEvents);
