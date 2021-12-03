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

const cohortsConfig = (rawCohorts: any, isAdmin = false) =>
  rawCohorts.map((cohort: any) => {
    const object: any = {
      id: cohort.id,
      title: cohort.name,
      path: PATH_DASHBOARD.cohorts.root(cohort.id),
      icon: ICONS.cohorts,
      children: [
        {
          title: 'home',
          path: PATH_DASHBOARD.cohorts.home(cohort.id),
          notifications: false
        },
        { title: 'sessions', path: PATH_DASHBOARD.cohorts.sessions(cohort.id) },
        {
          title: 'networking',
          path: PATH_DASHBOARD.cohorts.peers(cohort.id),
          notifications: false
        }
      ]
    };
    if (cohort.name === 'Building & Investing in Network Effects') {
      object.children = [
        ...object.children,
        {
          title: 'discord',
          path: cohort.discord_directory_url,
          externalUrl: true,
          notifications: false
        },
        {
          title: 'Q&A',
          path: PATH_DASHBOARD.cohorts.q_a(cohort.id),
          notifications: true,
          category: 'Question'
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
        },
        {
          title: 'Q&A',
          path: PATH_DASHBOARD.cohorts.q_a(cohort.id),
          notifications: true,
          category: 'Question'
        }
      ];
    }
    object.children = [...object.children];

    return object;
  });

export default cohortsConfig;
