import { ReactNode } from 'react';

export type RMUContextState = {
  outlets: Record<string, Record<string, ReactNode>>;
  openModal: ({
    modalId,
    modalComponent,
    outletId,
  }: {
    modalId: string;
    modalComponent: ReactNode;
    outletId: string;
  }) => void;
  closeModal: ({
    modalId,
    outletId,
  }: {
    modalId: string;
    outletId: string;
  }) => void;
  addOutlet: (outletId: string) => void;
  removeOutlet: (outletId: string) => void;
};
