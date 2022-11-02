// routes
import useAuth from 'hooks/useAuth';
import { PATH_DASHBOARD } from '../../routes/paths';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  cohorts: getIcon('ic_cohorts')
};

const CODE_TAB_COHORTS = ['HPT', 'MLS'];

const cohortsConfig = (rawCohorts: any, header: string, instructor: boolean) => ({
  subheader: header,
  items: rawCohorts.map((cohort: any) => {
    const object: any = {
      id: cohort.id,
      title: instructor ? cohort.intake_name || `Intake ${cohort.intake}` : cohort.name,
      path: PATH_DASHBOARD.cohorts.root(cohort.id),
      icon: ICONS.cohorts,
      children: [
        { title: 'live sessions', path: PATH_DASHBOARD.cohorts.sessions(cohort.id) },
        { title: 'calendar invites', path: PATH_DASHBOARD.cohorts.calendar_invites(cohort.id) },
        {
          title: instructor ? 'students' : 'networking',
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
    object.children = [
      ...object.children,
      {
        title: 'messaging',
        path: PATH_DASHBOARD.cohorts.messaging(cohort.id),
        notifications: true,
        category: 'Messaging'
      }
    ];
    if (cohort.alumni_event && !instructor) {
      object.children = [
        {
          title: 'home',
          path: PATH_DASHBOARD.cohorts.home(cohort.id),
          notifications: false
        },
        ...object.children
      ];
      return object;
    }
    // object.children = [
    //   { title: 'sessions', path: PATH_DASHBOARD.cohorts.sessions(cohort.id) },
    //   ...object.children
    // ];
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
          (['live sessions', 'Q&A', 'networking', 'code'].includes(child.title) &&
            onboarding_messaging_step_completed &&
            onboarding_questionnaire_step_completed &&
            onboarding_referral_step_completed &&
            onboarding_calendar_sync_step_completed &&
            onboarding_networking_step_completed)
        ) {
          data = { ...child, disabled: false };
        } else if (
          ['live sessions', 'Q&A', 'networking', 'messaging', 'calendar invites', 'code'].includes(
            child.title
          )
        ) {
          data = { ...child, disabled: true };
        }
      }
      return data;
    });

    object.children = [...object.children];
    return object;
  })
});

export default cohortsConfig;
