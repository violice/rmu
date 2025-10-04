import { ReactNode } from 'react';
import { RMUContextState } from './types';
import { emitter } from './emitter';

export const RMU_EVENTS = {
  open: 'rmu:open-modal',
  close: 'rmu:close-modal',
} as const;

export const openModal = (
  modalComponent: ReactNode,
  config: { outletId?: string } = {}
) => {
  const modalId = `rmu-modal-${new Date().getTime().toString()}`;
  const { outletId = 'rmu-default-outlet' } = config;
  emitter.emit(RMU_EVENTS.open, {
    modalId,
    modalComponent,
    outletId,
  });
  return { modalId, outletId };
};

export const closeModal: RMUContextState['closeModal'] = ({
  modalId,
  outletId,
}) => {
  emitter.emit(RMU_EVENTS.close, { modalId, outletId });
};
