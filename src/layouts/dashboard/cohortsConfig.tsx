// routes
import useAuth from 'hooks/useAuth';
import { PATH_DASHBOARD } from '../../routes/paths';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  cohorts: getIcon('ic_cohorts'),
  bookshelf: getIcon('ic_bookshelf'),
  bellChart: getIcon('ic_bell_curve_chart'),
  sunlightBulb: getIcon('sunlight_bulb')
};

const CODE_TAB_COHORTS = ['HPT', 'MLS'];

export const learnerCohortsConfigV2 = (rawCohorts: any, paths: any) => {
  const cohorts = rawCohorts?.sort((a: any, b: any) => (a.name > b.name ? 1 : -1)) || [];
  const mainObject = {
    subheader: 'Courses',
    items: cohorts?.map((cohort: any) => {
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
          {
            title: 'messaging',
            path: PATH_DASHBOARD.cohorts.messaging(cohort.id),
            notifications: true,
            category: 'Messaging'
          },
          { title: 'recordings & slides', path: PATH_DASHBOARD.cohorts.sessions(cohort.id) },
          { title: 'resources', path: PATH_DASHBOARD.cohorts.resources(cohort.id) },
          {
            title: 'networking',
            path: PATH_DASHBOARD.cohorts.peers(cohort.id),
            notifications: false
          }
        ]
      };
      const { user } = useAuth();

      if (CODE_TAB_COHORTS.includes(cohort?.code)) {
        object.children = [
          ...object.children,
          { title: 'code', path: PATH_DASHBOARD.cohorts.code(cohort.id) }
        ];
      }
      if (cohort.alumni_event) {
        object.children = [
          ...object.children,
          { title: 'calendar invites', path: PATH_DASHBOARD.cohorts.calendar_invites(cohort.id) }
        ];
        return object;
      }

      object.children = [
        ...object.children,
        {
          title: 'Q&A',
          path: PATH_DASHBOARD.cohorts.q_a(cohort.id),
          notifications: false,
          category: 'Question'
        },
        { title: 'calendar invites', path: PATH_DASHBOARD.cohorts.calendar_invites(cohort.id) }
      ];

      object.children = object.children.map((child: any) => {
        const {
          onboarding_messaging_step_completed,
          onboarding_questionnaire_step_completed,
          onboarding_referral_step_completed,
          onboarding_calendar_sync_step_completed,
          onboarding_networking_step_completed
        } = cohort?.onboarding_data;
        let data = { ...child, disabled: false };
        if (user?.type === 'learner') {
          if (
            (child.title === 'calendar invites' &&
              onboarding_messaging_step_completed &&
              onboarding_questionnaire_step_completed &&
              onboarding_referral_step_completed) ||
            (child.title === 'messaging' && onboarding_messaging_step_completed) ||
            (['recordings & slides', 'Q&A', 'networking', 'code', 'resources'].includes(
              child.title
            ) &&
              onboarding_messaging_step_completed &&
              onboarding_questionnaire_step_completed &&
              onboarding_referral_step_completed &&
              onboarding_calendar_sync_step_completed &&
              onboarding_networking_step_completed)
          ) {
            data = { ...child, disabled: false };
          } else if (
            [
              'recordings & slides',
              'Q&A',
              'networking',
              'messaging',
              'calendar invites',
              'code',
              'resources'
            ].includes(child.title)
          ) {
            data = { ...child, disabled: true };
          }
        }
        return data;
      });

      object.children = [...object.children];
      return object;
    })
  };
  const object = {
    title: 'all courses',
    path: PATH_DASHBOARD.general.allCourses,
    icon: ICONS.bookshelf
  };

  const paths_link = paths.map((path: any) => ({
    title: path.name,
    path: PATH_DASHBOARD.coursePaths.root(path.slug),
    icon: ICONS.bellChart
  }));
  mainObject.items = [...paths_link, object, ...mainObject.items];
  return mainObject;
};

export const instructorCohortsConfig = (rawCohorts: any, header: string) => ({
  subheader: header,
  items: rawCohorts.map((cohort: any) => {
    const object: any = {
      id: cohort.id,
      title: cohort.intake_name || `Intake ${cohort.intake}`,
      path: PATH_DASHBOARD.cohorts.root(cohort.id),
      icon: ICONS.cohorts,
      children: [
        {
          title: 'registrations',
          path: PATH_DASHBOARD.cohorts.registrations(cohort.id),
          notifications: false,
          disabled: false
        },
        // {
        //   title: 'networking',
        //   path: PATH_DASHBOARD.cohorts.networking(cohort.id),
        //   notifications: false
        // },
        {
          title: 'attendance',
          path: PATH_DASHBOARD.cohorts.attendance(cohort.id),
          notifications: false,
          disabled: false
        },
        {
          title: 'analytics',
          path: PATH_DASHBOARD.cohorts.analytics(cohort.id, cohort.host_names),
          notifications: false,
          disabled: false
        },
        {
          title: 'recordings & slides',
          path: PATH_DASHBOARD.cohorts.sessions(cohort.id),
          disabled: false
        },
        { title: 'resources', path: PATH_DASHBOARD.cohorts.resources(cohort.id), disabled: false },
        {
          title: 'calendar invites',
          path: PATH_DASHBOARD.cohorts.calendar_invites(cohort.id),
          disabled: false
        },
        {
          title: 'students',
          path: PATH_DASHBOARD.cohorts.peers(cohort.id),
          notifications: false,
          disabled: false
        }
      ]
    };
    if (CODE_TAB_COHORTS.includes(cohort?.code)) {
      object.children = [
        ...object.children,
        { title: 'code', path: PATH_DASHBOARD.cohorts.code(cohort.id), disabled: false }
      ];
    }
    object.children = [
      ...object.children,
      {
        title: 'messaging',
        path: PATH_DASHBOARD.cohorts.messaging(cohort.id),
        notifications: true,
        category: 'Messaging',
        disabled: false
      },
      {
        title: 'Q&A',
        path: PATH_DASHBOARD.cohorts.q_a(cohort.id),
        notifications: false,
        category: 'Question',
        disabled: false
      }
    ];

    object.children = [...object.children];
    return object;
  })
});
