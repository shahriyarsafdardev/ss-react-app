import { styled } from '@material-ui/core/styles';
import moment from 'moment';

export const SectionContainer = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  boxShadow: '0px 0px 4px rgba(145, 158, 171, 0.24), 0px 24px 48px rgba(145, 158, 171, 0.24)',
  borderRadius: '16px',
  padding: '20px',
  '&.card-2': {
    width: '49%',
    height: '500px',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  }
}));
export const formatTime = (time: string, sessionLength: string) => {
  const sessionStartTime = moment(time).format('hh:mm a');
  const sessionEndTime = moment(time)
    .add(Number(sessionLength.split(' ')[0]), 'hours')
    .format('hh:mm a');
  if (moment(time) > moment()) {
    return `${sessionStartTime} - ${sessionEndTime}`;
  }
  return 'Complete';
};

export const displayDate = (time: string) => {
  if (moment(time) > moment()) {
    return moment(time).format('dddd, MMM DD');
  }
  return 'Review Content';
};
