import { styled } from '@material-ui/core/styles';
import { Box, Card, CircularProgress, Stack, Theme, Typography, Button } from '@material-ui/core';
import { uniq } from 'lodash';
import DoneIcon from '@material-ui/icons/Done';

import moment from 'moment';
import { Modal } from 'components/animate';
import { makeStyles } from '@material-ui/styles';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { useContext, useEffect } from 'react';
import arrowForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import Icon from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'redux/store';
import { markOnboardingStep } from 'redux/slices/cohort';
import { Session } from '../../../@types/cohorts';
import { AddToCalendarInfo } from '../onboarding/new-info-forms';

export const SectionContainer = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  boxShadow: '0px 0px 4px rgba(145, 158, 171, 0.24), 0px 24px 48px rgba(145, 158, 171, 0.24)',
  borderRadius: '16px',
  padding: '20px',
  '&.timeline': {
    height: '150px',
    [theme.breakpoints.down('sm')]: {
      height: '310px',
      width: '95%',
      margin: 'auto'
    }
  },
  '&.card-2': {
    width: '49%',
    height: '500px',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  '&.card-3': {
    width: '49%',
    height: '500px',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    [theme.breakpoints.down('sm')]: {
      height: '750px'
    }
  }
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '15px'
}));

export const useStyles = makeStyles((theme: Theme) => ({
  calendarInstructionsModal: {
    width: '52%',
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '95%',
      margin: 'auto'
    }
  },
  heading: { fontSize: '20px', fontWeight: 600 },
  header: {
    marginBottom: '15px',
    [theme.breakpoints.down('md')]: {
      marginBottom: '10px'
    }
  },
  index: {
    width: '30px',
    height: '30px',
    textAlign: 'center',
    padding: '5px',
    borderRadius: '50%',
    fontWeight: 700,
    fontSize: '15px'
  },
  indexActive: {
    backgroundColor: '#F1F5F9'
  },
  indexCompleted: {
    backgroundColor: '#C7D0D0',
    color: '#FFFFFF',
    fontWeight: 700
  },
  indexNonActive: {
    backgroundColor: '#F1F5F9',
    color: '#C7D0D0'
  },
  headingActive: {
    margin: '0 10px'
  },
  headingNonActive: {
    color: '#C7D0D0'
  },
  headingCompleted: {
    textDecoration: 'line-through',
    color: '#C7D0D0'
  },
  buttonActive: {
    cursor: 'pointer',
    display: 'flex'
  },
  buttonNonActive: {
    display: 'none'
  },
  peersModalCard: {
    padding: '60px',
    [theme.breakpoints.down('md')]: {
      padding: '15px'
    }
  },
  peerModalAvatar: {
    width: '72px',
    height: '72px',
    margin: 'auto'
  },
  mainCard: {
    overflow: 'visible',
    padding: '50px',
    [theme.breakpoints.down('md')]: {
      padding: '20px'
    }
  },
  userInfo: {
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    padding: '10px'
  },
  userAvatar: {
    width: 64,
    height: 64,
    zIndex: 11
  },
  modalSubmitButton: {
    width: '200px',
    borderRadius: '30px',
    margin: 'auto !important',
    marginTop: '32px !important',
    [theme.breakpoints.down('md')]: {
      width: '90%'
    }
  },
  completionPrompt: {
    alignItems: 'center',
    padding: '20px 30px',
    [theme.breakpoints.down('lg')]: {
      padding: '10px 15px'
    }
  },
  completionPromptIcon: {
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    backgroundColor: '#696DC8',
    color: 'white'
  },
  completionPromptButton: {
    padding: '5px 20px',
    borderRadius: '30px',
    [theme.breakpoints.down('lg')]: {
      padding: '5px 10px'
    }
  }
}));

const StyledCircularLoader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
}));

const getLocalTimeZone = () =>
  new Date()
    .toString()
    .split(/[(,)]+/)[1]
    .match(/\b(\w)/g)
    ?.join('');
const formatList = (list: string[]) =>
  list.length > 2 ? [list.slice(0, -1).join(', '), list.slice(-1)].join(' or ') : list.join(' or ');

export const sortedTimes = (times: string[]) =>
  [...times].sort((a, b) => (moment(a) < moment(b) ? -1 : 1));

export const surveyTime = (times: string[]) =>
  sortedTimes(times).filter((time) => moment(time).add(48, 'hours') > moment())[0];

export const upcomingTimes = (times: string[]) =>
  sortedTimes(times)
    .filter((time) => moment(time).add(2, 'hours') > moment())
    .slice(0, 2);

export const firstUpcomingDate = (times: string[]) => {
  const sorted: string[] = sortedTimes(times);
  let firstTime = sorted[sorted.length - 1];
  const upcomings = upcomingTimes(times);
  if (upcomings.length > 0) {
    [firstTime] = upcomings;
  }
  return firstTime;
};

export const formatTime = (time: string, sessionLength: string) => {
  const sessionStartTime = moment(new Date(time)).format('hh:mm a');
  const sessionEndTime = moment(new Date(time))
    .add(Number(sessionLength?.split(' ')[0]), 'hours')
    .format('hh:mm a');
  if (moment(time).add(1, 'hours') > moment()) {
    return `${sessionStartTime} - ${sessionEndTime} ${getLocalTimeZone()}`;
  }
  return 'Complete';
};

