import { createContext } from 'react';

const defaultCohortValue: {
  id: string;
  cohortName: string;
  cohortIntake: number | null;
  cohort: any | null;
} = {
  id: '',
  cohortName: '',
  cohortIntake: null,
  cohort: {}
};
export const CohortContext = createContext(defaultCohortValue);

const defaultSessionValue: {
  sessionNumber: number;
} = {
  sessionNumber: 0
};

export const SessionContext = createContext(defaultSessionValue);
