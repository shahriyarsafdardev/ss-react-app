import { styled } from '@material-ui/core/styles';
import { Card, Stack, Button, Avatar, Box, Typography, ToggleButton } from '@material-ui/core';
import Icon from '@iconify/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import moment from 'moment';
import { Modal } from 'components/animate';
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
  margin: 'auto'
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
  borderRadius: '30px'
}));

export const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));

export const CardText = styled(Typography)(({ theme }) => ({
  color: '#000',
  fontSize: '14px',
  marginLeft: '10px'
}));
export const DeatilsText = styled(Typography)(({ theme }) => ({
  color: '#000',
  fontSize: '16px',
  fontWeight: 700
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
  textTransform: 'none'
}));

export const ToggleButtonText = styled(Typography)(({ theme }) => ({
  color: '#334155',
  fontSize: '14px'
}));

export const formatTime = (eventTime: string) => moment(eventTime).format('MMM D, YYYY @ ha zz');

export const getAccessText = (accessType: string) => {
  if (accessType === 'public') {
    return (
      <Stack direction="row" spacing={2} alignItems="left">
        {PUBLIC}
        <CardText>Open to Everyone</CardText>
      </Stack>
    );
  }
  if (accessType === 'alumni') {
    return (
      <Stack direction="row" spacing={2} alignItems="baseline">
        {LOCK}
        <CardText>Open to Sphere alumni only</CardText>
      </Stack>
    );
  }
  return (
    <Stack direction="row" spacing={2} alignItems="baseline">
      {LOCK}
      <CardText>Open to learners enrolled in {accessType}</CardText>
    </Stack>
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
