import { createContext } from 'react';

const defaultValues: { showLimitModal: Function } = {
  showLimitModal: () => {}
};

export const ResourceContext = createContext(defaultValues);
