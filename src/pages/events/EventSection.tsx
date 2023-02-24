import { useState } from 'react';
import { Stack, Grid, Card } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { trackEvent } from 'utils/eventTracking';
import EventCard from './EventCard';
import ShowMoreButton from './ShowMoreButton';
import { Event } from '../../@types/events';
import { SectionTitle, StyledModal, ModalForm, communityEventProperties } from './Common';

export default function EventSection({
  events,
  category,
  totalEvents,
  handleShowMore
}: {
  events: any;
  category: string;
  totalEvents: number;
  handleShowMore: Function;
}) {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [more, setMore] = useState(false);
  const [eventDetails, setEventDetails] = useState<Event | any>({});
  const [modalState, setModalState] = useState(false);
  const [formType, setFormType] = useState('');

  const showMore = async () => {
    if (totalEvents !== events.events.length) {
      await handleShowMore();
    }
    setMore(!more);
    trackEvent(null, 'All Events Page - Show More Recordings');
  };

  const registrationSuccess = () => {
    trackEvent(null, 'All Events Page - Login modal - "Continue" Selected');
    setModalState(false);
    setIsAuthenticated();
  };

  const handleEventClick = (event: Event) => {
    if (event.access_type === 'public') {
      navigate(`/events/${event.id}`);
    } else if (event.access_type === 'alumni') {
      setEventDetails(event);
      setFormType('alumni');
      setModalState(true);
    } else if (event.is_registered && isAuthenticated) {
      navigate(`/cohorts/${event.cohort_id}/sessions?session_id=${event?.id}`);
    } else {
      setEventDetails(event);
      setFormType('learner');
      setModalState(true);
    }
    trackEvent(null, 'All Events Page - Recording Selected', communityEventProperties(event));
  };

  return (
    <>
      <StyledModal
        open={modalState}
        onClose={() => {
          if (['learner', 'alumni'].includes(formType)) {
            trackEvent(
              null,
              `All Events Page - ${formType.toUpperCase()} only modal - Close Button Selected`,
              communityEventProperties(eventDetails)
            );
          } else if (formType === 'register') {
            trackEvent(null, 'All Events Page - Login Modal - Close Button Selected');
          } else if (formType === 'registrationSuccess') {
            trackEvent(null, 'All Events Page - Login Modal - Close Button Selected');
            setIsAuthenticated();
          }
          setEventDetails({});
          setFormType('');
          setModalState(false);
        }}
        zIndex={1400}
      >
        <Card sx={{ px: { xs: 3, md: 10 }, py: { xs: 6, md: 10 }, height: 1, overflow: 'visible' }}>
          <ModalForm
            formType={formType}
            eventDetails={eventDetails}
            isAuthenticated={isAuthenticated}
            setFormType={setFormType}
            registrationSuccess={registrationSuccess}
          />
        </Card>
      </StyledModal>
      <Stack sx={{ mb: 3 }}>
        <SectionTitle>{category}</SectionTitle>
        <Grid container spacing={3} sx={{ marginTop: '20px' }}>
          {more
            ? events.events.map((event: any) => (
                <Grid item key={event.name} xs={12} sm={12} md={4}>
                  <EventCard event={event} setEvent={handleEventClick} />
                </Grid>
              ))
            : events.events.slice(0, 3).map((event: any) => (
                <Grid item key={event.name} xs={12} sm={12} md={4}>
                  <EventCard event={event} setEvent={handleEventClick} />
                </Grid>
              ))}
        </Grid>
        <ShowMoreButton showMore={showMore} more={more} remainingEvents={events.eventsLength - 3} />
      </Stack>
    </>
  );
}
