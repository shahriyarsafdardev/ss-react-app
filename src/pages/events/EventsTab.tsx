import { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import LoadingScreen from 'components/LoadingScreen';
import { getEvents, getAllEvents } from 'redux/slices/event';
import Page from 'components/Page';
import { LoadingContainer } from './Common';
import { RootState, useSelector, useDispatch } from '../../redux/store';
import EventSection from './EventSection';
import UpcomingEvents from './UpcomingEvents';
import EventFilters from './EventFilters';
import EventsHeaderSection from './EventsHeaderSection';

export default function EventsTab() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const dispatch = useDispatch();
  const { upcomingEvents, pastEvents, totalUpcomingEvents, totalPastEvents } = useSelector(
    (state: RootState) => state?.event
  );

  useEffect(() => {
    dispatch(getEvents());
  }, []);

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
      <Container sx={{ paddingBottom: '100px' }}>
        <EventsHeaderSection />
        <EventFilters selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
        {totalUpcomingEvents > 0 && (
          <UpcomingEvents
            events={upcomingEvents}
            category="Upcoming Events"
            totalEvents={totalUpcomingEvents}
            handleShowMore={() => handleShowMore('upcoming')}
          />
        )}
        {totalPastEvents > 0 && (
          <EventSection
            events={pastEvents}
            category="Event Recordings"
            totalEvents={totalPastEvents}
            handleShowMore={() => handleShowMore('past')}
          />
        )}
      </Container>
    </Page>
  );
}
