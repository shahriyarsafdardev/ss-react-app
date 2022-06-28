/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Theme, styled } from '@material-ui/core/styles';
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { RootState, useSelector } from 'redux/store';
import { Link as RouterLink } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    margin: 'auto',
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
    [theme.breakpoints.down(1000)]: {
      textAlign: 'center'
    }
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
    marginTop: '20px',
    padding: '16px 24px',
    width: '98%',
    boxShadow:
      '0px 0px 2px rgba(145, 158, 171, 0.24), 0px 16px 32px -4px rgba(145, 158, 171, 0.24)',
    borderRadius: '16px',
    [theme.breakpoints.down(1000)]: {
      width: '80%'
    }
  },
  section: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down(1000)]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    }
  },
  outerContainer: {
    maxWidth: '900px'
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
    color: '#12125C'
  },
  backBtn: {
    maxWidth: 'fit-content',
    display: 'flex',
    fontWeight: 'bold',
    color: '#12125c',
    fontSize: '18px',
    lineHeight: '27px',
    textDecoration: 'none',
    cursor: 'pointer',
    marginBottom: '10px',
    [theme.breakpoints.down(1000)]: {
      textAlign: 'center',
      marginLeft: '30px'
    }
  },
  mainBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  accordionDiv: {
    boxShadow: 'none !important'
  },
  font34: {
    fontSize: '34px'
  },
  calSubHeading: {
    fontSize: '18px',
    lineHeight: '33px',
    color: '#919EAB',
    marginTop: '4px',
    marginLeft: '50px',
    [theme.breakpoints.down(1000)]: {
      marginLeft: '0px'
    }
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

const CalendarInstructions = () => {
  const classes = useStyles();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );

  const calendarLink = cohort?.calendar_invite_url;

  const googleCalendar = () => (
    <Accordion className={classes.accordionDiv}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Head>
          <img src="/static/icons/cal-icon.png" alt="ical-icon" style={{ marginRight: '8px' }} />
          Google Calendar
        </Head>
      </AccordionSummary>
      <AccordionDetails>
        <Box className={classes.mt5}>
          <p className={classes.texttwo}>On Web:</p>

          <Item>
            <div className={classes.itemNum}>1</div>
            <p>
              Open <span className={classes.decorated}>Google Calendar</span>.
            </p>
          </Item>
          <Item>
            <div className={classes.itemNum}>2</div>
            <p>
              Click on <span className={classes.decorated}>“Add other calendars”</span> next to the
              <span className={classes.decorated}>“Other calendars”</span> heading.
            </p>
          </Item>
          <Item>
            <div className={classes.itemNum}>3</div>
            <p>
              Click on <span className={classes.decorated}>“From URL”</span>
            </p>
            .
          </Item>
          <Item>
            <div className={classes.itemNum}>4</div>
            <p>
              Paste in <span className={classes.decorated}>“{calendarLink}”</span>
            </p>
          </Item>
          <Item>
            <div className={classes.itemNum}>5</div>Press{' '}
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
              <span className={classes.decorated}>“Settings”</span>, tap on the imported calendar,
              and then toggle on <span className={classes.decorated}>“Sync.”</span>
            </p>
          </Item>
        </Box>
      </AccordionDetails>
    </Accordion>
  );

  const ical = () => (
    <Accordion className={classes.accordionDiv}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Head>
          <img src="/static/icons/cal-icon.png" alt="ical-icon" style={{ marginRight: '8px' }} />
          Apple Calendar
        </Head>
      </AccordionSummary>
      <AccordionDetails>
        <Box className={classes.mt5}>
          <p className={classes.texttwo}>On desktop:</p>
          <Item>
            <div className={classes.itemNum}>1</div>
            <p>
              Open <span className={classes.decorated}>Apple Calendar</span>.
            </p>
          </Item>
          <Item>
            <div className={classes.itemNum}>2</div>
            <p>
              Click <span className={classes.decorated}>File {'>'} New Calendar Subscription.</span>
            </p>
          </Item>
          <Item>
            <div className={classes.itemNum}>3</div>
            <p>
              Paste <span className={classes.decorated}>“{calendarLink}”</span>
            </p>
          </Item>
          <Item>
            <div className={classes.itemNum}>4</div>
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
              Paste{' '}
              <span className={classes.decorated}>“{calendarLink}” into the Server field</span>
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
      </AccordionDetails>
    </Accordion>
  );

  const outlookCalendar = () => (
    <Accordion className={classes.accordionDiv}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Head>
          <img src="/static/icons/cal-icon.png" alt="ical-icon" style={{ marginRight: '8px' }} />
          Outlook
        </Head>
      </AccordionSummary>
      <AccordionDetails>
        <Box className={classes.mt5}>
          <p className={classes.texttwo}>On desktop:</p>
          <Item>
            <div className={classes.itemNum}>1</div>
            <p>
              Click on <span className={classes.decorated}>“Other calendars” </span> heading.
            </p>
          </Item>
          <Item>
            <div className={classes.itemNum}>2</div>
            <p>
              Click on <span className={classes.decorated}>“Add”.</span>
            </p>
          </Item>
          <Item>
            <div className={classes.itemNum}>3</div>
            <p>
              Click on <span className={classes.decorated}>“From Internet”</span>
            </p>
          </Item>
          <Item>
            <div className={classes.itemNum}>4</div>
            <p>
              Paste <span className={classes.decorated}>“{calendarLink}”</span>
            </p>
          </Item>
          <Item>
            <div className={classes.itemNum}>5</div>
            <p>
              Press <span className={classes.decorated}>“Ok”.</span>
            </p>
          </Item>
        </Box>
        <Box className={classes.mt5}>
          <p className={classes.texttwo}>On Web:</p>
          <Item>
            <div className={classes.itemNum}>1</div>
            <p>
              Click on <span className={classes.decorated}>“Add calendar”.</span>
            </p>
          </Item>
          <Item>
            <div className={classes.itemNum}>2</div>
            <p>
              Click on <span className={classes.decorated}>“Subscribe from web”.</span>
            </p>
          </Item>
          <Item>
            <div className={classes.itemNum}>3</div>
            <p>
              Paste <span className={classes.decorated}>“{calendarLink}”</span>
            </p>
          </Item>
          <Item>
            <div className={classes.itemNum}>4</div>
            <p>
              Press <span className={classes.decorated}>“Import”.</span>
            </p>
          </Item>
        </Box>
      </AccordionDetails>
    </Accordion>
  );

  const accordion = () => (
    <Box className={classes.mainBox}>
      <Box className={classes.col4}>{googleCalendar()}</Box>
      <Box className={classes.col4}>{outlookCalendar()}</Box>
      <Box className={classes.col4}>{ical()}</Box>
    </Box>
  );

  return (
    <div className={classes.wrapper}>
      {cohort ? (
        <Box className={classes.outerContainer}>
          <Box className={classes.heading}>
            <RouterLink className={classes.backBtn} to={`/cohorts/${cohort_id}/home`}>
              <img src="/static/icons/return-arrow.svg" alt="back" style={{ marginRight: '5px' }} />
              Return
            </RouterLink>
            <Typography variant="h4" className={classes.font34}>
              🗓️ Make sure to add the sessions to your calendar
            </Typography>
            <Typography variant="subtitle2" className={classes.calSubHeading}>
              Feel free to reach out to the Sphere team if you have any questions!
            </Typography>
          </Box>
          <Box className={classes.section}>{accordion()}</Box>
        </Box>
      ) : (
        <h5>Loading calendar instructions</h5>
      )}
    </div>
  );
};

export default CalendarInstructions;
