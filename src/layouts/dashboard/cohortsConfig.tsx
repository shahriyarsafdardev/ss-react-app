// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  cohorts: getIcon('ic_cohorts')
};

const cohortsConfig = (rawCohorts: any, header: string, instructor: boolean) => ({
  subheader: header,
  items: rawCohorts.map((cohort: any) => {
    const object: any = {
      id: cohort.id,
      title: instructor ? cohort.intake_name || `Intake ${cohort.intake}` : cohort.name,
      path: PATH_DASHBOARD.cohorts.root(cohort.id),
      icon: ICONS.cohorts,
      children: [
        {
          title: instructor ? 'students' : 'networking',
          path: PATH_DASHBOARD.cohorts.peers(cohort.id),
          notifications: false
        }
      ]
    };
    if (cohort.alumni_event && !instructor) {
      return object;
    }
    object.children = [
      { title: 'sessions', path: PATH_DASHBOARD.cohorts.sessions(cohort.id) },
      ...object.children
    ];
    if (instructor) {
      object.children = [
        {
          title: 'registrations',
          path: PATH_DASHBOARD.cohorts.registrations(cohort.id),
          notifications: false
        },
        // {
        //   title: 'networking',
        //   path: PATH_DASHBOARD.cohorts.networking(cohort.id),
        //   notifications: false
        // },
        {
          title: 'attendance',
          path: PATH_DASHBOARD.cohorts.attendance(cohort.id),
          notifications: false
        },
        {
          title: 'analytics',
          path: PATH_DASHBOARD.cohorts.analytics(cohort.id, cohort.host_names),
          notifications: false
        },
        ...object.children
      ];
    } else {
      object.children = [
        {
          title: 'home',
          path: PATH_DASHBOARD.cohorts.home(cohort.id),
          notifications: false
        },
        ...object.children
      ];
    }
    object.children = [
      ...object.children,
      {
        title: 'Q&A',
        path: PATH_DASHBOARD.cohorts.q_a(cohort.id),
        notifications: false,
        category: 'Question'
      }
    ];
    if (cohort.name === 'Building & Investing in Network Effects') {
      object.children = [
        ...object.children,
        {
          title: 'discord',
          path: cohort.discord_directory_url,
          externalUrl: true,
          notifications: false
        }
      ];
    } else {
      object.children = [
        ...object.children,
        {
          title: 'messaging',
          path: PATH_DASHBOARD.cohorts.messaging(cohort.id),
          notifications: true,
          category: 'Messaging'
        }
      ];
    }
    object.children = [...object.children];
    return object;
  })
});

export default cohortsConfig;
