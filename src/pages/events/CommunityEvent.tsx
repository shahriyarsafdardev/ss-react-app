import { useRef, useEffect, useState } from 'react';
import baselineEmail from '@iconify/icons-ic/baseline-email';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import copyFill from '@iconify/icons-eva/copy-fill';
import LoadingScreen from 'components/LoadingScreen';
import Page from 'components/Page';
import { atcb_action } from 'add-to-calendar-button';
import moment from 'moment';
import axiosV2 from 'utils/axiosV2';
import ReactPlayer from 'react-player';
import { RegisterForm } from 'components/authentication/register';
import {
  Typography,
  Stack,
  Card,
  useMediaQuery,
  Grid,
  useTheme,
  MenuItem
} from '@material-ui/core';
import copy from 'clipboard-copy';
import 'add-to-calendar-button/assets/css/atcb.css';
import { useSnackbar } from 'notistack5';
import useAuth from 'hooks/useAuth';
import EventName from './EventName';
import {
  SectionTitle,
  LoadingContainer,
  StyledButton,
  StyledModal,
  StyledIcon,
  DeatilsText,
  EventHosts,
  formatTime,
  StyledDetailsImage,
  ModalText,
  CALENDAR,
  PUBLIC,
  PLATEFORM
} from './Common';
import EventCard from './EventCard';
import { Event } from '../../@types/events';
import { VideoPlayerWrapper, StyledVideoPreview } from '../dashboard/cohorts/sessions/Common';

import './styles.css';

import MenuPopover from '../../components/MenuPopover';

