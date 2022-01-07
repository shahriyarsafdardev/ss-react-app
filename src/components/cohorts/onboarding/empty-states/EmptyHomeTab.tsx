import { makeStyles } from '@material-ui/styles';
import { Typography, Box, Button } from '@material-ui/core';
import { Theme, styled } from '@material-ui/core/styles';
import useAuth from 'hooks/useAuth';

const Container = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center'
}));

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inner: {
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
    padding: '12px 0',
    width: '300px',
    textTransform: 'unset',
    '&.mr': {
      marginRight: '50px'
    },
    [theme.breakpoints.down(700)]: {
      width: '100%',
      marginTop: '20px'
    }
  }
}));

const EmptyHomeTab = ({ cohortCode, cohortHost }: { cohortCode: string; cohortHost: string }) => {
  const classes = useStyles();
  const { user } = useAuth();

  return (
    <Container className={classes.container}>
      <Box className={classes.inner}>
        <Typography data-testid="empty-home-welcome-text" variant="h3" textAlign="center">
          👋 Hi {user?.first_name}
          {cohortCode && `, welcome to the ${cohortCode} Cohort!`}
        </Typography>
        <Typography
          data-testid="empty-home-cohort-information-text"
          variant="caption"
          className={classes.textone}
        >
          We can’t wait to get to know you and the rest of the cohort. You will recieve complete
          access to the ScholarSite portal one week before {cohortHost && `${cohortHost}’s`} cohort
          begins. This includes access to Networking, Messaging and the Session Materials. We’ll
          make sure to send you an email reminder once this date arrives!
        </Typography>
        <Typography data-testid="empty-home-cohort-information-text-1" className={classes.texttwo}>
          Right now, we highly recommend that you add the upcoming Session times to you’re calendar
          by pressing the button below.
        </Typography>
        <Typography data-testid="empty-home-cohort-information-text-2" className={classes.texttwo}>
          You can also start asking {cohortHost && `${cohortHost}’s`} questions through Q&A. We look
          forward to seeing you soon!
        </Typography>
        <Box className={classes.btnContainer}>
          <Button
            data-testid="empty-home-add-to-calendar-btn"
            className={`${classes.btns} mr`}
            variant="contained"
          >
            Add Sessions to my calendar
          </Button>
          <Button
            data-testid="empty-home-ask-question-btn"
            className={classes.btns}
            variant="outlined"
          >
            Ask {cohortHost} a question through Q&A
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EmptyHomeTab;
