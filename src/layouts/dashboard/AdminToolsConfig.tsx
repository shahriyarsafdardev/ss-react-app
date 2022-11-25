// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

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
  contact: getIcon('ic_contact')
};

const adminToolsConfig = {
  subheader: 'admin tools',
  items: [
    {
      title: 'Registrations',
      path: PATH_DASHBOARD.adminTools.root,
      icon: ICONS.cohorts
    },
    {
      title: 'sales overview',
      path: PATH_DASHBOARD.adminTools.cohort_sales,
      icon: ICONS.cohorts
    },
    {
      title: 'Cohort Experience',
      path: PATH_DASHBOARD.adminTools.cohort_experiences,
      icon: ICONS.cohorts
    },
    // {
    //   title: 'alumni',
    //   path: PATH_DASHBOARD.adminTools.alumni,
    //   icon: ICONS.cohorts
    // },
    {
      title: 'Waitlist Form',
      path: PATH_DASHBOARD.adminTools.waitlist_form,
      icon: ICONS.cohorts
    },
    {
      title: 'Surveys',
      path: PATH_DASHBOARD.adminTools.surveys,
      icon: ICONS.cohorts
    },
    {
      title: 'Zoom Sessions',
      path: PATH_DASHBOARD.adminTools.zoomSessions,
      icon: ICONS.cohorts
    }
  ]
};

export default adminToolsConfig;
