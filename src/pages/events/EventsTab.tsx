import { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import { useLocation } from 'react-router-dom';
import { getEvents, getAllEvents } from 'redux/slices/event';
import Page from 'components/Page';
import { Event } from '../../@types/events';
import EventDetails from './EventDetails';
import { LoadingContainer } from './Common';
import { RootState, useSelector, useDispatch } from '../../redux/store';
import EventSection from './EventSection';

export default function EventsTab() {
  const [eventDetails, setEventDetails] = useState<Event | any>({});
  const dispatch = useDispatch();
  const { upcomingEvents, pastEvents, totalUpcomingEvents, totalPastEvents } = useSelector(
    (state: RootState) => state?.event
  );
  const url = new URLSearchParams(useLocation().search);
  const defaultEventID = url.get('event');

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  useEffect(() => {
    if (defaultEventID && (upcomingEvents?.length > 0 || pastEvents?.length > 0)) {
      let targetEvent = upcomingEvents?.filter((event: Event) => event.id === defaultEventID)[0];
      if (!targetEvent) {
        // eslint-disable-next-line prefer-destructuring
        targetEvent = pastEvents?.filter((event: Event) => event.id === defaultEventID)[0];
      }
      setEventDetails(targetEvent);
    } else {
      setEventDetails({});
    }
  }, [defaultEventID, upcomingEvents, pastEvents]);

  const handleShowMore = async (category: string) => {
    dispatch(getAllEvents(category));
  };

  if (!upcomingEvents?.length && !pastEvents?.length) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <Page title="Sphere | Events">
      <Container key={eventDetails?.id} sx={{ paddingBottom: '100px' }}>
        {Object.keys(eventDetails).length > 0 ? (
          <EventDetails key={eventDetails?.id} setEvent={setEventDetails} event={eventDetails} />
        ) : (
          <>
            {totalUpcomingEvents > 0 && (
              <EventSection
                events={upcomingEvents}
                category="Upcoming Events"
                totalEvents={totalUpcomingEvents}
                setEvent={setEventDetails}
                handleShowMore={() => handleShowMore('upcoming')}
              />
            )}
            {totalPastEvents > 0 && (
              <EventSection
                events={pastEvents}
                category="Event Recordings"
                totalEvents={totalPastEvents}
                setEvent={setEventDetails}
                handleShowMore={() => handleShowMore('past')}
              />
            )}
          </>
        )}
      </Container>
    </Page>
  );
}
