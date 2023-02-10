import { memo, useEffect, useState } from 'react';
import { Typography, Stack, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import moment from 'moment';
import useAuth from 'hooks/useAuth';
import { Event } from '../../@types/events';
import {
  EventHosts,
  DeatilsText,
  formatTime,
  getAccessText,
  CALENDAR,
  PLATEFORM,
  getLocalTimeZone
} from './Common';

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

const EventNameText = styled(Stack)(({ theme }) => ({
  backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/welcome_background.png')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'right',
  padding: '60px 80px 60px 60px',
  borderRadius: '16px',
  width: '50%',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    padding: '60px 30px 30px',
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

const EventName = ({
  event,
  isAuthenticated,
  openModal
}: {
  event: Event;
  isAuthenticated: boolean;
  openModal: Function;
}) => {
  const showButton =
    moment(event?.time).subtract(30, 'minutes') <= moment() &&
    moment() <= moment(event?.time).add(2, 'hours');

  const handleButtonClick = () => {
    if (isAuthenticated) {
      window.open(event.zoom_url, '_blank');
    } else {
      openModal();
    }
  };
  return (
    <>
      <StyledCard>
        {event?.is_registered && (
          <img
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/registered-event.svg"
            alt="event check"
            style={{ position: 'absolute', top: '20px' }}
          />
        )}
        <EventNameText spacing={2}>
          <StyledTypography>{event.name}</StyledTypography>
        </EventNameText>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          spacing={3}
          width={{ xs: '100%', md: '50%' }}
          sx={{ p: { md: '20px 40px', xs: '20px' } }}
        >
          {event?.hosts?.length > 0 && <EventHosts hosts={event.hosts.slice(0, 2)} />}
          <Stack width={{ xs: '100%', md: '100%' }}>
            <Stack direction="row" spacing={2} alignItems="left">
              {CALENDAR}&nbsp;&nbsp;
              <DeatilsText sx={{ fontWeight: 700 }}>{`${formatTime(
                event?.time
              )} ${getLocalTimeZone()}`}</DeatilsText>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              alignItems="left"
              sx={{
                '& .accessText': { fontSize: '16px !important' }
              }}
              width="100%"
            >
              {getAccessText(event?.access_type)}
            </Stack>
            {event.location && (
              <Stack direction="row" spacing={2} alignItems="left">
                {PLATEFORM}&nbsp;&nbsp;
                <DeatilsText>{event.location}</DeatilsText>
              </Stack>
            )}
          </Stack>
          {showButton && (!isAuthenticated || (isAuthenticated && event?.zoom_url)) && (
            <Button
              variant="outlined"
              onClick={handleButtonClick}
              sx={{ width: '100%', height: '46px', borderRadius: '30px' }}
            >
              Join Event
            </Button>
          )}
        </Stack>
      </StyledCard>
    </>
  );
};

export default memo(EventName);
