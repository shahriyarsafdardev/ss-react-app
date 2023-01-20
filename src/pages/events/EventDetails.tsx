import { useRef, useState } from 'react';
import baselineEmail from '@iconify/icons-ic/baseline-email';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import copyFill from '@iconify/icons-eva/copy-fill';
import { atcb_action } from 'add-to-calendar-button';
import moment from 'moment';
import ReactPlayer from 'react-player';
import { RegisterForm } from 'components/authentication/register';
import {
  Typography,
  Stack,
  Card,
  Button,
  useMediaQuery,
  useTheme,
  MenuItem
} from '@material-ui/core';
import copy from 'clipboard-copy';
import 'add-to-calendar-button/assets/css/atcb.css';
import { useSnackbar } from 'notistack5';
import useAuth from 'hooks/useAuth';
import { VideoPlayerWrapper, StyledVideoPreview } from '../dashboard/cohorts/sessions/Common';
import { Event } from '../../@types/events';
import './styles.css';
import {
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
import MenuPopover from '../../components/MenuPopover';

export default function EventDetails({ setEvent, event }: { setEvent: Function; event: Event }) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const { setIsAuthenticated, user } = useAuth();
  const [modalState, setModalState] = useState(false);
  const [formType, setFormType] = useState('');
  const menuRef = useRef(null);
  const pageURL = `${window.location.origin}/events/${event.id}`;
  const eventDate = moment(event.time).format('YYYY-MM-DD');
  const eventStartTime = moment(event.time).format('HH:mm');
  const eventEndTime = moment(event.time).add(2, 'hours').format('HH:mm');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const CalendarEvent = {
    name: event.name,
    description: event.description,
    startDate: eventDate,
    endDate: eventDate,
    startTime: eventStartTime,
    endTime: eventEndTime,
    options: ['Apple', 'Google', 'iCal', 'Microsoft365', 'Outlook.com', 'Yahoo'],
    timeZone: 'America/Los_Angeles',
    iCalFileName: event?.name
  };

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

  return (
    <>
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
      <Button
        sx={{ marginBottom: '20px', width: 'fit-content' }}
        variant="text"
        onClick={() => setEvent({})}
      >
        {'< Back to all Events'}
      </Button>
      <Card sx={{ width: '100%', p: '40px' }}>
        <Stack alignItems="flex-start" spacing={3}>
          <Typography variant="h4">{event?.name}</Typography>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            spacing={3}
          >
            <Stack
              direction={isMobile || !!event?.recording_url ? 'row' : 'column'}
              justifyContent={isMobile || !!event?.recording_url ? 'space-between' : 'flex-start'}
              spacing={2}
              width={isMobile || !!event?.recording_url ? '100%' : '50%'}
            >
              {event.hosts.length > 0 && <EventHosts hosts={event.hosts} />}
              <Stack width="50%">
                <Stack direction="row" spacing={2} alignItems="left">
                  {CALENDAR}&nbsp;&nbsp;
                  <DeatilsText>{formatTime(event.time)}</DeatilsText>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="left">
                  {PUBLIC}&nbsp;&nbsp;
                  <DeatilsText>Open to Everyone</DeatilsText>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="left">
                  {PLATEFORM}&nbsp;&nbsp;
                  <DeatilsText>Via Zoom</DeatilsText>
                </Stack>
              </Stack>
            </Stack>
            {!event.recording_url && (
              <StyledDetailsImage src={event.thumbnail_url} alt="thumbnail" />
            )}
          </Stack>
          {event.recording_url && (
            <>
              {event.recording_url?.includes('vimeo') ? (
                <VideoPlayerWrapper>
                  <ReactPlayer
                    controls={true}
                    url={event.recording_url}
                    sx={{ maxWidth: '100%' }}
                  />
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

          <Typography>{event?.description}</Typography>
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
        </Stack>
      </Card>
    </>
  );
}
