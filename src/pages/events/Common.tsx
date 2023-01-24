import { styled } from '@material-ui/core/styles';
import {
  Card,
  Stack,
  Button,
  Avatar,
  Box,
  Link,
  Typography,
  ToggleButton
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Icon from '@iconify/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import moment from 'moment';
import { Modal } from 'components/animate';
import { RegisterForm } from 'components/authentication/register';
import { PATH_AUTH } from 'routes/paths';
import { trackEvent } from 'utils/eventTracking';
import { useEffect } from 'react';
import { EventHost } from '../../@types/events';

export const CALENDAR = '🗓️';
export const LOCK = '🔒';
export const PUBLIC = '🌎';
export const PLATEFORM = '📍';

export type Event = {
  id: string;
  name: string;
  time: string;
  description: string;
};

export const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  height: '100%',
  boxShadow: 'none',
  border: '1px solid #E2E8F0',
  '&:hover': {
    boxShadow: '0px 2px 9px rgba(7, 26, 51, 0.1)',
    cursor: 'pointer'
  }
}));

export const StyledModal = styled(Modal)(({ theme }) => ({
  width: '60% !important',
  minWidth: '600px',
  margin: 'auto',
  [theme.breakpoints.down('md')]: {
    width: '90% !important',
    minWidth: '90%'
  },
  [theme.breakpoints.down('md')]: {
    width: '95% !important',
    minWidth: '95%'
  }
}));

export const StyledImage = styled(LazyLoadImage)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  aspectRatio: '37/21'
}));

