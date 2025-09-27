import { useEffect } from 'react';
import { RMUContextState } from './types';
import { RMU_EVENTS } from './events';
import { rmuEmitter } from './emitter';

export const useRMUEvents = (ctx: RMUContextState) => {
  const events = {
    open: (payload: any) => ctx.openModal(payload),
    close: (payload: any) => ctx.closeModal(payload),
  };

  useEffect(() => {
    const unsubs = (Object.keys(events) as (keyof typeof events)[]).map(event =>
      rmuEmitter.on(RMU_EVENTS[event], events[event])
    );

    return () => {
      unsubs.forEach(unsub => unsub());
    };
  }, []);
};
