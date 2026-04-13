import { ReactNode } from 'react';

export enum RMUEventType {
  OpenModal = 'RMU:OPEN_MODAL',
  CloseModal = 'RMU:CLOSE_MODAL',
}

export type RMUContextState = {
  outlets: Record<string, Record<string, ReactNode>>;
  openModal: (payload: OpenModalPayload) => void;
  closeModal: (payload: CloseModalPayload) => void;
  addOutlet: (outletId: string) => void;
  removeOutlet: (outletId: string) => void;
};

export type OpenModalPayload = {
  modalId: string;
  modalComponent: ReactNode;
  outletId: string;
};

export type CloseModalPayload = {
  modalId: string;
  outletId: string;
};

export type RMUEventPayload = OpenModalPayload | CloseModalPayload;
