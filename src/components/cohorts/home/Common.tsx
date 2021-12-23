import { styled } from '@material-ui/core/styles';
import {
  Box,
  CircularProgress,
  Divider,
  Typography,
  Stack,
  Avatar,
  LinearProgress
} from '@material-ui/core';
import ReactApexChart from 'react-apexcharts';
//
import { uniq, groupBy, merge } from 'lodash';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import BaseOptionChart from '../../charts/BaseOptionChart';
import { Enrollment, Session } from '../../../@types/cohorts';
import { fShortenNumber } from '../../../utils/formatNumber';

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

export const findLastSession = (sessions: Session[]) => {
  let found = false;
  let sessionIndex = sessions.length - 1;
  sessions?.forEach((session, index) => {
    if (!found && moment(firstUpcomingDate(session.times)).add(1, 'hour') > moment()) {
      sessionIndex = index;
      found = true;
    }
  });
  if (found && sessionIndex > 0) {
    return sessions[sessionIndex - 1];
  }
  return sessions[sessionIndex];
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

export const StarResponses = ({
  heading,
  value,
  total
}: {
  heading?: any;
  value?: any;
  total?: any;
}) => (
  <Stack sx={{ mb: 2 }} direction="column" spacing={1}>
    <Stack direction="row" spacing={1} justifyContent="space-between">
      <Typography alignItems="center" flexDirection="row" variant="subtitle2">
        {heading}
      </Typography>
      <Typography alignItems="center" flexDirection="row" variant="subtitle2">
        {value}/{total}
      </Typography>
    </Stack>
    <LinearProgress
      variant="determinate"
      value={(value / total) * 100}
      sx={{
        width: '100%',
        flexGrow: 1,
        bgcolor: 'divider'
      }}
    />
  </Stack>
);

export const ChartDonut = ({ data, labels }: { data: any; labels: string[] }) => {
  const chartOptions = merge(BaseOptionChart(), {
    labels,
    stroke: { show: false },
    legend: { horizontalAlign: 'center' },
    plotOptions: { pie: { donut: { size: '90%' } } }
  });

  return <ReactApexChart type="donut" series={data} options={chartOptions} width={400} />;
};

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
      {count} participant{count !== 1 && 's'}
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
      {count} participant{count !== 1 && 's'}
    </Typography>
    <a href={link}>
      <Typography variant="caption" color="#637381">
        Explore
      </Typography>
    </a>
  </Stack>
);
const getRevenue = (enrollments: Enrollment[]) => {
  const totalEnrollments = enrollments.filter((e) => e.status === 'Paid');
  let totalRevenue = 0;
  let currentWeekRevenue = 0;
  totalEnrollments.map((enrollment) => {
    totalRevenue += Number(enrollment.price);
    return enrollment;
  });
  const startDate = moment().startOf('week').add(1, 'days');
  const newEnrollments = totalEnrollments.filter(
    (e: any) => !!e.paid_time && moment(e.paid_time) >= startDate
  );
  newEnrollments.map((enrollment) => {
    currentWeekRevenue += Number(enrollment.price);
    return enrollment;
  });
  totalRevenue *= 0.8;
  currentWeekRevenue *= 0.8;
  const difference = totalRevenue - currentWeekRevenue;
  return {
    total: totalRevenue,
    increase: (currentWeekRevenue / difference) * 100 || 0
  };
};

const getPipelineRevenue = (enrollments: Enrollment[]) => {
  const totalEnrollments = enrollments.filter((e) => e.status !== 'Paid');
  let totalRevenue = 0;
  let currentWeekRevenue = 0;
  totalEnrollments.map((enrollment) => {
    totalRevenue += Number(enrollment.price);
    return enrollment;
  });
  const startDate = moment().startOf('week').add(1, 'days');
  const newEnrollments = totalEnrollments.filter(
    (e: any) => !!e.time && moment(e.time) >= startDate
  );
  newEnrollments.map((enrollment) => {
    currentWeekRevenue += Number(enrollment.price);
    return enrollment;
  });
  totalRevenue *= 0.8;
  currentWeekRevenue *= 0.8;
  const difference = totalRevenue - currentWeekRevenue;
  return {
    total: totalRevenue,
    increase: (currentWeekRevenue / difference) * 100 || 0
  };
};

const getCompanies = (enrollments: Enrollment[]) => {
  const grouped = groupBy(enrollments, 'current_company.name');
  const sorted: any[] = [];
  const keys = Object.keys(grouped);
  keys.map((key) => {
    if (key !== 'undefined') {
      sorted.push({
        name: key,
        count: grouped[key].length,
        logo: grouped[key][0].current_company.logo_url
      });
    }
  });
  return sortItemsWithCount(sorted);
};