export const zoomTimesPreview = (times: string[]) => {
  const sorted: string[] = sortedTimes(times);
  const upcoming = new Date(firstUpcomingDate(times));
  const sameDayTimes = sorted.filter((time) => moment(new Date(time)).isSame(upcoming, 'day'));
  const sortedTimeslist = sameDayTimes.map((time) => moment(new Date(time)).format('hh:mm a'));
  return `${formatList(sortedTimeslist)} ${getLocalTimeZone()}`;
};

export const displayMultipleDates = (times: string[]) => {
  const upcomings = uniq(
    upcomingTimes(times).map((time) => moment(new Date(time)).format('dddd, MMM DD'))
  );
  if (upcomings.length === 0) {
    return false;
  }
  if (upcomings.length === 1) {
    return upcomings[0];
  }
  const formattedDates = upcomings.map((time) => moment(time).format('MMM DD'));
  return formatList(formattedDates);
};

export const formatMultipleTimes = (times: string[], sessionLength: string) => {
  const upcomings = upcomingTimes(times);
  if (upcomings.length === 0) {
    return 'Complete';
  }
  if (upcomings.length === 1) {
    return formatTime(upcomings[0], sessionLength);
  }
  const sortedTimeslist = upcomings.map((time) => moment(new Date(time)).format('hh:mm a'));
  return `${formatList(sortedTimeslist)} ${getLocalTimeZone()}`;
};

export const CircularLoader = () => (
  <StyledCircularLoader>
    <CircularProgress />
  </StyledCircularLoader>
);

export const isZoomLinkVisible = (activeSession: Session | undefined) => {
  if (activeSession) {
    const sessionTime = moment(firstUpcomingDate(activeSession.times));
    // Show zoom link preview before 1 hour and till 2 hours after session time
    return sessionTime < moment().add(1, 'hours') && moment().subtract(2, 'hours') < sessionTime;
  }
  return false;
};

export const sessionName = (session: Session | undefined, defaultName: string | undefined) => {
  if (session?.custom_name) {
    return session?.custom_name;
  }
  return session?.networking_session ? 'Networking Session' : defaultName;
};

export const CalendarInstructionsModal = ({
  calendarURL,
  calendarInstructionsModalState,
  setCalendarInstructionsModalState,
  handleSubmit
}: {
  calendarURL: string;
  calendarInstructionsModalState: boolean;
  setCalendarInstructionsModalState: Function;
  handleSubmit: Function;
}) => {
  const classes = useStyles();
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  useEffect(() => {
    calendarInstructionsModalState &&
      sendAnalyticsData('Cohort Onboarding - Calendar Modal - Page Loaded', {
        'Calendar URL': calendarURL
      });
  }, [calendarInstructionsModalState]);

  const onNeedHandler = () => {
    sendAnalyticsData('Cohort Onboarding - Calendar Modal - "I need help" Selected', {
      'Calendar URL': calendarURL
    });
  };

  return (
    <Modal
      open={calendarInstructionsModalState}
      onClose={() => {
        setCalendarInstructionsModalState(false);
      }}
      zIndex={1400}
      className={classes.calendarInstructionsModal}
    >
      <Card sx={{ padding: '2rem' }}>
        <Typography className={classes.heading}>
          Please follow the instructions below to add the sessions to you calendar
        </Typography>
        <AddToCalendarInfo
          onNextHandler={() => {
            setCalendarInstructionsModalState(false);
            handleSubmit();
          }}
          onNeedHandler={onNeedHandler}
          inviteUrl={calendarURL}
        />
      </Card>
    </Modal>
  );
};

export const ChecklistItem = ({
  index,
  heading,
  status,
  onSubmit
}: {
  index: number;
  heading: string;
  status: string;
  onSubmit: Function;
}) => {
  const classes = useStyles();
  return (
    <Stack
      direction="row"
      sx={{ padding: '10px 0px', alignItems: 'center', borderTop: '1px solid #edf5f5' }}
    >
      <StyledTypography
        className={`${classes.index} ${status === 'Active' && classes.indexActive} ${
          status === 'NonActive' && classes.indexNonActive
        } ${status === 'Completed' && classes.indexCompleted}`}
      >
        {status === 'Completed' ? <DoneIcon style={{ fontSize: '1.3rem' }} /> : index}
      </StyledTypography>
      <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center">
        <StyledTypography
          className={`${classes.headingActive} ${
            status === 'NonActive' && classes.headingNonActive
          } ${status === 'Completed' && classes.headingCompleted}`}
        >
          {heading}
        </StyledTypography>
        <Box
          onClick={() => onSubmit()}
          className={`${classes.buttonActive} ${status !== 'Active' && classes.buttonNonActive}`}
        >
          <Icon icon={arrowForwardFill} width="20px" height="20px" />
        </Box>
      </Stack>
    </Stack>
  );
};

export function ChecklistCompletionPrompt({ cohort_id }: { cohort_id: string }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(markOnboardingStep(cohort_id, 'onboarding_checklist_completed'));
    navigate(`/cohorts/${cohort_id}/home`);
  };

  return (
    <Stack className={classes.completionPrompt} spacing={4}>
      <Box className={classes.completionPromptIcon}>
        <DoneIcon style={{ fontSize: '2rem', padding: '5px' }} />
      </Box>
      <Typography textAlign="center">
        Congratulations, you have completed the Pre-Cohort Checklist! 🎉
      </Typography>
      <Stack spacing={2}>
        <Button
          className={classes.completionPromptButton}
          variant="contained"
          onClick={handleSubmit}
        >
          Go to Home
        </Button>
        <Button
          className={classes.completionPromptButton}
          variant="outlined"
          onClick={handleSubmit}
        >
          Continue Networking
        </Button>
      </Stack>
    </Stack>
  );
}
