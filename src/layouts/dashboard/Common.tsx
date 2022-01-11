import { uniq } from 'lodash';
import { Cohort } from '../../@types/cohorts';

export const getCategories = (cohorts: Cohort[]) =>
  uniq(cohorts.filter((cohort) => cohort.is_host).map((cohort) => cohort.name?.toLowerCase()));
export const getInstructorCohorts = (cohorts: Cohort[], category: string) =>
  cohorts
    .filter((cohort) => cohort.name?.toLowerCase() === category && cohort.is_host)
    .sort((a, b) => a.intake - b.intake);
