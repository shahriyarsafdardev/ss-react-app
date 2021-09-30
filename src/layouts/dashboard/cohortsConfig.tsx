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

const cohortsConfig = (rawCohorts: any) =>
  rawCohorts.map((cohort: any) => ({
    title: cohort.name,
    path: PATH_DASHBOARD.cohorts.root(cohort.id),
    icon: ICONS.cohorts,
    children: [
      { title: 'sessions', path: PATH_DASHBOARD.cohorts.sessions(cohort.id) },
      { title: 'peers', path: PATH_DASHBOARD.cohorts.peers(cohort.id) },
      { title: 'discord', path: 'https://discord.com/', externalUrl: true }
    ]
  }));

export default cohortsConfig;