export default function CommuityEvent() {
  const { enqueueSnackbar } = useSnackbar();
  const [event, setEvent] = useState<Event | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const eventID = window.location.pathname.split('/')[2] || '';
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const { setIsAuthenticated, user } = useAuth();
  const [modalState, setModalState] = useState(false);
  const [formType, setFormType] = useState('');
  const menuRef = useRef(null);
  const pageURL = `${window.location.origin}/events?event=${event?.id}`;
  const eventDate = moment(event?.time).format('YYYY-MM-DD');
  const eventStartTime = moment(event?.time).format('HH:mm');
  const eventEndTime = moment(event?.time).add(2, 'hours').format('HH:mm');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const CalendarEvent = {
    name: event?.name,
    description: event?.description,
    startDate: eventDate,
    endDate: eventDate,
    startTime: eventStartTime,
    endTime: eventEndTime,
    options: ['Apple', 'Google', 'iCal', 'Microsoft365', 'Outlook.com', 'Yahoo'],
    timeZone: 'America/Los_Angeles',
    iCalFileName: event?.name
  };

  useEffect(() => {
    const getEvent = async () => {
      await axiosV2.get(`/events/${eventID}.json`).then((res) => {
        setEvent(res.data.event);
        setUpcomingEvents(res.data.upcoming_events);
        setLoading(false);
      });
    };
    !!eventID && getEvent();

    return () => {
      setEvent(null);
    };
  }, [eventID]);

  const getCaption = (media: string) =>
    `${event?.name}%0D%0A%0D%0A${
      media === 'Twitter' && event?.description && event?.description?.length > 120
        ? `${event?.description?.slice(0, 120)}...`
        : event?.description
    }%0D%0A%0D%0A${pageURL}`;

  const copyHandler = () => {
    copy(pageURL);
    enqueueSnackbar('Invite link copied to clipboard', { variant: 'success' });
  };

  const handleShareToLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${pageURL}`, '_blank');
  };

  const handleShareViaTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${getCaption('Twitter')}`, '_blank');
  };

  const handleShareViaEmail = () => {
    window.open(`mailto:?body=${getCaption('Email')}`, '_blank');
  };

  const handleFreeInvite = () => {
    if (user?.type) {
      setOpen(true);
    } else {
      setFormType('register');
      setModalState(true);
    }
  };
  const handleAddToCalendar = (e: any) => {
    if (user?.type) {
      e.preventDefault();
      atcb_action(CalendarEvent);
    } else {
      setFormType('register');
      setModalState(true);
    }
  };

  const registrationSuccess = () => {
    setModalState(false);
    setIsAuthenticated();
  };

  const getModalForm = () => {
    switch (formType) {
      case 'register':
        return <RegisterForm setFormType={setFormType} />;
      case 'registrationSuccess':
        return (
          <Stack textAlign="center" spacing={4}>
            <ModalText>Your information has been saved!</ModalText>
            <ModalText>
              Now, you can add Sphere’s events to your calendar and share them with friends or
              colleagues.
            </ModalText>
            <StyledButton variant="contained" onClick={registrationSuccess}>
              Continue
            </StyledButton>
          </Stack>
        );
      default:
        return <></>;
    }
  };

  if (loading || !event) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <Page title={`Event | ${event?.name}`} sx={{ maxWidth: '1200px', m: 'auto' }}>
      <StyledModal
        open={modalState}
        onClose={() => {
          setModalState(false);
        }}
        zIndex={1400}
      >
        <Card sx={{ p: { xs: 3, md: 10 }, height: 1, overflow: 'visible' }}>{getModalForm()}</Card>
      </StyledModal>
      <MenuPopover
        open={open}
        anchorEl={menuRef.current}
        onClose={() => {
          setOpen(false);
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MenuItem sx={{ py: 2 }} onClick={copyHandler}>
          <Stack alignItems="center" direction="row" spacing={2}>
            <StyledIcon icon={copyFill} />
            <Typography>Copy Link to Clipboard</Typography>
          </Stack>
        </MenuItem>

        <MenuItem sx={{ pb: 2 }} onClick={handleShareViaEmail}>
          <Stack alignItems="center" direction="row" spacing={2}>
            <StyledIcon icon={baselineEmail} />
            <Typography> Share via Email</Typography>
          </Stack>
        </MenuItem>

        <MenuItem sx={{ pb: 2 }} onClick={handleShareToLinkedin}>
          <Stack alignItems="center" direction="row" spacing={2}>
            <StyledIcon icon={linkedinFill} />
            <Typography>Share via LinkedIn</Typography>
          </Stack>
        </MenuItem>

        <MenuItem sx={{ pb: 2 }} onClick={handleShareViaTwitter}>
          <Stack alignItems="center" direction="row" spacing={2}>
            <StyledIcon icon={twitterFill} />
            <Typography>Share via Twitter</Typography>
          </Stack>
        </MenuItem>
      </MenuPopover>
      <Stack direction="column" spacing={3} width="95%" sx={{ m: 'auto', pb: 5 }}>
        <EventName event={event} />
        {event.recording_url && (
          <>
            {event.recording_url?.includes('vimeo') ? (
              <VideoPlayerWrapper>
                <ReactPlayer controls={true} url={event.recording_url} sx={{ maxWidth: '100%' }} />
              </VideoPlayerWrapper>
            ) : (
              <StyledVideoPreview
                src={event.recording_url}
                poster={event.thumbnail_url}
                onContextMenu={(e) => {
                  e.preventDefault();
                  return false;
                }}
                controls
                controlsList="nodownload"
                autoPlay={false}
                data-testid="event-recording-url"
              />
            )}
          </>
        )}
        <Card sx={{ width: '100%', p: '40px' }}>
          <Typography sx={{ mb: 3 }}>{event.description}</Typography>
          <Stack width="100%" direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 2 }}>
            <StyledButton onClick={(e) => handleAddToCalendar(e)} variant="outlined">
              Add to your calendar
            </StyledButton>
            <StyledButton
              variant="contained"
              ref={menuRef}
              onClick={handleFreeInvite}
              sx={{ backgroundColor: '#754AA9' }}
            >
              Share free invite
            </StyledButton>
          </Stack>
        </Card>
        {upcomingEvents.length > 0 && (
          <Stack sx={{ mb: 3, m: 'auto' }} width="100%">
            <SectionTitle>More Upcoming Events</SectionTitle>
            <Grid container spacing={3} sx={{ marginTop: '20px' }}>
              {upcomingEvents.map((event: any) => (
                <Grid key={event.name} item xs={12} md={6}>
                  <EventCard event={event} setEvent={setEvent} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        )}
      </Stack>
    </Page>
  );
}
