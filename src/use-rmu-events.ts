import { useEffect } from 'react';
import { RMUContextState } from './types';
import { RMU_EVENTS } from './events';

const useRMUEvents = (ctx: RMUContextState) => {
  const events = {
    open: (event: any) => ctx.openModal(event.detail),
    close: (event: any) => ctx.closeModal(event.detail),
  };

  useEffect(() => {
    Object.keys(events).forEach(event => {
      //@ts-ignore
      window.addEventListener(RMU_EVENTS[event], events[event]);
    });

    return () => {
      Object.keys(events).forEach(event => {
        //@ts-ignore
        window.removeEventListener(RMU_EVENTS[event], events[event]);
      });
    };
  }, []);
};

export default useRMUEvents;
