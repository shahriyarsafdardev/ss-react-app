import { Typography, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useTimer } from 'react-timer-hook';
import moment from 'moment';

const useStyes = makeStyles(() => ({
  container: {
    width: '100%',
    height: '400px',
    backgroundColor: '#F3F3FB',
    borderRadius: '25px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  timerRow: {
    display: 'flex',
    padding: '20px 0'
  },
  content: {
    color: '#6C7885'
  },
  content2: {
    maxWidth: '250px',
    textAlign: 'center',
    paddingTop: '20px',
    paddingBottom: '40px'
  },
  fieldBox: {
    width: '90px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: '2px'
  },
  primaryBtn: {
    backgroundColor: '#4D4DCD',
    padding: '12px 120px',
    color: 'white'
  }
}));

const DatePreview = ({ date }: { date: Date }) => {
  const classes = useStyes();

  return (
    <div>
      <div className={classes.wrapper}>
        <img src="/static/cohorts-home/sessions/ic_date.svg" alt="date-icon" />
        <Typography variant="body2" className={classes.content}>
          This session starts on the
        </Typography>
        <Typography variant="h2">{moment(date).format('Do MMMM')}</Typography>
        <Typography variant="body2" className={classes.content}>
          at {moment(date).format('HH:mm')}
        </Typography>
      </div>
    </div>
  );
};

const TimerField = ({
  text,
  value,
  showSeparator = false
}: {
  text: string;
  value: number;
  showSeparator?: boolean;
}) => {
  const classes = useStyes();
  const formatted = value < 10 ? `0${value}` : value;

  return (
    <div className={classes.fieldBox}>
      <Typography variant="subtitle2" className={classes.content}>
        {text}
      </Typography>
      <Typography variant="h2">
        {formatted}
        {showSeparator && ' :'}
      </Typography>
    </div>
  );
};

const TimerPreview = ({ time }: { time: Date }) => {
  const classes = useStyes();
  let d = time;
  d = new Date(d.setMinutes(d.getMinutes() - 130));

  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: d,
    autoStart: true
  });

  return (
    <div>
      <div className={classes.wrapper}>
        <img src="/static/cohorts-home/sessions/ic_recorders.svg" alt="recorder-icon" />
        <Typography variant="subtitle1">This session starts in</Typography>
        <Box className={classes.timerRow}>
          <TimerField text="Hours" value={hours} showSeparator={true} />
          <TimerField text="Minutes" value={minutes} showSeparator={true} />
          <TimerField text="Seconds" value={seconds} />
        </Box>
        <Button className={classes.primaryBtn}>Join Zoom</Button>
      </div>
    </div>
  );
};

const SessionInProgress = () => {
  const classes = useStyes();

  return (
    <div>
      <div className={classes.wrapper}>
        <img src="/static/cohorts-home/sessions/ic_recorder.svg" alt="date-icon" />
        <Typography variant="subtitle1" className={classes.content2}>
          The session has already started, access the link below to join!
        </Typography>
        <Button className={classes.primaryBtn}>Join Zoom</Button>
      </div>
    </div>
  );
};

const ExpiredSession = () => {
  const classes = useStyes();

  return (
    <div>
      <div className={classes.wrapper}>
        <img src="/static/cohorts-home/sessions/ic_dots.svg" alt="date-icon" />
        <Typography variant="subtitle1" className={classes.content2}>
          This live session has concluded, the recording will be available soon!
        </Typography>
      </div>
    </div>
  );
};

const renderPlaceHolder = (sessionTimeValue: string) => {
  const currentTime = new Date();
  const sessionTime = new Date(sessionTimeValue);

  const difference = +sessionTime - +currentTime;

  if (difference < 0) {
    if (Math.floor((Math.abs(difference) / (1000 * 60 * 60)) % 24) < 2) {
      return <SessionInProgress />;
    }
    return <ExpiredSession />;
  }

  const daysRemaining = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (daysRemaining >= 1) {
    return <DatePreview date={sessionTime} />;
  }

  if (daysRemaining === 0) {
    return <TimerPreview time={sessionTime} />;
  }

  return null;
};

export default function VideoPlaceHolder({ sessionTimeValue }: { sessionTimeValue: string }) {
  const classes = useStyes();

  return <div className={classes.container}>{renderPlaceHolder(sessionTimeValue)}</div>;
}
