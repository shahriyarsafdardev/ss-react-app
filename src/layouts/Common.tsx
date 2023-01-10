import { alpha, styled } from '@material-ui/core/styles';
// routes
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
import { PATH_DASHBOARD } from '../routes/paths';
// components
import SvgIconStyle from '../components/SvgIconStyle';
import { Path } from '../@types/course';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;
const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;
export const COLLAPSE_WIDTH = 102;

export const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

export const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24
  }
}));

export const SidebarRootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.complex
    })
  }
}));

export const NavbarRootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`
  }
}));

export const LogoContainer = styled(Box)(({ theme }) => ({
  padding: '2.5rem',
  display: 'flex'
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  padding: '25px'
}));

export const ReferralStyledBox = styled(Box)(({ theme }) => ({
  height: '500px',
  [theme.breakpoints.down('md')]: {
    height: '700px'
  }
}));

export const LabelStyled = styled('label')(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 700,
  lineHeight: '20px',
  '&.blue': {
    color: theme.palette.primary.main
  },
  '&.gray': {
    color: theme.palette.text.primary
  }
}));

export const SwitcherButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  marginTop: '10px'
}));

export const ViewSwitcherStyle = styled('div')(({ theme }) => ({
  padding: 18,
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '24px',
  background: '#F1F1FB',
  borderRadius: 8
}));

export const ViewReferralLinks = styled(ViewSwitcherStyle)(({ theme }) => ({
  margin: '30px 20px'
}));

export const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

export const CompanyLogo = styled(Box)(({ theme }) => ({
  margin: '2rem 0 0 2rem',
  [theme.breakpoints.down('md')]: {
    display: 'none',
    margin: '0'
  }
}));

export const HeadText = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  textTransform: 'capitalize',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem'
  },
  [theme.breakpoints.down(345)]: {
    fontSize: '13px !important'
  },
  [theme.breakpoints.down(301)]: {
    fontSize: '10px !important'
  }
}));

export const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
  discover: getIcon('ic_discover'),
  cohorts: getIcon('ic_cohorts'),
  contact: getIcon('ic_contact'),
  bookshelf: getIcon('ic_bookshelf'),
  bellChart: getIcon('ic_bell_curve_chart')
};

export const communitySidebarConfig = {
  subheader: 'Community',
  items: [
    {
      title: 'Events',
      path: PATH_DASHBOARD.community.events,
      icon: ICONS.contact
    },
    {
      title: 'Messaging',
      path: PATH_DASHBOARD.community.messaging,
      icon: ICONS.contact
    },
    {
      title: 'Contact Us',
      path: PATH_DASHBOARD.community.contactUs,
      icon: ICONS.contact
    }
  ]
};

export const learnerSidebarConfig = (paths: Path[]) => {
  const object = {
    subheader: 'your learning journey',
    items: [
      {
        title: 'all courses',
        path: PATH_DASHBOARD.general.allCourses,
        icon: ICONS.bookshelf
      }
    ]
  };
  const paths_link = paths.map((path) => ({
    title: path.name,
    path: PATH_DASHBOARD.coursePaths.root(path.slug),
    icon: ICONS.bellChart
  }));
  object.items = [...paths_link, ...object.items];
  return object;
};
