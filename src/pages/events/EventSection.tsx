import { useState } from 'react';
import { Stack, Grid, Card } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import EventCard from './EventCard';
import ShowMoreButton from './ShowMoreButton';
import { Event } from '../../@types/events';
import { SectionTitle, StyledModal, ModalForm } from './Common';

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
  const { isAuthenticated } = useAuth();
  const [more, setMore] = useState(false);
  const [eventDetails, setEventDetails] = useState<Event | any>({});
  const [modalState, setModalState] = useState(false);
  const [formType, setFormType] = useState('');

  const showMore = async () => {
    if (totalEvents !== events.length) {
      await handleShowMore();
    }
    setMore(!more);
  };

  const handleEventClick = (event: Event) => {
    if (event.access_type === 'public') {
      navigate(`/events/${event.id}`);
    } else if (event.access_type === 'alumni') {
      setEventDetails(event);
      setFormType('alumni');
      setModalState(true);
    } else if (event.is_registered && isAuthenticated) {
      navigate(`/cohorts/${event.cohort_id}/sessions`);
    } else {
      setEventDetails(event);
      setFormType('learner');
      setModalState(true);
    }
  };

  return (
    <>
      <StyledModal
        open={modalState}
        onClose={() => {
          setEventDetails({});
          setFormType('');
          setModalState(false);
        }}
        zIndex={1400}
      >
        <Card sx={{ p: { xs: 3, md: 10 }, height: 1, overflow: 'visible' }}>
          <ModalForm
            formType={formType}
            eventDetails={eventDetails}
            isAuthenticated={isAuthenticated}
            setFormType={setFormType}
            registrationSuccess={() => {}}
          />
        </Card>
      </StyledModal>
      <Stack sx={{ mb: 3 }}>
        <SectionTitle>{category}</SectionTitle>
        <Grid container spacing={3} sx={{ marginTop: '20px' }}>
          {more
            ? events.map((event: any) => (
                <Grid item key={event.name} xs={12} sm={12} md={4}>
                  <EventCard event={event} setEvent={handleEventClick} />
                </Grid>
              ))
            : events.slice(0, 3).map((event: any) => (
                <Grid item key={event.name} xs={12} sm={12} md={4}>
                  <EventCard event={event} setEvent={handleEventClick} />
                </Grid>
              ))}
        </Grid>
        {totalEvents > 3 && (
          <ShowMoreButton showMore={showMore} more={more} remainingEvents={totalEvents - 3} />
        )}
      </Stack>
    </>
  );
}
