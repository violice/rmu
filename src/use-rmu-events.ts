import { useEffect } from 'react';
import { RMUContextState } from './types';
import { RMU_EVENTS } from './events';
import { emitter } from './emitter';

export const useRMUEvents = (ctx: RMUContextState) => {
  const events = {
    open: (payload: any) => ctx.openModal(payload),
    close: (payload: any) => ctx.closeModal(payload),
  };

  useEffect(() => {
    (Object.keys(events) as (keyof typeof events)[]).forEach(event => {
      emitter.on(RMU_EVENTS[event], events[event]);
    });

    return () => {
      (Object.keys(events) as (keyof typeof events)[]).forEach(event => {
        emitter.off(RMU_EVENTS[event], events[event]);
      });
    };
  }, []);
};
