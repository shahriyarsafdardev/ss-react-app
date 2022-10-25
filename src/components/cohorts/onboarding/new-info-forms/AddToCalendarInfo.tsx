import { Theme, styled } from '@material-ui/core/styles';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Stack
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0
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
    width: '99%',
    boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.24), 0px 8px 13px -4px rgba(145, 158, 171, 0.24)',
    borderRadius: '16px',
    [theme.breakpoints.down('sm')]: {
      padding: 0
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
    color: '#4d4dcd',
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
    alignItems: 'center',
    maxHeight: '650px',
    overflowY: 'scroll',
    marginTop: '16px',
    paddingBottom: '16px',
    [theme.breakpoints.down('md')]: {
      maxHeight: '350px'
    },
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#e2e7eb',
      borderRadius: '20px'
    }
  },
  accordionDiv: {
    boxShadow: 'none !important'
  },
  font34: {
    fontSize: '34px'
  },
  navigationButtons: {
    height: '40px',
    borderRadius: '30px'
  }
}));

const Head = styled('div')(() => ({
  textAlign: 'left',
  display: 'flex',
  fontSize: '16px',
  fontWeight: 'bold'
}));

const Item = styled('div')(() => ({
  display: 'flex',
  marginTop: '10px',
  letterSpacing: '1px',
  wordBreak: 'break-word'
}));

export default function AddToCalendarInfo({
  onNextHandler,
  onNeedHandler,
  inviteUrl
}: {
  onNextHandler: Function;
  onNeedHandler: Function;
  inviteUrl: string;
}) {
  const classes = useStyles();
  const navigate = useNavigate();

  const googleCalendar = () => (
    <Accordion className={classes.accordionDiv}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Head data-testid="google-calendar-instructions">Google Calendar Instructions</Head>
      </AccordionSummary>
      <AccordionDetails>
        <Box className={classes.mt5}>
          <p className={classes.texttwo} data-testid="web-google-calendar-instructions">
            On Web:
          </p>

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
              Paste in <span className={classes.decorated}>“{inviteUrl}”</span>
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
        <Head data-testid="apple-calendar-instructions">Apple Calendar Instructions</Head>
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
              Paste <span className={classes.decorated}>“{inviteUrl}”</span>
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
              Paste <span className={classes.decorated}>“{inviteUrl}” into the Server field</span>
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
        <Head data-testid="outlook-instructions">Outlook Instructions</Head>
      </AccordionSummary>
      <AccordionDetails>
        <Box className={classes.mt5}>
          <p className={classes.texttwo}>On desktop:</p>
          <Item>
            <div className={classes.itemNum}>1</div>
            <p>
              Click on <span className={classes.decorated}>“Other calendars”</span>heading.
            </p>
          </Item>
          <Item>
            <div className={classes.itemNum}>2</div>
            <p>
              Click on <span className={classes.decorated}>“Add calendar”.</span>
            </p>
          </Item>
          <Item>
            <div className={classes.itemNum}>3</div>
            <p>
              Click on <span className={classes.decorated}>“From Internet”.</span>
            </p>
          </Item>
        </Box>
        <Box className={classes.mt5}>
          <p className={classes.texttwo}>On mobile:</p>

          <Item>
            <div className={classes.itemNum}>1</div>
            <p>
              Open the <span className={classes.decorated}>mobile app.</span>
            </p>
          </Item>
          <Item>
            <div className={classes.itemNum}>2</div>
            <p>
              On the Home or Meetings tabs, tap{' '}
              <span className={classes.decorated}> “Connect Calendar”.</span>
            </p>
          </Item>
          <Item>
            <div className={classes.itemNum}>3</div>
            <p>
              Tap on <span className={classes.decorated}>“Continue”</span>to continue to the
              Microsoft login page.
            </p>
          </Item>
          <Item>
            <div className={classes.itemNum}>4</div>
            <p>
              Sign in to your Microsoft account by entering your email address, phone number, or
              Skype handle, and then tap<span className={classes.decorated}> “Next”.</span>
            </p>
          </Item>
          <Item>
            <div className={classes.itemNum}>5</div>
            <p>
              Enter your Microsoft password or enter your organization's account credentials, and
              then tap <span className={classes.decorated}> “Sign in”.</span>
            </p>
          </Item>
          <Item>
            <div className={classes.itemNum}>6</div>
            <p>
              Tap
              <span className={classes.decorated}> “Accept”</span>to grant permission for the mobile
              app to access your Outlook information
            </p>
          </Item>
        </Box>
      </AccordionDetails>
    </Accordion>
  );

  const accordion = () => (
    <Box className={classes.mainBox}>
      <Box className={classes.col4}>{outlookCalendar()}</Box>
      <Box className={classes.col4}>{googleCalendar()}</Box>
      <Box className={classes.col4}>{ical()}</Box>
    </Box>
  );

  const handleNeedHelp = () => {
    onNeedHandler();
    navigate('/contact-us');
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Box className={classes.outerContainer}>
          <Box className={classes.section}>{accordion()}</Box>
        </Box>
      </div>
      <Stack
        style={{ justifyContent: 'space-between', marginTop: '20px', width: '100%' }}
        spacing={2}
        direction={{ xs: 'column', md: 'row' }}
      >
        <Button
          variant="outlined"
          className={classes.navigationButtons}
          onClick={() => handleNeedHelp()}
          fullWidth
        >
          I need help
        </Button>
        <Button
          variant="contained"
          className={classes.navigationButtons}
          onClick={() => onNextHandler()}
          fullWidth
        >
          I've added the sessions
        </Button>
      </Stack>
    </>
  );
}
