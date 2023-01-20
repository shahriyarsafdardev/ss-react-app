import { useState } from 'react';
import { Stack, Grid } from '@material-ui/core';
import EventCard from './EventCard';
import ShowMoreButton from './ShowMoreButton';
import { SectionTitle } from './Common';

export default function EventSection({
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
        {more
          ? events.map((event: any) => (
              <Grid item key={event.name} xs={12} sm={12} md={4}>
                <EventCard event={event} setEvent={setEvent} />
              </Grid>
            ))
          : events.slice(0, 3).map((event: any) => (
              <Grid item key={event.name} xs={12} sm={12} md={4}>
                <EventCard event={event} setEvent={setEvent} />
              </Grid>
            ))}
      </Grid>
      {totalEvents > 3 && (
        <ShowMoreButton showMore={showMore} more={more} remainingEvents={totalEvents - 3} />
      )}
    </Stack>
  );
}
