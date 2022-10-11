import { createContext } from 'react';

const defaultValues: {
  triggerOnboardingEvent: Function;
} = { triggerOnboardingEvent: () => {} };

export const OnboardingContext = createContext(defaultValues);
