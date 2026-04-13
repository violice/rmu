import { useEffect } from 'react';
import { RMUContextState, OpenModalPayload, CloseModalPayload } from './types';
import { RMU_EVENTS } from './constants';
import { emitter } from './emitter';

export const useRMUEvents = (ctx: RMUContextState) => {
  const events = {
    open: (payload: OpenModalPayload) => ctx.openModal(payload),
    close: (payload: CloseModalPayload) => ctx.closeModal(payload),
  };

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
};
