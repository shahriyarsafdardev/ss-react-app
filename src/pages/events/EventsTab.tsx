import { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import { getEvents } from 'redux/slices/event';
import EventCard from './EventCard';
import EventModal from './EventModal';
import { Event, LoadingContainer } from './Common';
import { RootState, useSelector, useDispatch } from '../../redux/store';

export default function EventsTab() {
  const [eventDetails, setEventDetails] = useState<Event | any>({});
  const dispatch = useDispatch();
  const { events } = useSelector((state: RootState) => state?.event);

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  if (!events.length) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <Container sx={{ paddingBottom: '100px' }}>
      {Object.keys(eventDetails).length > 0 ? (
        <EventModal setEvent={setEventDetails} event={eventDetails} />
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