export const TileImage = styled(LazyLoadImage)(({ theme }) => ({
  width: '25%',
  height: 'auto',
  aspectRatio: '37/21',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export const StyledDetailsImage = styled(LazyLoadImage)(({ theme }) => ({
  width: '50%',
  height: 'auto',
  borderRadius: '20px',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export const StyledIcon = styled(Icon)(({ theme }) => ({
  width: '24px',
  height: '24px',
  color: '#754AA9'
}));

export const StyledTime = styled(Stack)(({ theme }) => ({
  backgroundColor: '#F6F7F8',
  borderRadius: '8px',
  padding: '5px 10px'
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '46px',
  borderRadius: '30px'
}));

export const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));

export const CardText = styled(Typography)(({ theme }) => ({
  color: '#000',
  fontSize: '14px'
}));

export const DeatilsText = styled(Typography)(({ theme }) => ({
  color: '#000',
  fontSize: '16px'
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  color: '#222C36',
  fontSize: '18px',
  fontWeight: 900
}));

export const ModalText = styled(Typography)(({ theme }) => ({
  color: '#212B36',
  fontSize: '18px',
  fontWeight: 700
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  color: '#222C36',
  fontWeight: 900,
  fontSize: '24px'
}));

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  backgroundColor: 'rgba(225, 228, 231, 0.3)',
  padding: '10px 18px',
  border: 'none',
  borderRadius: '10px !important',
  marginLeft: '0 !important',
  marginRight: '15px',
  marginTop: '10px',
  textTransform: 'none',
  '&.Mui-selected': {
    backgroundColor: 'lightgrey'
  }
}));

export const ToggleButtonText = styled(Typography)(({ theme }) => ({
  color: '#334155',
  fontSize: '14px'
}));

export const getLocalTimeZone = () =>
  new Date()
    .toString()
    .split(/[(,)]+/)[1]
    .match(/\b(\w)/g)
    ?.join('');

export const formatTime = (eventTime: string) => moment(eventTime).format('MMM D, YYYY @ h:mm a z');

export const getAccessText = (accessType: string) => {
  if (accessType === 'public') {
    return (
      <>
        {PUBLIC}&nbsp;&nbsp;
        <CardText className="accessText">Open to Everyone</CardText>
      </>
    );
  }
  if (accessType === 'alumni') {
    return (
      <>
        {LOCK}&nbsp;&nbsp;
        <CardText className="accessText">Open to Sphere alumni only</CardText>
      </>
    );
  }
  return (
    <>
      {LOCK}&nbsp;&nbsp;
      <CardText className="accessText">Open to learners enrolled in {accessType}</CardText>
    </>
  );
};

export const EventHosts = ({ hosts }: { hosts: EventHost[] }) => (
  <Stack sx={{ mb: 2 }} spacing={2}>
    {hosts.map((host: EventHost) => (
      <Stack key={host.name} direction="row" spacing={2.5} sx={{ alignItems: 'center' }}>
        <Avatar src={host?.picture_url} alt={host?.name} sx={{ width: 50, height: 50 }} />
        <Stack>
          <DeatilsText>{host?.name}</DeatilsText>
          <Typography>
            {host?.position}
            {host.company && `@ ${host.company}`}
          </Typography>
        </Stack>
      </Stack>
    ))}
  </Stack>
);

export const communityEventProperties = (event: any) => ({
  'Event Type': eventType(event?.access_type),
  'Event Title': event.name,
  'Event Hosts': JSON.stringify(event.hosts.map((host: any) => host?.name)),
  'Event Date': new Date(event.time),
  'Event Time': new Date(event.time).toLocaleTimeString(),
  'Event Permissions': event.access_type,
  'Event Location': event.location
});

export const additionalCommunityEventProperties = (event: any) => {
  const eventData = localStorage.getItem(event.id);
  const { source, referrer, referrer_domain } = JSON.parse(eventData || '');
  let hoursBeforeEvent = null;
  let hoursAfterEvent = null;
  const currentTime = new Date();
  const eventTime = new Date(event.time);
  if (currentTime > eventTime) {
    hoursAfterEvent = Math.floor((currentTime.getTime() - eventTime.getTime()) / 36e5);
  } else {
    hoursBeforeEvent = Math.floor((eventTime.getTime() - currentTime.getTime()) / 36e5);
  }

  return {
    'Hours Before Event Starts': hoursBeforeEvent,
    'Hours After Event Finished': hoursAfterEvent,
    Source: source,
    Referrer: referrer,
    'Referrer Domain': referrer_domain
  };
};

export const eventType = (eventAccessType: any) =>
  ['alumni', 'public'].includes(eventAccessType) ? 'Event' : 'Session';

export const ModalForm = ({
  formType,
  eventDetails,
  isAuthenticated,
  registrationSuccess,
  setFormType
}: {
  formType: string;
  eventDetails: any;
  isAuthenticated: boolean;
  registrationSuccess: Function;
  setFormType: Function;
}) => {
  const trackModalEvents = (eventName: string) => {
    if (['learner', 'alumni'].includes(formType)) {
      trackEvent(null, eventName, communityEventProperties(eventDetails));
    }
  };

  useEffect(() => {
    trackModalEvents(`All Events Page - ${formType.toUpperCase()} only modal - Opened`);
  }, []);

  if (formType === 'register') {
    return <RegisterForm setFormType={setFormType} />;
  }
  if (formType === 'registrationSuccess') {
    return (
      <Stack textAlign="center" spacing={4}>
        <ModalText>Your information has been saved!</ModalText>
        <ModalText>
          Now, you can add Sphere’s events to your calendar and share them with friends or
          colleagues.
        </ModalText>
        <StyledButton variant="contained" onClick={() => registrationSuccess()}>
          Continue
        </StyledButton>
      </Stack>
    );
  }
  if (formType === 'alumni') {
    return (
      <Stack textAlign="center" spacing={4}>
        <ModalText>{eventDetails.name} is only open to Sphere alumni.</ModalText>
        <Typography>
          Explore Sphere’s courses to learn more about becoming a member of Sphere’s exclusive
          community of learners.
        </Typography>
        <Button
          component={RouterLink}
          to="/all-courses"
          variant="outlined"
          sx={{ height: '46px', width: '100%', borderRadius: '30px', color: '#754AA9' }}
        >
          Explore Sphere Courses
        </Button>
        {!isAuthenticated && (
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            width="100%"
            alignItems="center"
            sx={{ m: 'auto' }}
          >
            Are you a Sphere alum?&nbsp;
            <Link
              component={RouterLink}
              variant="subtitle2"
              to={PATH_AUTH.login}
              sx={{ textDecoration: 'underline' }}
              onClick={() =>
                trackModalEvents('All Events Page - Alumni only modal - Sign In Link Selected')
              }
            >
              Sign in here
            </Link>
          </Stack>
        )}
      </Stack>
    );
  }
  if (formType === 'learner') {
    return (
      <Stack textAlign="center" spacing={4}>
        <ModalText>
          {eventDetails.name} is only open to learners enrolled in&nbsp;
          <Link
            variant="subtitle2"
            href={eventDetails.cohort_link}
            target="_blank"
            sx={{ fontSize: '18px', fontWeight: 700, textDecoration: 'underline' }}
          >
            {eventDetails.access_type}
          </Link>
        </ModalText>
        <Typography>
          Sphere’s courses provide access to extensive curricula and resources curated by
          world-class instructors who are leaders in their industries.
        </Typography>
        <Button
          component={RouterLink}
          to="/all-courses"
          variant="outlined"
          sx={{ height: '46px', width: '100%', borderRadius: '30px', color: '#754AA9' }}
          onClick={() => {
            trackModalEvents(
              'All Events Page - Learner only modal - "Explore Sphere Courses" Button Selected'
            );
          }}
        >
          Explore Sphere Courses
        </Button>
        {!isAuthenticated && (
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            width="100%"
            alignItems="center"
            justifyContent="center"
            sx={{ m: 'auto' }}
          >
            Are you enrolled in this cohort?&nbsp;
            <Link
              component={RouterLink}
              variant="subtitle2"
              to={PATH_AUTH.login}
              sx={{ textDecoration: 'underline' }}
              onClick={() =>
                trackModalEvents('All Events Page - Learners only modal - Sign In Link Selected')
              }
            >
              Sign in here
            </Link>
          </Stack>
        )}
      </Stack>
    );
  }
  return <></>;
};
