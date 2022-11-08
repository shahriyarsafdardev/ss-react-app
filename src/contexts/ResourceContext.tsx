import { createContext } from 'react';

const defaultValues: {
  setSelectedResource: Function;
} = { setSelectedResource: () => {} };

export const ResourceContext = createContext(defaultValues);
