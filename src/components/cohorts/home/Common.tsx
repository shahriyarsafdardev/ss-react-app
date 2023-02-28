import { LazyLoadImage } from 'react-lazy-load-image-component';
import { styled } from '@material-ui/core/styles';
import {
  Box,
  Card,
  CircularProgress,
  Stack,
  Theme,
  Typography,
  Button,
  IconButton
} from '@material-ui/core';
import { memoize, uniq } from 'lodash';
import DoneIcon from '@material-ui/icons/Done';

import moment from 'moment';
import { Modal } from 'components/animate';
import { makeStyles } from '@material-ui/styles';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { memo, useContext, useEffect } from 'react';
import arrowForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import Icon from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'redux/store';
import { markOnboardingStep } from 'redux/slices/cohort';
import { Session } from '../../../@types/cohorts';
import { AddToCalendarInfo } from '../onboarding/new-info-forms';
import { SurveyForm } from '../sessions';
import SurveyCompletionMessage from './SurveyCompletionMessage';

export const SectionContainer = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  boxShadow: '0px 0px 4px rgba(145, 158, 171, 0.24), 0px 24px 48px rgba(145, 158, 171, 0.24)',
  borderRadius: '16px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '&.timeline': {
    minHeight: '150px',
    height: 'auto',
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
    padding: '10px',
    borderRadius: '50%',
    fontWeight: 700,
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
    height: '48px',
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
  linkButton: {
    borderRadius: '30px',
    width: '30%',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  downloadButton: {
    color: '#101658',
    backgroundColor: '#fff',
    textTransform: 'none',
    '&:hover': {
      color: '#fff'
    }
  },
  dotStyle: {
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
    opacity: 0.7,
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeInOut,
      duration: 200
    }),
    '&:hover': { opacity: 1 }
  },
  activeDot: {
    opacity: 1,
    transform: 'scale(1.3)'
  },
  completionPromptButton: {
    padding: '5px 20px',
    borderRadius: '30px',
    height: '48px',
    [theme.breakpoints.down('lg')]: {
      padding: '5px 10px'
    }
  },
  homePage: {
    marginTop: '-24px',
    width: '100%',
    height: 'calc(100% + 24px)',
    minHeight: 'calc(100% + 24px)',
    overflow: 'hidden'
  },
  checklistItemStack: {
    padding: '10px 0px',
    alignItems: 'center',
    borderTop: '1px solid #edf5f5'
  },
  circularProgressbarText: {
    fontSize: '24px',
    fontWeight: 600,
    dominantBaseline: 'central',
    textAnchor: 'middle'
  },
  socialShareStack: {
    color: '#101658',
    marginTop: '20px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  offboardingPageContainer: {
    maxWidth: '1200px',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  sessionDescriptionBox: {
    fontWeight: 400,
    fontSize: '14px',
    height: 'auto',
    lineHeight: '28px',
    padding: '0px 5px 15px 0px',
    marginRight: '4px'
  },
  activeCertificate: {
    boxShadow: '0px 0px 25px #fff',
    width: '50%',
    transition: 'opacity 0.5s',
    opacity: 1,
    [theme.breakpoints.down('md')]: {
      width: '95%'
    }
  },
  secondaryCertificate: {
    width: '45%',
    opacity: 0.8,
    [theme.breakpoints.down('md')]: {
      width: '75%'
    }
  },
  onlyCertificate: {
    width: '75%'
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

const formatList = memoize((list: string[]) =>
  list.length > 2 ? [list.slice(0, -1).join(', '), list.slice(-1)].join(' or ') : list.join(' or ')
);

export const sortedTimes = memoize((times: string[]) =>
  [...times].sort((a, b) => (moment(a) < moment(b) ? -1 : 1))
);

export const surveyTime = (times: string[]) =>
  sortedTimes(times).filter((time) => moment(time).add(48, 'hours') > moment())[0];

export const upcomingTimes = (times: string[]) =>
  sortedTimes(times)
    .filter((time) => moment(time).add(2, 'hours') > moment())
    .slice(0, 2);

export const firstUpcomingDate = memoize((times: string[]) => {
  const sorted: string[] = sortedTimes(times);
  let firstTime = sorted[sorted.length - 1];
  const upcomings = upcomingTimes(times);
  if (upcomings.length > 0) {
    [firstTime] = upcomings;
  }
  return firstTime;
});

export const formatTime = (time: string, sessionLength: string) => {
  const sessionStartTime = moment(new Date(time)).format('hh:mm a');
  const sessionHours =
    sessionLength?.split(' ').length === 1 ? sessionLength[0] : sessionLength.split(' ')[0];
  const sessionEndTime = moment(new Date(time))
    .add(Number(sessionHours), 'hours')
    .format('hh:mm a');
  if (moment(time).add(2, 'hours') > moment()) {
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

export const CalendarInstructionsModal = memo(
  ({
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

    const handleModalClose = () => setCalendarInstructionsModalState(false);

    const nextHandler = () => {
      setCalendarInstructionsModalState(false);
      handleSubmit();
    };

    return (
      <Modal
        open={calendarInstructionsModalState}
        onClose={handleModalClose}
        zIndex={1400}
        className={classes.calendarInstructionsModal}
      >
        <Card sx={{ padding: '2rem' }}>
          <Typography className={classes.heading}>
            Please follow the instructions below to add the sessions to you calendar
          </Typography>
          <AddToCalendarInfo
            onNextHandler={nextHandler}
            onNeedHandler={onNeedHandler}
            inviteUrl={calendarURL}
          />
        </Card>
      </Modal>
    );
  }
);

export const ChecklistItem = memo(
  ({
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

    const handleStackClick = () => {
      status === 'Active' && onSubmit();
    };

    return (
      <Stack
        direction="row"
        onClick={handleStackClick}
        className={`${classes.checklistItemStack} ${status === 'Active' && classes.buttonActive}`}
      >
        <StyledTypography
          className={`${classes.index} ${status === 'Active' && classes.indexActive} ${
            status === 'NonActive' && classes.indexNonActive
          } ${status === 'Completed' && classes.indexCompleted}`}
        >
          {status === 'Completed' ? <DoneIcon sx={{ fontSize: '1.3rem' }} /> : index}
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
            // onClick={() => onSubmit()}
            className={`${classes.buttonActive} ${status !== 'Active' && classes.buttonNonActive}`}
          >
            <Icon icon={arrowForwardFill} width="20px" height="20px" />
          </Box>
        </Stack>
      </Stack>
    );
  }
);

export const ChecklistCompletionPrompt = memo(
  ({ cohort_id, trackSegmentEvent }: { cohort_id: string; trackSegmentEvent: Function }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (gotoHome: boolean) => {
      if (gotoHome) {
        trackSegmentEvent('Cohort Onboarding - Pre Cohort Checklist - "Go to Home" Selected');
        navigate(`/cohorts/${cohort_id}/home?active_step=1`);
      } else {
        trackSegmentEvent('Cohort Onboarding - Checklist - "Continue Networking" Selected');
      }
      dispatch(markOnboardingStep(cohort_id, 'onboarding_checklist_completed'));
    };

    const handleGotoHome = () => handleSubmit(true);
    const handleContinueNetworking = () => handleSubmit(false);

    return (
      <Stack className={classes.completionPrompt} spacing={4}>
        <Typography textAlign="center">
          Congratulations, you have completed the Pre-Cohort Checklist! 🎉
        </Typography>
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Button
            className={classes.completionPromptButton}
            variant="contained"
            onClick={handleGotoHome}
          >
            Go to Home
          </Button>
          <Button
            className={classes.completionPromptButton}
            variant="outlined"
            onClick={handleContinueNetworking}
          >
            Continue Networking
          </Button>
        </Stack>
      </Stack>
    );
  }
);

export const StyledBox = styled(Stack)(({ theme }) => ({
  background: 'linear-gradient(135.12deg, #6A2E9C 0.07%, #0D0217 100.02%)',
  height: '100%',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center'
}));

export const StyledModalButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  width: '50%',
  minWidth: '200px',
  margin: '20px auto 0 !important',
  [theme.breakpoints.down('md')]: {
    width: '80%'
  }
}));
export const StyledImage = styled(LazyLoadImage)(({ theme }) => ({
  width: '55%',
  margin: '20px auto 0 !important'
}));

export const SemiBoldText = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 600
}));

