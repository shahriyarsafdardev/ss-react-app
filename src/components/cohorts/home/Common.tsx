import { styled } from '@material-ui/core/styles';
import { Box, CircularProgress } from '@material-ui/core';

import moment from 'moment';

export const SectionContainer = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  boxShadow: '0px 0px 4px rgba(145, 158, 171, 0.24), 0px 24px 48px rgba(145, 158, 171, 0.24)',
  borderRadius: '16px',
  padding: '20px',
  '&.timeline': {
    height: '200px',
    [theme.breakpoints.down('sm')]: {
      height: '310px'
    }
  },
  '&.card-2': {
    width: '49%',
    height: '500px',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  }
}));

const StyledCircularLoader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
}));

export const formatTime = (time: string, sessionLength: string) => {
  const sessionStartTime = moment(
    new Date(time).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
  ).format('hh:mm a');
  const sessionEndTime = moment(
    new Date(time).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
  )
    .add(Number(sessionLength.split(' ')[0]), 'hours')
    .format('hh:mm a');
  if (moment(time).add(1, 'hours') > moment()) {
    return `${sessionStartTime} - ${sessionEndTime} PST`;
  }
  return 'Complete';
};

export const displayDate = (time: string) => {
  if (moment(time).add(1, 'hours') > moment()) {
    return moment(time).format('dddd, MMM DD');
  }
  return false;
};

export const CircularLoader = () => (
  <StyledCircularLoader>
    <CircularProgress />
  </StyledCircularLoader>
);
