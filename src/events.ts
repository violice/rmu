import { ReactNode } from 'react';
import { RMUContextState } from './types';

export const RMU_EVENTS = {
  open: 'rmu:open-modal',
  close: 'rmu:close-modal',
} as const;

type ValueOf<T> = T[keyof T];

const createEvent = (type: ValueOf<typeof RMU_EVENTS>, detail?: any) => {
  return new CustomEvent(type, { detail });
};

export const openModal = (
  modalComponent: ReactNode,
  config: { outletId?: string } = {}
) => {
  const modalId = `rmu-modal-${new Date().getTime().toString()}`;
  const { outletId = 'rmu-default-outlet' } = config;
  const event = createEvent(RMU_EVENTS.open, {
    modalId,
    modalComponent,
    outletId,
  });
  window.dispatchEvent(event);
  return { modalId, outletId };
};

export const closeModal: RMUContextState['closeModal'] = ({
  modalId,
  outletId,
}) => {
  const event = createEvent(RMU_EVENTS.close, { modalId, outletId });
  window.dispatchEvent(event);
};
