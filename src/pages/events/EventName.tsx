import { memo } from 'react';
import { Typography, Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Event } from '../../@types/events';
import { EventHosts, DeatilsText, formatTime, CALENDAR, PUBLIC, PLATEFORM } from './Common';

const StyledCard = styled(Stack)(({ theme }) => ({
  height: '340px',
  width: '100%',
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  position: 'relative',
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    height: 'auto'
  }
}));

const InstructorMessage = styled(Stack)(({ theme }) => ({
  backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/welcome_background.png')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'right',
  padding: '60px 80px 60px 60px',
  borderRadius: '16px',
  width: '50%',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    padding: '30px',
    width: '100%',
    backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/welcome-bg-mbl.png')`,
    backgroundPosition: 'top center',
    flexDirection: 'column',
    height: 'auto'
  }
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '32px',
  lineHeight: '42px',
  color: '#ffffff',
  [theme.breakpoints.down('md')]: {
    fontSize: '24px',
    lineHeight: '30px'
  }
}));

const EventName = ({ event }: { event: Event }) => (
  <>
    <StyledCard>
      <InstructorMessage spacing={2}>
        <StyledTypography>{event.name}</StyledTypography>
      </InstructorMessage>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        width={{ xs: '100%', md: '50%' }}
        sx={{ p: '20px 40px' }}
      >
        {event?.hosts?.length > 0 && <EventHosts hosts={event.hosts.slice(0, 2)} />}
        <Stack width="50%">
          <Stack direction="row" spacing={2} alignItems="left">
            {CALENDAR}&nbsp;&nbsp;
            <DeatilsText>{formatTime(event?.time)}</DeatilsText>
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
    </StyledCard>
  </>
);

export default memo(EventName);
