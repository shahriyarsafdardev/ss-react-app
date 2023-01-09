import { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import { getEvents } from 'redux/slices/event';
import EventCard from './EventCard';
import EventModal from './EventModal';
import { Event, LoadingContainer } from './Common';
import { RootState, useSelector, useDispatch } from '../../redux/store';

const EVENTS = [
  {
    name: 'Causal Inference Meetup',
    time: 'Fri, 06 Jan 2023 22:02:33 +0500',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    name: 'Benefits of Digital Marketing',
    time: 'Fri, 06 Jan 2023 11:02:33 +0500',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt u in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    name: 'Forensic Sciences',
    time: 'Fri, 06 Jan 2023 22:02:33 +0500',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt u in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    name: 'An Hour for Web 3.0',
    time: 'Fri, 06 Jan 2023 08:02:33 +0500',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt u in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    name: 'The Potential of Blockchain',
    time: 'Fri, 06 Jan 2023 22:02:33 +0500',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt u in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
];

export default function EventsTab() {
  const [modalState, setModalState] = useState(false);
  const [eventDetails, setEventDetails] = useState<Event | null>(null);
  // const [loading, setLoading] = useState(true);
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
      <EventModal state={modalState} setState={setModalState} event={eventDetails} />
      {EVENTS.map((event) => (
        <EventCard
          key={event.name}
          event={event}
          openModal={setModalState}
          setEvent={setEventDetails}
        />
      ))}
    </Container>
  );
}
