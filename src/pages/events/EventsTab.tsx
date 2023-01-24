import { useState, useEffect, useCallback } from 'react';
import { Container } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import { getEvents, getAllEvents } from 'redux/slices/event';
import Page from 'components/Page';
import { LoadingContainer, StyledImage } from './Common';
import { RootState, useSelector, useDispatch } from '../../redux/store';
import EventSection from './EventSection';
import UpcomingEvents from './UpcomingEvents';
import EventFilters from './EventFilters';
import EventsHeaderSection from './EventsHeaderSection';
import { Event } from '../../@types/events';

export default function EventsTab() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { upcomingEvents, pastEvents, totalUpcomingEvents, totalPastEvents } = useSelector(
    (state: RootState) => state?.event
  );

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  const handleShowMore = async (category: string) => {
    await dispatch(getAllEvents(category));
  };

  const handleFilterOnChange = async (filter: string) => {
    let updatedFilters = [];
    if (pastEvents.length < totalPastEvents) {
      await handleShowMore('past');
    }
    if (upcomingEvents.length < totalUpcomingEvents) {
      await handleShowMore('upcoming');
    }

    if (selectedFilters.includes(filter)) {
      updatedFilters = selectedFilters.filter((f) => f !== filter);
      setSelectedFilters(updatedFilters);
    } else {
      updatedFilters = [...selectedFilters, filter];
      setSelectedFilters(updatedFilters);
    }
  };

  const filterEvents = useCallback(
    (events: Event[], category: string) => {
      if (selectedFilters.length > 0) {
        const filteredEvents = events.filter((event: Event) =>
          selectedFilters.includes(event.access_type)
        );

        return { events: filteredEvents, eventsLength: filteredEvents.length };
      }

      const eventsCount = category === 'upcoming' ? totalUpcomingEvents : totalPastEvents;
      return { events, eventsLength: eventsCount };
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
    <Page title="Sphere | Events">
      <Container sx={{ paddingBottom: '100px' }}>
        <img
          src="https://sphere-public.s3.eu-west-2.amazonaws.com/Events-Banner.png"
          alt="events-banner"
          style={{
            width: '100%',
            border: '1px solid #E2E8F0',
            height: 'auto',
            borderRadius: '20px'
          }}
        />
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
