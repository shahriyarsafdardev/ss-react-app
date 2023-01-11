import { useRef, useState } from 'react';
import baselineEmail from '@iconify/icons-ic/baseline-email';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import copyFill from '@iconify/icons-eva/copy-fill';
import { atcb_action } from 'add-to-calendar-button';
import moment from 'moment';

import { Typography, Stack, Button, MenuItem } from '@material-ui/core';
import copy from 'clipboard-copy';
import 'add-to-calendar-button/assets/css/atcb.css';

import { useSnackbar } from 'notistack5';
import { StyledModal, Event, StyledButton, StyledIcon } from './Common';
import MenuPopover from '../../components/MenuPopover';
import EventTime from './EventTime';

export default function EventDetails({ setEvent, event }: { setEvent: Function; event: Event }) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const pageURL = `${window.location.origin}/events?event=${event.id}`;
  const eventDate = moment(event.time).format('YYYY-MM-DD');
  const eventStartTime = moment(event.time).format('HH:mm');
  const eventEndTime = moment(event.time).add(2, 'hours').format('HH:mm');

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

  const copyHandler = (description: string | undefined) => {
    copy(pageURL);
    enqueueSnackbar('Invite link copied to clipboard', { variant: 'success' });
  };

  const handleShareToLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${pageURL}`, '_blank');
  };

  const handleShareViaTwitter = (description: string | undefined) => {
    window.open(`https://twitter.com/intent/tweet?text=${getCaption('Twitter')}`, '_blank');
  };

  const handleShareViaEmail = (description: string | undefined) => {
    window.open(`mailto:?body=${getCaption('Email')}`, '_blank');
  };

  return (
    <>
      <MenuPopover
        open={open}
        anchorEl={menuRef.current}
        onClose={() => {
          setOpen(false);
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MenuItem sx={{ py: 2 }} onClick={() => copyHandler(event?.description)}>
          <Stack alignItems="center" direction="row" spacing={2}>
            <StyledIcon icon={copyFill} />
            <Typography>Copy Link to Clipboard</Typography>
          </Stack>
        </MenuItem>

        <MenuItem sx={{ pb: 2 }} onClick={() => handleShareViaEmail(event?.description)}>
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

        <MenuItem sx={{ pb: 2 }} onClick={() => handleShareViaTwitter(event?.description)}>
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
      <StyledModal>
        <Stack textAlign="center" spacing={3}>
          <Typography variant="h4">{event?.name}</Typography>
          <EventTime eventTime={event?.time} />
          <Typography>{event?.description}</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 2 }}>
            <StyledButton
              onClick={(e) => {
                e.preventDefault();
                atcb_action(CalendarEvent);
              }}
              variant="contained"
            >
              Add to your calendar
            </StyledButton>
            <StyledButton variant="outlined" ref={menuRef} onClick={() => setOpen(true)}>
              Share free invite
            </StyledButton>
          </Stack>
        </Stack>
      </StyledModal>
    </>
  );
}
