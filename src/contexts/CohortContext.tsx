import { createContext } from 'react';

const defaultCohortValue: {
  id: string;
  name: string;
  intake: number | null;
} = {
  id: '',
  name: '',
  intake: null
};
export const CohortContext = createContext(defaultCohortValue);

const defaultSessionValue: {
  sessionNumber: number;
} = {
  sessionNumber: 0
};

export const SessionContext = createContext(defaultSessionValue);
