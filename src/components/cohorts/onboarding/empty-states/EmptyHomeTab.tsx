/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Box, Button } from '@material-ui/core';
import { Theme, styled } from '@material-ui/core/styles';
import useAuth from 'hooks/useAuth';
import { LoadingButton } from '@material-ui/lab';
import axios from 'utils/axios';
import CalendarInstructions from './CalendarInstructions';

const Container = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center'
}));

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inner: {
    marginTop: '100px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: '1000px',
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
      padding: '0 20px'
    }
  },
  textone: {
    marginTop: '50px',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '28px',
    textAlign: 'center'
  },
  texttwo: {
    marginTop: '25px',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '28px',
    textAlign: 'center'
  },
  btnContainer: {
    display: 'flex',
    marginTop: '30px',
    [theme.breakpoints.down(700)]: {
      flexDirection: 'column',
      width: '100%'
    }
  },
  btns: {
    padding: '12px 20px',
    minWidth: '300px',
    textTransform: 'unset',
    '&.mr': {
      marginRight: '50px'
    },
    [theme.breakpoints.down(700)]: {
      width: '100%',
      marginTop: '20px'
    }
  },
  calendarInstructions: {
    textDecoration: 'underline',
    cursor: 'pointer',
    '&:hover': { color: 'gray' }
  }
}));

const EmptyHomeTab = ({
  cohortCode,
  cohortHost,
  cohortID
}: {
  cohortCode: string;
  cohortHost: string;
  cohortID: string;
}) => {
  const classes = useStyles();
  const { user } = useAuth();
  const [calendarLink, setCalendarLink] = useState('');
  const [instructionsOpened, setInstructionsOpened] = useState(false);

  useEffect(() => {
    axios
      .get(`/cohorts/${cohortID}/calendar_link.json`)
      .then((res) => res.data)
      .then((payload) => {
        if (payload?.link) setCalendarLink(payload.link);
      });
  }, [cohortID, cohortCode, cohortHost]);

  const calendarAlert = () => {
    axios.post(`/cohorts/${cohortID}/enrollments/calendar_added.json`);

    if (!calendarLink) {
      alert('There is no calendar attached to this cohort');
    }
  };

  return (
    <Container className={classes.container}>
      {!instructionsOpened ? (
        <Box className={classes.inner}>
          <Typography variant="h3" textAlign="center">
            👋 Hi {user?.first_name}
            {cohortCode && `, welcome to the ${cohortCode} Cohort!`}
          </Typography>
          <Typography variant="caption" className={classes.textone}>
            We can’t wait to get to know you and the rest of the cohort. You will recieve complete
            access to the ScholarSite portal one week before {cohortHost && `${cohortHost}’s`}{' '}
            cohort begins. This includes access to Networking, Messaging and the Session Materials.
            We’ll make sure to send you an email reminder once this date arrives!
          </Typography>
          <Typography className={classes.texttwo}>
            Right now, we highly recommend that you add the upcoming Session times to you’re
            calendar by pressing the button below.
          </Typography>
          <Typography className={classes.texttwo}>
            You can also start asking {cohortHost && `${cohortHost}’s`} questions through Q&A. We
            look forward to seeing you soon!
          </Typography>
          <Box className={classes.btnContainer}>
            <LoadingButton
              className={`${classes.btns} mr`}
              href={calendarLink}
              onClick={calendarAlert}
              variant="contained"
            >
              Add Sessions to my calendar
            </LoadingButton>
            <Button href={`/cohorts/${cohortID}/Q&A`} className={classes.btns} variant="outlined">
              Ask {cohortHost} a question through Q&A
            </Button>
          </Box>
          <Box marginTop="20px">
            <Typography variant="caption" className={classes.textone}>
              *** If you’re having trouble adding the calendar please{' '}
              <span
                className={classes.calendarInstructions}
                onClick={() => setInstructionsOpened(true)}
              >
                see further information here
              </span>{' '}
              ***
            </Typography>
          </Box>
        </Box>
      ) : (
        <CalendarInstructions calendarUrl={calendarLink} onBack={setInstructionsOpened} />
      )}
    </Container>
  );
};

export default EmptyHomeTab;
