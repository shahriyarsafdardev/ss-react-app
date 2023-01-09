import moment from 'moment';
import { Typography } from '@material-ui/core';
import { StyledTime } from './Common';

export default function EventTime({ eventTime }: { eventTime: string | undefined }) {
  const time = moment(eventTime, 'ddd, DD MMM YYYY HH:mm:ss ZZ');
  return (
    <StyledTime textAlign="center">
      <Typography>{time.format('dddd, D MMM YYYY')}</Typography>
      <Typography>{time.format('h:mm a')}</Typography>
    </StyledTime>
  );
}
