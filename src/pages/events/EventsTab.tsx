import { useState, useEffect } from 'react';
import { Container, Stack, Card, Typography, Link, Box } from '@material-ui/core';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LoadingScreen from 'components/LoadingScreen';
import { getEvents, getAllEvents } from 'redux/slices/event';
import Page from 'components/Page';
import useAuth from 'hooks/useAuth';
import { PATH_AUTH } from 'routes/paths';
import { Event } from '../../@types/events';
import { LoadingContainer, StyledModal, ModalText, StyledButton } from './Common';
import { RootState, useSelector, useDispatch } from '../../redux/store';
import EventSection from './EventSection';
import UpcomingEvents from './UpcomingEvents';
import EventFilters from './EventFilters';
import EventsHeaderSection from './EventsHeaderSection';

export default function EventsTab() {
  const [eventDetails, setEventDetails] = useState<Event | any>({});
  const [selectedFilters, setSelectedFilters] = useState([]);
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const { upcomingEvents, pastEvents, totalUpcomingEvents, totalPastEvents } = useSelector(
    (state: RootState) => state?.event
  );
  const navigate = useNavigate();
  const [modalState, setModalState] = useState(false);
  const [formType, setFormType] = useState('');

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

  const getModalForm = () => {
    switch (formType) {
      case 'alumni':
        return (
          <Stack textAlign="center" spacing={4}>
            <ModalText>{eventDetails.name} is only open to Sphere alumni.</ModalText>
            <Typography>
              Explore Sphere’s courses to learn more about becoming a member of Sphere’s exclusive
              community of learners.
            </Typography>
            <StyledButton variant="outlined" onClick={() => {}}>
              Explore Sphere Courses
            </StyledButton>
            {!isAuthenticated && (
              <Box>
                Are you a Sphere alum?&nbsp;
                <Link
                  component={RouterLink}
                  variant="subtitle2"
                  to={PATH_AUTH.login}
                  sx={{ textDecoration: 'underline' }}
                >
                  Sign in here
                </Link>
              </Box>
            )}
          </Stack>
        );
      case 'learner':
        return (
          <Stack textAlign="center" spacing={4}>
            <ModalText>
              {eventDetails.name} is only open to learners enrolled in {eventDetails.access_type}
            </ModalText>
            <Typography>
              Sphere’s courses provide access to extensive curricula and resources curated by
              world-class instructors who are leaders in their industries.
            </Typography>
            <StyledButton variant="outlined" onClick={() => {}}>
              Explore Sphere Courses
            </StyledButton>
            {!isAuthenticated && (
              <Box>
                Are you enrolled in this cohort?&nbsp;
                <Link
                  component={RouterLink}
                  variant="subtitle2"
                  to={PATH_AUTH.login}
                  sx={{ textDecoration: 'underline' }}
                >
                  Sign in here
                </Link>
              </Box>
            )}
          </Stack>
        );
      default:
        return <></>;
    }
  };

  return (
    <Page title="Sphere | Events">
      <StyledModal
        open={modalState}
        onClose={() => {
          setModalState(false);
        }}
        zIndex={1400}
      >
        <Card sx={{ p: { xs: 3, md: 10 }, height: 1, overflow: 'visible' }}>{getModalForm()}</Card>
      </StyledModal>
      <Container sx={{ paddingBottom: '100px' }}>
        <EventsHeaderSection />
        <EventFilters selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
        {totalUpcomingEvents > 0 && (
          <UpcomingEvents
            events={upcomingEvents}
            category="Upcoming Events"
            totalEvents={totalUpcomingEvents}
            setEvent={handleEventClick}
            handleShowMore={() => handleShowMore('upcoming')}
          />
        )}
        {totalPastEvents > 0 && (
          <EventSection
            events={pastEvents}
            category="Event Recordings"
            totalEvents={totalPastEvents}
            setEvent={handleEventClick}
            handleShowMore={() => handleShowMore('past')}
          />
        )}
      </Container>
    </Page>
  );
}