export const OutlinedButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  width: '100%',
  padding: '5px'
}));

export const ThinLine = styled('div')(({ theme }) => ({
  borderTop: '1px solid #CBD5E1',
  width: '45%'
}));

export const ModalStyle = styled(Card)(({ theme }) => ({
  minHeight: '600px',
  overflow: 'auto',
  color: '#212B36'
}));

export const GreyCard = styled(Stack)(({ theme }) => ({
  height: '115px',
  width: '100%',
  overflowWrap: 'break-word',
  minHeight: '115px',
  overflow: 'auto',
  border: '1px solid #E2E8F0',
  color: '#212B36',
  textAlign: 'left',
  padding: '15px',
  borderRadius: '8px',
  backgroundColor: '#fff',
  fontSize: '15px',
  ul: {
    paddingLeft: '20px'
  }
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: '50%',
  border: '1px solid #101658'
}));

export const StyledIcon = styled(Icon)(({ theme }) => ({
  width: '24px',
  height: '24px',
  color: '#101658'
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  textAlign: 'center',
  alignItems: 'center',
  padding: '65px 100px',
  overflow: 'hidden',
  width: '50%',
  height: '100% ',
  backgroundColor: '#FAFAFC',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    padding: '32px 16px',
    width: '100%'
  }
}));

