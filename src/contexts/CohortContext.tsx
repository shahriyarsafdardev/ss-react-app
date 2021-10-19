import { createContext } from 'react';

const defaultCohortValue: {
  id: string;
  name: string;
} = {
  id: '',
  name: ''
};
export const CohortContext = createContext(defaultCohortValue);

const defaultSessionValue: {
  sessionNumber: number;
} = {
  sessionNumber: 0
};

export const SessionContext = createContext(defaultSessionValue);
