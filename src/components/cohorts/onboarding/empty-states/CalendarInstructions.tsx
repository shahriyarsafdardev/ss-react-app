import { Theme, styled } from '@material-ui/core/styles';
import { Typography, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Roboto',
    marginBottom: '100px'
  },
  textone: {
    marginTop: '50px',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '28px',
    textAlign: 'center'
  },
  texttwo: {
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '30px',
    textAlign: 'left'
  },
  col4: {
    maxWidth: '45%',
    [theme.breakpoints.down(1000)]: {
      maxWidth: '80%'
    }
  },
  section: {
    maxWidth: '900px',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down(1000)]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    }
  },
  mt5: {
    marginTop: '30px'
  }
}));

const CalendarInstructions = ({
  calendarUrl,
  onBack
}: {
  calendarUrl: string;
  onBack: Function;
}) => {
  const classes = useStyles();

  const googleCalendar = () => (
    <Box className={classes.col4}>
      <Typography variant="h4" textAlign="center">
        Google Calendar
      </Typography>
      <Box className={classes.mt5}>
        <p className={classes.texttwo}>On Web:</p>
        <ol>
          <li>Click on “Add other calendars” next to the “Other calendars” heading.</li>
          <li>Click on “From URL”.</li>
          <li>Paste in “{calendarUrl}”</li>
          <li>Press “Save”</li>
        </ol>
      </Box>
      <Box className={classes.mt5}>
        <p className={classes.texttwo}>On iOS:</p>
        <ol>
          <li>Follow the above process on web.</li>
          <li>
            You may need to visit https://calendar.google.com/calendar/syncselect and turn on
            syncing for the cohort calendar.
          </li>
        </ol>
      </Box>
      <Box className={classes.mt5}>
        <p className={classes.texttwo}>On Android:</p>
        <ol>
          <li>Follow the above process on web.</li>
          <li>
            You may need to turn on syncing in your Calendar app. In the sidebar, click on
            “Settings”, tap on the imported calendar, and then toggle on “Sync.”
          </li>
        </ol>
      </Box>
    </Box>
  );

  const ical = () => (
    <Box className={classes.col4}>
      <Typography variant="h4" textAlign="center">
        iCal
      </Typography>
      <Box className={classes.mt5}>
        <p className={classes.texttwo}>On desktop:</p>
        <ol>
          <li>Click File {'>'} New Calendar Subscription.</li>
          <li>Paste “{calendarUrl}”</li>
          <li>Press “Save”</li>
        </ol>
      </Box>
      <Box className={classes.mt5}>
        <p className={classes.texttwo}>On mobile:</p>
        <ol>
          <li>Open the Settings app.</li>
          <li>Tap on “Accounts & Passwords”.</li>
          <li>Tap on “Add Account”.</li>
          <li>Tap on “Other”.</li>
          <li>Tap on “Add Subscribed Calendar”.</li>
          <li>Paste “{calendarUrl}” into the Server field</li>
          <li>Add a description</li>
          <li>Press “Save”</li>
        </ol>
      </Box>
    </Box>
  );

  return (
    <div className={classes.wrapper}>
      <Typography variant="h3" textAlign="center">
        ✋ Having trouble adding the cohort calendar?
      </Typography>
      <Typography className={classes.textone}>Try the following steps</Typography>
      <Box className={classes.section}>
        {googleCalendar()}
        {ical()}
      </Box>
      <Button variant="contained" onClick={() => onBack(false)} style={{ marginTop: '15px' }}>
        Go Back
      </Button>
    </div>
  );
};

export default CalendarInstructions;
