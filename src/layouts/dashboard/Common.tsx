/* eslint-disable no-else-return */
import { uniq } from 'lodash';
import { Cohort } from '../../@types/cohorts';

export const seasonOrder: { [index: string]: number } = {
  winter: 4,
  spring: 3,
  summer: 2,
  fall: 1
};

export const comparatorFuntion = (intake1: string, intake2: string) => {
  const block1 = intake1?.split(' ');
  const block2 = intake2?.split(' ');
  if (block1?.length === 2 && block2?.length === 2) {
    if (Number(block1[1]) && Number(block2[1])) {
      if (Number(block1[1]) === Number(block2[1])) {
        // if year is same, compare the season
        return seasonOrder[block1[0].toLowerCase()] > seasonOrder[block2[0].toLowerCase()] ? 1 : -1;
      } else {
        return Number(block1[1]) < Number(block2[1]) ? 1 : -1;
      }
    }
  }
  return -1;
};

export const sortByIntake = (intakeCategories: string[]) =>
  intakeCategories.sort(comparatorFuntion);

export const getCategories = (cohorts: Cohort[]) =>
  uniq(cohorts.filter((cohort) => cohort.is_host).map((cohort) => cohort.name?.toLowerCase()));

export const getInstructorCohorts = (cohorts: Cohort[], category: string) =>
  cohorts
    .filter((cohort) => cohort.name?.toLowerCase() === category && cohort.is_host)
    .sort((a, b) => comparatorFuntion(a.intake_name, b.intake_name));

export const groupByIntake = (cohorts: Cohort[]) =>
  sortByIntake(uniq(cohorts.map((c) => c.intake_name)));

export const getLearnerCohorts = (cohorts: Cohort[], category: string) =>
  cohorts.filter((item) => item.intake_name === category);
