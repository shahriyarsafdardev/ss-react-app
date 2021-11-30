import { styled } from '@material-ui/core/styles';
import { Box, CircularProgress } from '@material-ui/core';

import moment from 'moment';

export const SectionContainer = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  boxShadow: '0px 0px 4px rgba(145, 158, 171, 0.24), 0px 24px 48px rgba(145, 158, 171, 0.24)',
  borderRadius: '16px',
  padding: '20px',
  '&.timeline': {
    height: '150px',
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
  },
  '&.card-3': {
    width: '49%',
    height: '500px',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    [theme.breakpoints.down('sm')]: {
      height: '750px'
    }
  }
}));

const StyledCircularLoader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
}));

const formatList = (list: string[]) =>
  list.length > 2 ? [list.slice(0, -1).join(', '), list.slice(-1)].join(' or ') : list.join(' or ');

export const sortedTimes = (times: string[]) =>
  [...times].sort((a, b) => (moment(a) < moment(b) ? -1 : 1));

export const upcomingTimes = (times: string[]) =>
  sortedTimes(times).filter((time) => moment(time).add(1, 'hours') > moment());

export const firstUpcomingDate = (times: string[]) => {
  const sorted: string[] = sortedTimes(times);
  let firstTime = sorted[sorted.length - 1];
  const upcomings = upcomingTimes(times);
  if (upcomings.length > 0) {
    [firstTime] = upcomings;
  }
  return firstTime;
};

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

export const displayMultipleDates = (times: string[]) => {
  const upcomings = upcomingTimes(times);
  if (upcomings.length === 0) {
    return false;
  }
  if (upcomings.length === 1) {
    return displayDate(upcomings[0]);
  }
  const formattedDates = upcomings.map((time) => moment(time).format('MMM DD'));
  return formatList(formattedDates);
};

export const formatMultipleTimes = (times: string[], sessionLength: string) => {
  const upcomings = upcomingTimes(times);
  if (upcomings.length === 0) {
    return 'Complete';
  }
  if (upcomings.length === 1) {
    return formatTime(upcomings[0], sessionLength);
  }
  const sortedTimeslist = upcomings.map((time) =>
    moment(new Date(time).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })).format(
      'hh:mm a'
    )
  );
  return `${formatList(sortedTimeslist)}  PST`;
};

export const CircularLoader = () => (
  <StyledCircularLoader>
    <CircularProgress />
  </StyledCircularLoader>
);