export const OffboardingHeader = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: '#fff',
  fontSize: '26px !important',
  [theme.breakpoints.down('md')]: {
    fontSize: '20px !important'
  }
}));

export const MainImage = styled(LazyLoadImage)(({ theme }) => ({
  height: 'auto',
  cursor: 'pointer'
}));

export const getCaption = (socialMedia: string, slug: string, cohort: any) => {
  let text = '';
  if (socialMedia === 'LinkedIn') {
    text = linkedin(cohort);
  }
  if (socialMedia === 'Twitter') {
    text = twitter(cohort);
  }
  if (socialMedia === 'Email') {
    text = email(cohort);
  }
  return text.replace(/firstname-lastname/g, slug);
};

export const linkedin = (cohort: any) =>
  `I’m excited to share that I recently completed @Sphere’s cohort-based course on ${
    cohort.name
  }. The 2-week long course combined live discussion with industry experts, practical frameworks, case studies, exercises, and networking with ${
    cohort.offboarding_data.target_persona
  } from leading companies.
  
Special thanks to ${
    cohort.offboarding_data.linkedin_usernames
  } for hosting the course and sharing their extensive knowledge and experience.
  
If you’re interested in learning more about the course you can check out more details here:
${cohort.registration_page_url}?referrer=firstname-lastname&alumni=true

${cohort.offboarding_data.hashtags || ''}`;

const appendHashtag = (hashtags: string) => hashtags?.replace(/#/g, '%23') || '';

export const twitter = (cohort: any) =>
  `Just completed a course on ${cohort.name} through @get_sphere. Special thanks to ${
    cohort.offboarding_data.twitter_usernames
  } for sharing their extensive knowledge and experience. More details here: ${
    cohort.registration_page_url
  }?referrer=firstname-lastname%26alumni=true%0D%0A
${appendHashtag(cohort.offboarding_data.hashtags)}`;

export const email = (cohort: any) =>
  `I’m excited to share that I recently completed Sphere's cohort-based course on ${cohort.name}. The 2-week long course combined live discussion with industry experts, practical frameworks, case studies, exercises, and networking with ${cohort.offboarding_data.target_persona} from leading companies.%0D%0A%0D%0A
Special thanks to ${cohort.offboarding_data.host_titles} for hosting the course and sharing their extensive knowledge and experience.%0D%0A%0D%0A
If you're interested in learning more about the course, you can check out more details here:%0D%0A
${cohort.registration_page_url}?referrer=firstname-lastname%26alumni=true`;

export const SurveyModal = memo(
  ({
    hasCompletedFeedback,
    state,
    onClose,
    onComplete,
    session
  }: {
    hasCompletedFeedback: boolean;
    state: boolean;
    onClose: Function;
    onComplete: Function;
    session: any;
  }) => (
    <Modal open={state} onClose={() => onClose()}>
      {hasCompletedFeedback ? (
        <SurveyCompletionMessage />
      ) : (
        <SurveyForm
          key="surveyForm"
          onComplete={onComplete}
          sessionId={session?.id}
          sessionName={session?.name}
          session={session}
        />
      )}
    </Modal>
  )
);

export const displayLinkedIn = (cohort: any, courseLink: string) => (
  <GreyCard>
    <Typography>
      I’m excited to share that I recently completed <b>@Sphere</b>'s cohort-based course on&nbsp;
      {cohort.name}. The 2-week long course combined live discussion with industry experts,
      practical frameworks, case studies, exercises, and networking with{' '}
      {cohort.offboarding_data.target_persona}
      &nbsp; from leading companies.
    </Typography>
    <br />
    <Typography>
      Special thanks to <b>{cohort.offboarding_data.linkedin_usernames}</b> for hosting the course
      and sharing their extensive knowledge and experience.
    </Typography>
    <br />
    <Typography>
      If you’re interested in learning more about the course you can check out more details here:
    </Typography>
    <b>{courseLink}</b>
    <br />
    <b>{cohort.offboarding_data.hashtags}</b>
  </GreyCard>
);
