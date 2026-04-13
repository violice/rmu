import { ReactNode } from 'react';
import { OpenModalPayload, CloseModalPayload, RMUEventType } from './types';
import { emitter } from './emitter';
import { RMU_DEFAULT_OUTLET_ID } from './constants';

export const openModal = (
  modalComponent: ReactNode,
  config: { outletId?: string } = {}
): { modalId: string; outletId: string } => {
  const modalId = `rmu-modal-${new Date().getTime().toString()}`;
  const { outletId = RMU_DEFAULT_OUTLET_ID } = config;
  const payload: OpenModalPayload = {
    modalId,
    modalComponent,
    outletId,
  };
  emitter.emit<OpenModalPayload>(RMUEventType.OpenModal, payload);
  return { modalId, outletId };
};

export const closeModal = ({
  modalId,
  outletId,
}: {
  modalId: string;
  outletId: string;
}): void => {
  const payload: CloseModalPayload = { modalId, outletId };
  emitter.emit<CloseModalPayload>(RMUEventType.CloseModal, payload);
};
