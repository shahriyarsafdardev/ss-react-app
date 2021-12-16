import { uniq } from 'lodash';
import { Cohort } from '../../@types/cohorts';

export const getCategories = (cohorts: Cohort[]) =>
  uniq(cohorts.map((cohort) => cohort.code?.toLowerCase()));
export const getLearnerCohorts = (cohorts: Cohort[]) =>
  cohorts.filter((cohort) => cohort.released_for_learners);
export const getInstructorCohorts = (cohorts: Cohort[], category: string) =>
  cohorts.filter((cohort) => cohort.code?.toLowerCase() === category);
