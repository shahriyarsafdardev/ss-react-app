import { styled } from '@material-ui/core/styles';
import { Box, Button, Card, CircularProgress, Stack, Theme, Typography } from '@material-ui/core';
import { uniq } from 'lodash';
import DoneIcon from '@material-ui/icons/Done';

import moment from 'moment';
import { Modal } from 'components/animate';
import { makeStyles } from '@material-ui/styles';
import { Cohort, Session } from '../../../@types/cohorts';
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

const useStyles = makeStyles((theme: Theme) => ({
  calendarInstructionsModal: {
    width: '52%',
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '95%',
      margin: 'auto'
    }
  },
  heading: { fontSize: '20px', fontWeight: 600 }
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

export const sessionName = (
  session: Session | undefined,
  customName: string | undefined,
  defaultName: string | undefined
) => {
  if (session?.networking_session) {
    return session?.custom_name ? customName : 'Networking Session';
  }
  return defaultName;
};

export const CalendarInstructionsModal = ({
  cohort,
  modalState,
  setModalState,
  handleSubmit,
  onNeedHandler
}: {
  cohort: Cohort;
  modalState: boolean;
  setModalState: Function;
  handleSubmit: Function;
  onNeedHandler: Function;
}) => {
  const classes = useStyles();

  return (
    <Modal
      open={modalState}
      onClose={() => {
        setModalState(false);
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
            setModalState(false);
            handleSubmit();
          }}
          onNeedHandler={onNeedHandler}
          inviteUrl={cohort?.calendar_invite_url}
        />
      </Card>
    </Modal>
  );
};

export const OnboardingSectionRow = ({
  index,
  heading,
  subHeading,
  status,
  classes,
  onSubmit
}: {
  index: number;
  heading: string;
  subHeading: string;
  status: string;
  classes: any;
  onSubmit: Function;
}) => (
  <Box className={classes.row}>
    <Typography
      className={`${classes.index} ${status === 'Active' && classes.indexActive} ${
        status === 'NonActive' && classes.indexNonActive
      } ${status === 'Completed' && classes.indexCompleted}`}
    >
      {status === 'Completed' ? <DoneIcon /> : index}
    </Typography>
    <Box
      width="100%"
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
    >
      <Stack direction="column" marginLeft={3}>
        <Typography
          className={`${classes.headingActive} ${
            status === 'NonActive' && classes.headingNonActive
          } ${status === 'Completed' && classes.headingCompleted}`}
        >
          {heading}
        </Typography>
        <Typography
          className={`${classes.subHeadingActive} ${
            status === 'NonActive' && classes.headingNonActive
          } ${status === 'Completed' && classes.headingCompleted}`}
        >
          {subHeading}
        </Typography>
      </Stack>
      <Button
        variant="contained"
        className={`${classes.buttonActive} ${status !== 'Active' && classes.buttonNonActive}`}
        onClick={() => onSubmit()}
      >
        Start
      </Button>
    </Box>
  </Box>
);
