import React from 'react';
import { RMUContext } from './rmu-context';
import { useRMUEvents } from './use-rmu-events';
import { useRMUState } from './use-rmu-state';

export const RMUProvider = ({ children }: { children: React.ReactNode }) => {
  const state = useRMUState();

  useRMUEvents(state);

  return <RMUContext.Provider value={state}>{children}</RMUContext.Provider>;
};
