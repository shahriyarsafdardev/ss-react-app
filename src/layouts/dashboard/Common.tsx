import { uniq } from 'lodash';
import { Cohort } from '../../@types/cohorts';

export const getCategories = (cohorts: Cohort[]) =>
  uniq(cohorts.filter((cohort) => cohort.is_host).map((cohort) => cohort.name?.toLowerCase()));
export const getLearnerCohorts = (cohorts: Cohort[]) =>
  cohorts.filter((cohort) => cohort.released_for_learners);
export const getInstructorCohorts = (cohorts: Cohort[], category: string) =>
  cohorts
    .filter((cohort) => cohort.name?.toLowerCase() === category && cohort.is_host)
    .sort((a, b) => a.intake - b.intake);
