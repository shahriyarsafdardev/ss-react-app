import moment from 'moment';
import { Typography } from '@material-ui/core';
import { StyledTime } from './Common';

export default function EventTime({ eventTime }: { eventTime: string | undefined }) {
  return (
    <StyledTime textAlign="center">
      <Typography>{moment(eventTime).format('dddd, D MMM YYYY')}</Typography>
      <Typography>{moment(eventTime).format('h:mm a')}</Typography>
    </StyledTime>
  );
}
