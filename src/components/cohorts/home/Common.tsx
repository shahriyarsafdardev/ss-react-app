import { styled } from '@material-ui/core/styles';
import { Box, CircularProgress, Divider, Typography, Stack, Avatar, Link } from '@material-ui/core';
import { uniq } from 'lodash';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';

export const SectionContainer = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  boxShadow: '0px 0px 4px rgba(145, 158, 171, 0.24), 0px 24px 48px rgba(145, 158, 171, 0.24)',
  borderRadius: '16px',
  padding: '20px',
  '&.timeline': {
    height: '150px',
    [theme.breakpoints.down('sm')]: {
      height: '310px'
    }
  },
  '&.analytics': {
    height: '190px',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
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

const AnalyticsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%'
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  width: '100%',
  margin: '0.5rem 0'
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
    .add(Number(sessionLength.split(' ')[0]), 'hours')
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

export const InfoTooltip = ({ title }: { title?: any }) => (
  <Tooltip arrow placement="top" title={<span className="ui-copy text-white">{title}</span>}>
    <img src="/static/registration/Info.svg" alt="Info Icon" />
  </Tooltip>
);

export const RevenueHighlight = ({
  heading,
  value,
  type,
  difference,
  tooltipMessage
}: {
  heading?: any;
  value?: any;
  type?: any;
  difference: any;
  tooltipMessage: string;
}) => (
  <Stack direction="column" alignItems="center" spacing={1}>
    <Stack direction="row" spacing={1}>
      <Typography alignItems="center" flexDirection="row" variant="subtitle2">
        {heading}
      </Typography>
      <InfoTooltip title={tooltipMessage} />
    </Stack>
    <Typography variant="h3">
      {type === 'price' && '$'}
      {value}
    </Typography>
    <Stack direction="row">
      <img src="/static/home/increase.svg" alt="increase arrow" />
      <Typography variant="subtitle2">+{difference}%</Typography>
    </Stack>
  </Stack>
);

export const CompanyHighlight = ({
  name,
  image,
  count
}: {
  name?: string;
  image?: string;
  count?: number;
}) => (
  <Stack direction="column" alignItems="center">
    <Avatar alt={name} src={image} sx={{ width: 30, height: 30 }} />

    <Typography variant="subtitle2">{name}</Typography>
    <Typography variant="caption" color="#637381">
      {count} participants
    </Typography>
  </Stack>
);

export const IndustryHighlight = ({
  name,
  link,
  count
}: {
  name?: string;
  link?: string;
  count?: number;
}) => (
  <Stack direction="column" alignItems="center">
    <Typography variant="subtitle2">{name}</Typography>
    <Typography variant="caption" color="#637381">
      {count} participants
    </Typography>
    <a href={link}>
      <Typography variant="caption" color="#637381">
        Explore
      </Typography>
    </a>
  </Stack>
);

export const getAnalyticsData = () => [
  <AnalyticsContainer key="1">
    <Typography variant="h6">Your cohort has been getting great traction!</Typography>
    <StyledDivider />
    <Stack
      sx={{ width: '100%', height: '100%' }}
      direction="row"
      justifyContent="space-around"
      alignItems="center"
    >
      <RevenueHighlight
        heading="Your Earnings"
        value={12765}
        type="price"
        difference={12}
        tooltipMessage="80% of all revenue from registrations"
      />
      <RevenueHighlight
        heading="In The Pipeline"
        value={128765}
        type="price"
        difference={6}
        tooltipMessage="80% * (Combined value of all unconverted registrations)"
      />
      <RevenueHighlight
        heading="Page Impressions"
        value={1765}
        type="number"
        difference={10}
        tooltipMessage="Registration page views"
      />
    </Stack>
  </AnalyticsContainer>,
  <AnalyticsContainer key="2">
    <Typography variant="h6">Students from 12 companies have aleady joined!</Typography>
    <StyledDivider />
    <Stack
      sx={{ width: '100%', height: '100%' }}
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <CompanyHighlight name="Adobe" count={13} image="/static/home/increase.svg" />
      <CompanyHighlight name="Dropbox" count={8} image="/static/home/increase.svg" />
      <CompanyHighlight name="Apple" count={5} image="/static/home/increase.svg" />
      <CompanyHighlight name="Microsoft" count={4} image="/static/home/increase.svg" />
      <CompanyHighlight name="BBC" count={2} image="/static/home/increase.svg" />
      <CompanyHighlight name="Atlassian" count={1} image="/static/home/increase.svg" />
    </Stack>
  </AnalyticsContainer>,
  <AnalyticsContainer key="3">
    <Typography variant="h6">From countries all over the world</Typography>
    <StyledDivider />
    <Stack
      sx={{ width: '100%', height: '100%' }}
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <CompanyHighlight name="Germany" count={13} image="/static/home/increase.svg" />
      <CompanyHighlight name="Denmark" count={12} image="/static/home/increase.svg" />
      <CompanyHighlight name="France" count={2} image="/static/home/increase.svg" />
      <CompanyHighlight name="Ghana" count={1} image="/static/home/increase.svg" />
      <CompanyHighlight name="Australia" count={1} image="/static/home/increase.svg" />
    </Stack>
  </AnalyticsContainer>,
  <AnalyticsContainer key="4">
    <Typography variant="h6">In a variety of roles</Typography>
    <StyledDivider />
    <Stack
      sx={{ width: '100%', height: '100%' }}
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <IndustryHighlight name="Product" count={13} link="/" />
      <IndustryHighlight name="Founder" count={5} link="/" />
      <IndustryHighlight name="Data" count={2} link="/" />
      <IndustryHighlight name="Research" count={1} link="/" />
    </Stack>
  </AnalyticsContainer>,
  <AnalyticsContainer key="5">
    <Typography variant="h6">And industries</Typography>
    <StyledDivider />
    <Stack
      sx={{ width: '100%', height: '100%' }}
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <IndustryHighlight name="SaaS" count={13} link="/" />
      <IndustryHighlight name="Health Care" count={5} link="/" />
      <IndustryHighlight name="Pharma" count={2} link="/" />
      <IndustryHighlight name="Space" count={1} link="/" />
    </Stack>
  </AnalyticsContainer>
];