const getRoles = (enrollments: Enrollment[], type: string) => {
  const grouped: any = {};
  enrollments.map((enrollment: any) => {
    if (enrollment[type] && enrollment[type] != []) {
      enrollment[type].map((item: any) => {
        if (grouped[item]) {
          grouped[item] += 1;
        } else {
          grouped[item] = 1;
        }
      });
    }
  });
  const sorted: any[] = [];
  const keys = Object.keys(grouped);
  keys.map((key) => {
    if (key) {
      sorted.push({
        name: key,
        count: grouped[key]
      });
    }
  });
  return sortItemsWithCount(sorted);
};

export const sortItemsWithCount = (items: any[]) =>
  [...items].sort((a, b) => (a.count > b.count ? -1 : 1));

export const getAnalyticsData = (cohort_id: string, enrollments: Enrollment[]) => {
  const revenue = getRevenue(enrollments);
  const pipeline = getPipelineRevenue(enrollments);
  const companies = getCompanies(enrollments);
  const roles = getRoles(enrollments, 'current_role_category_selections');
  const industries = getRoles(enrollments, 'current_industry_category_selections');

  const items = [
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
          value={fShortenNumber(revenue.total)}
          type="price"
          difference={revenue.increase}
          tooltipMessage="80% of all revenue from registrations"
        />
        <RevenueHighlight
          heading="In The Pipeline"
          value={fShortenNumber(pipeline.total)}
          type="price"
          difference={pipeline.increase}
          tooltipMessage="80% * (Combined value of all unconverted registrations)"
        />
        <RevenueHighlight
          heading="Page Impressions"
          value={fShortenNumber(1765)}
          type="number"
          difference={10}
          tooltipMessage="Registration page views"
        />
      </Stack>
    </AnalyticsContainer>
  ];
  if (companies.length > 0) {
    items.push(
      <AnalyticsContainer key="2">
        <Typography variant="h6">
          Students from {companies.length} companie{companies.length === 1 ? ' has' : 's have'}{' '}
          aleady joined!
        </Typography>
        <StyledDivider />
        <Stack
          sx={{ width: '100%', height: '100%' }}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          {companies.slice(0, 6).map((company) => (
            <CompanyHighlight
              key={company.name}
              name={company.name}
              count={company.count}
              image={company.logo}
            />
          ))}
        </Stack>
      </AnalyticsContainer>
    );
  }
  items.push(
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
    </AnalyticsContainer>
  );
  if (roles.length > 0) {
    items.push(
      <AnalyticsContainer key="4">
        <Typography variant="h6">In a variety of roles</Typography>
        <StyledDivider />
        <Stack
          sx={{ width: '100%', height: '100%' }}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          {roles.slice(0, 4).map((role) => (
            <IndustryHighlight key={role.name} name={role.name} count={role.count} link="/" />
          ))}
        </Stack>
      </AnalyticsContainer>
    );
  }
  if (industries.length > 0) {
    items.push(
      <AnalyticsContainer key="5">
        <Typography variant="h6">And industries</Typography>
        <StyledDivider />
        <Stack
          sx={{ width: '100%', height: '100%' }}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          {industries.slice(0, 4).map((role) => (
            <IndustryHighlight key={role.name} name={role.name} count={role.count} link="/" />
          ))}
        </Stack>
      </AnalyticsContainer>
    );
  }

  return items;
};

const getSessionDueDate = (session: Session, days: number) => {
  const date = moment(firstUpcomingDate(session.times)).subtract(days, 'days').format('MMMM Do');
  if (moment().format('MMMM Do') === date) {
    return 'Today';
  }
  return date;
};

export const getCohortGuides = (cohortID: string, sessions: Session[]) => {
  const items = [
    {
      heading: 'Distribution Playbook',
      link: '/',
      complete: false,
      due: getSessionDueDate(sessions[0], 7)
    },
    {
      heading: 'Zoom Setup Guide',
      link: '/',
      complete: false,
      due: getSessionDueDate(sessions[0], 7)
    },
    {
      heading: 'Platform Tour',
      link: '/',
      complete: false,
      due: getSessionDueDate(sessions[0], 7)
    }
  ];
  sessions.map((session) => {
    items.push(
      {
        heading: `${session.custom_name || `Session ${session.number}`}: Upload Materials`,
        link: `/cohorts/${cohortID}/sessions?session=${session.number}&tab=0`,
        complete: session.session_materials.length > 0,
        due: getSessionDueDate(session, 2)
      },
      {
        heading: `${session.custom_name || `Session ${session.number}`}: Upload Slides`,
        link: `/cohorts/${cohortID}/sessions?session=${session.number}&tab=1`,
        complete: !!session.presentation_pdf_url,
        due: getSessionDueDate(session, 1)
      }
    );
  });

  return items;
};
