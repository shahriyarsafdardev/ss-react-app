import { useState, useEffect } from 'react';
import { Stack, Grid, Typography, Button, useMediaQuery, useTheme } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import { useLocation } from 'react-router-dom';
import { getEvents } from 'redux/slices/event';
import { Icon } from '@iconify/react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import arrowIosUpwardFill from '@iconify/icons-eva/arrow-ios-upward-fill';
import EventCard from './EventCard';

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
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const showMore = async () => {
    if (totalEvents !== events.length) {
      await handleShowMore();
    }
    setMore(!more);
  };

  const ShowMoreButton = () => (
    <Button
      sx={{ minWidth: { xs: '100%', md: '200px' }, mt: { xs: '20px', md: 'auto' } }}
      variant="text"
      onClick={showMore}
    >
      {more ? (
        <>
          <Typography>Show Less</Typography>
          <Icon
            style={{ marginLeft: '5px' }}
            key={String(more)}
            icon={arrowIosUpwardFill}
            width={20}
            height={20}
          />
        </>
      ) : (
        <>
          <Typography>Show {totalEvents - 3} More</Typography>
          <Icon
            style={{ marginLeft: '5px' }}
            key={String(more)}
            icon={arrowIosDownwardFill}
            width={20}
            height={20}
          />
        </>
      )}
    </Button>
  );

  return (
    <Stack sx={{ mb: 3 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ color: '#000', fontWeight: 900 }}>
          {category}
        </Typography>

        {isDesktop && totalEvents > 3 && <ShowMoreButton />}
      </Stack>
      <Grid container spacing={3}>
        {more
          ? events.map((event: any) => (
              <Grid item key={event.name} xs={12} sm={6} md={4}>
                <EventCard event={event} setEvent={setEvent} />
              </Grid>
            ))
          : events.slice(0, 3).map((event: any) => (
              <Grid item key={event.name} xs={12} sm={6} md={4}>
                <EventCard event={event} setEvent={setEvent} />
              </Grid>
            ))}
      </Grid>
      {!isDesktop && totalEvents > 3 && <ShowMoreButton />}
    </Stack>
  );
}
