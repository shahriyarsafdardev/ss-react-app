import { useContext } from 'react';
import { Typography, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useTimer } from 'react-timer-hook';
import moment from 'moment';
import { SessionContext } from 'contexts/CohortContext';

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
  smallContainer: {
    width: '100%',
    height: '230px',
    backgroundColor: '#F3F3FB',
    borderRadius: '25px',
    padding: '10px',
    marginBottom: '10px',
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
  smallTimerRow: {
    display: 'flex',
    padding: '8px 0'
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
  smallContent2: {
    maxWidth: '250px',
    textAlign: 'center',
    paddingBottom: '10px'
  },
  marginTop: {
    marginTop: '5px'
  },
  fieldBox: {
    width: '80px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: '2px'
  },
  smallBtn: {
    backgroundColor: '#4D4DCD',
    padding: '12px 70px',
    color: 'white',
    '&:hover': {
      backgroundColor: '#4D4DCD',
      opacity: 0.9
    }
  },
  primaryBtn: {
    backgroundColor: '#4D4DCD',
    padding: '12px 120px',
    color: 'white',
    '&:hover': {
      backgroundColor: '#4D4DCD',
      opacity: 0.9
    }
  }
}));

const DatePreview = ({ date }: { date: Date }) => {
  const classes = useStyes();

  return (
    <div data-testid="upcoming-session-placeholder">
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
  showSeparator = false,
  testId
}: {
  text: string;
  value: number;
  showSeparator?: boolean;
  testId: string;
}) => {
  const classes = useStyes();
  const formatted = value < 10 ? `0${value}` : value;

  return (
    <div style={{ display: 'flex' }}>
      {showSeparator && <Typography style={{ marginTop: 'auto' }} variant="h2">{` :`}</Typography>}
      <div className={classes.fieldBox}>
        <Typography variant="subtitle2" className={classes.content}>
          {text}
        </Typography>

        <Typography variant="h2" data-testid={testId}>
          {formatted}
        </Typography>
      </div>
    </div>
  );
};

const TimerPreview = ({
  time,
  zoomUrl,
  displayType,
  clickEvent
}: {
  time: Date;
  zoomUrl: string | null;
  displayType: string;
  clickEvent: Function;
}) => {
  const classes = useStyes();
  let d = time;
  d = new Date(d.setMinutes(d.getMinutes()));
  const { sessionNumber } = useContext(SessionContext);

  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: d,
    autoStart: true
  });

  return (
    <div>
      <div className={classes.wrapper}>
        {displayType !== 'small' && (
          <img src="/static/cohorts-home/sessions/ic_recorders.svg" alt="recorder-icon" />
        )}
        <Typography variant="subtitle1">
          {displayType === 'small'
            ? `The ${moment(new Date(time)).format('h a')} session  is opening soon, come join us!`
            : 'This session is starting soon!'}
        </Typography>
        {displayType !== 'small' && (
          <Typography variant="subtitle2" className={classes.marginTop}>
            Passcode: EPBW21
          </Typography>
        )}
        <Box className={displayType === 'small' ? classes.smallTimerRow : classes.timerRow}>
          {displayType !== 'small' && <TimerField text="Hours" value={hours} testId="hours" />}
          <TimerField
            text="Minutes"
            value={minutes}
            showSeparator={displayType !== 'small'}
            testId="minutes"
          />
          <TimerField text="Seconds" value={seconds} showSeparator={true} testId="seconds" />
        </Box>
        {zoomUrl && (
          <Button
            onClick={() => clickEvent(sessionNumber)}
            className={displayType === 'small' ? classes.smallBtn : classes.primaryBtn}
            target="_blank"
            href={`${zoomUrl}`}
            data-testid="session-invite"
          >
            Join Zoom
          </Button>
        )}
      </div>
    </div>
  );
};

const SessionInProgress = ({
  zoomUrl,
  displayType,
  clickEvent,
  sessionTimeValue
}: {
  zoomUrl: string | null;
  displayType: string;
  clickEvent: Function;
  sessionTimeValue: string;
}) => {
  const classes = useStyes();
  const { sessionNumber } = useContext(SessionContext);

  return (
    <div>
      <div className={classes.wrapper}>
        {displayType === 'small' ? (
          <>
            <img src="/static/cohorts-home/sessions/ic_live.svg" alt="live-icon" />
            <Box className={classes.smallContent2}>
              <Typography variant="subtitle1">{`The ${moment(new Date(sessionTimeValue)).format(
                'hh a'
              )} Session is live now!`}</Typography>
            </Box>
          </>
        ) : (
          <>
            <img src="/static/cohorts-home/sessions/ic_recorder.svg" alt="date-icon" />

            <Box className={classes.content2}>
              <Typography variant="subtitle1">
                The session has already started, access the link below to join!
              </Typography>
              <Typography variant="subtitle2" className={classes.marginTop}>
                Passcode: EPBW21
              </Typography>
            </Box>
          </>
        )}
        {zoomUrl && (
          <Button
            className={displayType === 'small' ? classes.smallBtn : classes.primaryBtn}
            onClick={() => clickEvent(sessionNumber)}
            target="_blank"
            href={`${zoomUrl}`}
            data-testid="session-invite"
          >
            Join Zoom
          </Button>
        )}
      </div>
    </div>
  );
};

const ExpiredSession = ({ displayType }: { displayType: string }) => {
  const classes = useStyes();

  return (
    <div>
      <div className={classes.wrapper}>
        <img src="/static/cohorts-home/sessions/ic_dots.svg" alt="date-icon" />
        <Typography
          variant="subtitle1"
          className={displayType === 'small' ? classes.smallContent2 : classes.content2}
          data-testid="session-ended"
        >
          This live session has finished, the recording will be available soon!
        </Typography>
      </div>
    </div>
  );
};

const renderPlaceHolder = (
  displayType: string,
  sessionTimeValue: string,
  sessionZoomUrl: string | null,
  onClick: Function
) => {
  const currentTime = new Date();
  const sessionTime = new Date(sessionTimeValue);

  const difference = +sessionTime - +currentTime;

  if (difference < 0) {
    if (Math.floor((Math.abs(difference) / (1000 * 60 * 60)) % 24) < 2) {
      return (
        <SessionInProgress
          displayType={displayType}
          zoomUrl={sessionZoomUrl}
          clickEvent={onClick}
          sessionTimeValue={sessionTimeValue}
        />
      );
    }
    return <ExpiredSession displayType={displayType} />;
  }

  const daysRemaining = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (daysRemaining >= 1) {
    return <DatePreview date={sessionTime} />;
  }

  if (daysRemaining === 0) {
    return (
      <TimerPreview
        displayType={displayType}
        time={sessionTime}
        zoomUrl={sessionZoomUrl}
        clickEvent={onClick}
      />
    );
  }

  return null;
};

export default function JoinZoomPrompt({
  sessionTimeValue,
  sessionZoomUrl,
  displayType,
  onClick
}: {
  sessionTimeValue: string;
  displayType: string;
  sessionZoomUrl: string | null;
  onClick: Function;
}) {
  const classes = useStyes();

  return (
    <div
      className={displayType === 'small' ? classes.smallContainer : classes.container}
      data-testid="video-place-holder"
    >
      {renderPlaceHolder(displayType, sessionTimeValue, sessionZoomUrl, onClick)}
    </div>
  );
}
