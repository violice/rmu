import { useEffect } from 'react';
import { RMUContextState } from './types';
import { RMU_EVENTS } from './events';

export const useRMUEvents = (ctx: RMUContextState) => {
  const events = {
    open: (event: any) => ctx.openModal(event.detail),
    close: (event: any) => ctx.closeModal(event.detail),
  };

  useEffect(() => {
    (Object.keys(events) as (keyof typeof events)[]).forEach(event => {
      window.addEventListener(RMU_EVENTS[event], events[event]);
    });

    return () => {
      (Object.keys(events) as (keyof typeof events)[]).forEach(event => {
        window.removeEventListener(RMU_EVENTS[event], events[event]);
      });
    };
  }, []);
};
