import { createContext } from 'react';
import { RMUContextState } from './types';

const RMUContext = createContext<RMUContextState>({
  modals: {},
  outlets: [],
  addModal: () => null,
  removeModal: () => null,
  addOutlet: () => null,
  removeOutlet: () => null,
});

export default RMUContext;
