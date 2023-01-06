// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';
import { Path } from '../../@types/course';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
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

export const sidebarConfig = {
  subheader: 'general',
  items: [
    {
      title: 'contact us',
      path: PATH_DASHBOARD.general.contactUs,
      icon: ICONS.contact
    }
  ]
};

export const communitySidebarConfig = {
  subheader: 'Community',
  items: [
    {
      title: 'Events',
      path: PATH_DASHBOARD.general.events,
      icon: ICONS.contact
    },
    {
      title: 'Messaging',
      path: PATH_DASHBOARD.general.messaging,
      icon: ICONS.contact
    },
    {
      title: 'Contact Us',
      path: PATH_DASHBOARD.general.contactUs,
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
      },
      {
        title: 'contact us',
        path: PATH_DASHBOARD.general.contactUs,
        icon: ICONS.contact
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
