/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
    marginBottom: '100px'
  },
  heading: {
    textAlign: 'left',
    width: '100%',
    marginLeft: '50px'
  },
  textone: {
    color: '#919EAB',
    marginTop: '5px',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '32px'
  },
  texttwo: {
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '30px',
    textAlign: 'left'
  },
  col4: {
    padding: '20px',
    width: '48%',
    boxShadow:
      '0px 0px 2px rgba(145, 158, 171, 0.24), 0px 16px 32px -4px rgba(145, 158, 171, 0.24)',
    borderRadius: '16px',
    [theme.breakpoints.down(1000)]: {
      width: '80%'
    }
  },
  section: {
    width: '1000px',
    marginTop: '20px',
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
    padding: '10px 25px',
    background: 'rgba(77, 77, 205, 0.03)',
    borderRadius: '8px',
    marginTop: '15px'
  },
  itemNum: {
    fontSize: '14px',
    minWidth: '24px',
    width: '24px',
    height: '20px',
    background: 'rgba(77, 77, 205, 0.05)',
    textAlign: 'center',
    marginRight: '10px'
  },
  decorated: {
    color: '#4d4dcd'
  },
  backBtn: {
    display: 'flex',
    fontWeight: 'bold',
    color: '#4d4dcd',
    fontSize: '18px',
    lineHeight: '27px',
    cursor: 'pointer',
    marginBottom: '10px'
  }
}));

const Head = styled('div')(() => ({
  textAlign: 'left',
  display: 'flex',
  fontSize: '18px',
  fontWeight: 'bold'
}));

const Item = styled('div')(() => ({
  display: 'flex',
  marginTop: '10px',
  letterSpacing: '1px',
  wordBreak: 'break-word'
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
      <Head>
        <img
          src="/static/icons/google-calendar.svg"
          alt="gcal-icon"
          style={{ marginRight: '5px' }}
        />
        Google Calendar
      </Head>

      <Box className={classes.mt5}>
        <p className={classes.texttwo}>On Web:</p>

        <Item>
          <div className={classes.itemNum}>1</div>
          <p>
            Click on <span className={classes.decorated}>“Add other calendars”</span> next to the
            <span className={classes.decorated}>“Other calendars”</span> heading.
          </p>
        </Item>
        <Item>
          <div className={classes.itemNum}>2</div>
          <p>
            Click on <span className={classes.decorated}>“From URL”</span>
          </p>
          .
        </Item>
        <Item>
          <div className={classes.itemNum}>3</div>
          <p>
            Paste in <span className={classes.decorated}>“{calendarUrl}”</span>
          </p>
        </Item>
        <Item>
          <div className={classes.itemNum}>4</div>Press{' '}
          <p>
            <span className={classes.decorated}>“Save”</span>
          </p>
        </Item>
      </Box>
      <Box className={classes.mt5}>
        <p className={classes.texttwo}>On iOS:</p>

        <Item>
          <div className={classes.itemNum}>1</div>
          <p>
            Follow the above process <span className={classes.decorated}>on web.</span>
          </p>
        </Item>
        <Item>
          <div className={classes.itemNum}>2</div>
          <p>
            You may need to visit{' '}
            <span className={classes.decorated}>
              https://calendar.google.com/calendar/syncselect
            </span>{' '}
            and turn on syncing for the cohort calendar.
          </p>
        </Item>
      </Box>
      <Box className={classes.mt5}>
        <p className={classes.texttwo}>On Android:</p>

        <Item>
          <div className={classes.itemNum}>1</div>
          <p>
            Follow the above process <span className={classes.decorated}>on web.</span>
          </p>
        </Item>
        <Item>
          <div className={classes.itemNum}>2</div>{' '}
          <p>
            You may need to turn on syncing in your Calendar app. In the sidebar, click on{' '}
            <span className={classes.decorated}>“Settings”</span>, tap on the imported calendar, and
            then toggle on <span className={classes.decorated}>“Sync.”</span>
          </p>
        </Item>
      </Box>
    </Box>
  );

  const ical = () => (
    <Box className={classes.col4}>
      <Head>
        <img src="/static/icons/ical.svg" alt="ical-icon" style={{ marginRight: '5px' }} />
        iCal
      </Head>
      <Box className={classes.mt5}>
        <p className={classes.texttwo}>On desktop:</p>

        <Item>
          <div className={classes.itemNum}>1</div>
          <p>
            Click <span className={classes.decorated}>File {'>'} New Calendar Subscription.</span>
          </p>
        </Item>
        <Item>
          <div className={classes.itemNum}>2</div>
          <p>
            Paste <span className={classes.decorated}>“{calendarUrl}”</span>
          </p>
        </Item>
        <Item>
          <div className={classes.itemNum}>3</div>
          <p>
            Press <span className={classes.decorated}>“Save”.</span>
          </p>
        </Item>
      </Box>
      <Box className={classes.mt5}>
        <p className={classes.texttwo}>On mobile:</p>

        <Item>
          <div className={classes.itemNum}>1</div>
          <p>
            Open the <span className={classes.decorated}>Settings app.</span>
          </p>
        </Item>
        <Item>
          <div className={classes.itemNum}>2</div>
          <p>
            Tap on <span className={classes.decorated}>“Accounts & Passwords”.</span>
          </p>
        </Item>
        <Item>
          <div className={classes.itemNum}>3</div>
          <p>
            Tap on <span className={classes.decorated}>“Add Account”.</span>
          </p>
        </Item>
        <Item>
          <div className={classes.itemNum}>4</div>
          <p>
            Tap on <span className={classes.decorated}>“Other”.</span>
          </p>
        </Item>
        <Item>
          <div className={classes.itemNum}>5</div>
          <p>
            Tap on <span className={classes.decorated}>“Add Subscribed Calendar”.</span>
          </p>
        </Item>
        <Item>
          <div className={classes.itemNum}>6</div>
          <p>
            Paste <span className={classes.decorated}>“{calendarUrl}” into the Server field</span>
          </p>
        </Item>
        <Item>
          <div className={classes.itemNum}>7</div>
          <p>
            Add a <span className={classes.decorated}>description</span>
          </p>
        </Item>
        <Item>
          <div className={classes.itemNum}>8</div>
          <p>
            Press <span className={classes.decorated}>“Save”</span>
          </p>
        </Item>
      </Box>
    </Box>
  );

  return (
    <div className={classes.wrapper}>
      <Box className={classes.heading}>
        <div className={classes.backBtn} onClick={() => onBack(false)}>
          <img src="/static/icons/return-arrow.svg" alt="back" style={{ marginRight: '5px' }} />
          Return
        </div>
        <Typography variant="h3">✋ Having trouble adding the cohort calendar?</Typography>
        <p className={classes.textone}>Try the following steps</p>
      </Box>
      <Box className={classes.section}>
        {googleCalendar()}
        {ical()}
      </Box>
    </div>
  );
};

export default CalendarInstructions;
