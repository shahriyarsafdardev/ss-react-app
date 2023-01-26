import { useState, useEffect, useCallback } from 'react';
import { Container, useMediaQuery } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import { useTheme } from '@material-ui/core/styles';
import { getEvents, getAllEvents } from 'redux/slices/event';
import Page from 'components/Page';
import { trackEvent } from 'utils/eventTracking';
import { LoadingContainer } from './Common';
import { RootState, useSelector, useDispatch } from '../../redux/store';
import UpcomingEvents from './UpcomingEvents';
import EventFilters from './EventFilters';
import { Event } from '../../@types/events';
import EventSection from './EventSection';

export default function EventsTab() {
  const [selectedFilters, setSelectedFilters] = useState<string>('');
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { upcomingEvents, pastEvents, totalUpcomingEvents, totalPastEvents } = useSelector(
    (state: RootState) => state?.event
  );

  useEffect(() => {
    dispatch(getEvents());
    trackEvent(null, 'All Events Page - Page Loaded');
  }, []);

  const handleShowMore = async (category: string) => {
    await dispatch(getAllEvents(category));
  };

  const handleFilterOnChange = async (filter: string) => {
    if (pastEvents.length < totalPastEvents && filter) {
      await handleShowMore('past');
    }
    if (upcomingEvents.length < totalUpcomingEvents && filter) {
      await handleShowMore('upcoming');
    }
    setSelectedFilters(filter);
    !!filter &&
      trackEvent(null, 'All Events Page - Filter Selected', {
        'Filter Name': filter
      });
  };

  const filterEvents = useCallback(
    (events: Event[], category: string) => {
      if (!selectedFilters) {
        const eventsCount = category === 'upcoming' ? totalUpcomingEvents : totalPastEvents;
        return { events, eventsLength: eventsCount };
      }
      if (selectedFilters === 'public') {
        const filteredEvents = events.filter(
          (event: Event) => selectedFilters === event.access_type
        );
        return { events: filteredEvents, eventsLength: filteredEvents.length };
      }
      const filteredEvents = events.filter((event: Event) => event.access_type !== 'public');
      return { events: filteredEvents, eventsLength: filteredEvents.length };
    },
    [selectedFilters, totalUpcomingEvents, totalPastEvents]
  );

  if (!upcomingEvents?.length && !pastEvents?.length) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <Page title="Sphere | Events" sx={{ backgroundColor: '#F8FAFC', marginTop: '-24px' }}>
      <img
        src={`https://sphere-public.s3.eu-west-2.amazonaws.com/Events-Banner${
          isMobile ? '-Mobile' : ''
        }.png`}
        alt="events-banner"
        style={{
          width: '100%',
          borderTop: '1px solid #E2E8F0',
          height: 'auto'
        }}
      />
      <Container sx={{ paddingBottom: '100px' }}>
        <EventFilters selectedFilters={selectedFilters} handleOnChange={handleFilterOnChange} />
        {totalUpcomingEvents > 0 && (
          <UpcomingEvents
            events={filterEvents(upcomingEvents, 'upcoming')}
            category="Upcoming Events"
            totalEvents={totalUpcomingEvents}
            handleShowMore={() => handleShowMore('upcoming')}
          />
        )}
        {totalPastEvents > 0 && (
          <EventSection
            events={filterEvents(pastEvents, 'past')}
            category="Event Recordings"
            totalEvents={totalPastEvents}
            handleShowMore={() => handleShowMore('past')}
          />
        )}
      </Container>
    </Page>
  );
}
