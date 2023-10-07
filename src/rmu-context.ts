import { createContext } from 'react';
import { RMUContextState } from './types';

export const RMUContext = createContext<RMUContextState | null>(null);
