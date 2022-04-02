import { createContext } from 'react';
import { RMUContextState } from './types';

//@ts-ignore
const RMUContext = createContext<RMUContextState>(null);

export default RMUContext;
