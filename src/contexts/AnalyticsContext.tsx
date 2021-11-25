import { createContext } from 'react';

const defaultValues: {
  sendAnalyticsData: Function;
} = { sendAnalyticsData: () => {} };

export const AnalyticsContext = createContext(defaultValues);
