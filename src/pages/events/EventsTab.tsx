import { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import { useLocation } from 'react-router-dom';
import { getEvents } from 'redux/slices/event';
import EventCard from './EventCard';
import EventDetails from './EventDetails';
import { Event, LoadingContainer } from './Common';
import { RootState, useSelector, useDispatch } from '../../redux/store';

export default function EventsTab() {
  const [eventDetails, setEventDetails] = useState<Event | any>({});
  const dispatch = useDispatch();
  const { events } = useSelector((state: RootState) => state?.event);
  const url = new URLSearchParams(useLocation().search);
  const defaultEventID = url.get('event');

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  useEffect(() => {
    if (defaultEventID && events.length > 0) {
      const targetEvent = events.filter((event: any) => event.id === defaultEventID)[0];
      setEventDetails(targetEvent);
    } else {
      setEventDetails({});
    }
  }, [defaultEventID, events]);

  if (!events.length) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <Container key={eventDetails?.id} sx={{ paddingBottom: '100px' }}>
      {Object.keys(eventDetails).length > 0 ? (
        <EventDetails key={eventDetails?.id} setEvent={setEventDetails} event={eventDetails} />
      ) : (
        <>
          {events.map((event) => (
            <EventCard key={event.name} event={event} setEvent={setEventDetails} />
          ))}
        </>
      )}
    </Container>
  );
}
