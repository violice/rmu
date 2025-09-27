import { useEffect } from 'react';
import { RMUContextState } from './types';
import { RMU_EVENTS } from './events';
import { emitter } from './emitter';

export const useRMUEvents = (ctx: RMUContextState) => {
  const events = {
    open: (payload: any) => ctx.openModal(payload),
    close: (payload: any) => ctx.closeModal(payload),
  };

  // eslint-disable react-hooks/exhaustive-deps
  useEffect(() => {
    (Object.keys(events) as (keyof typeof events)[]).forEach(event => {
      emitter.subscribe(RMU_EVENTS[event], events[event]);
    });

    return () => {
      (Object.keys(events) as (keyof typeof events)[]).forEach(event => {
        emitter.unsubscribe(RMU_EVENTS[event], events[event]);
      });
    };
  }, []);
  // eslint-enable react-hooks/exhaustive-deps
};
