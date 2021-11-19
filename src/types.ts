import React from 'react';

export type RMUModalProps = {
  rmu: {
    modalId: string;
    close: () => void;
  };
};

export type RMUModal = React.FC<RMUModalProps>;

export type UnknownProps = Record<string, unknown>;

export type RMUContextState = {
  modals: Record<
    string,
    {
      ModalComponent: RMUModal;
      modalProps: UnknownProps;
      outletId: string;
    }
  >;
  outlets: string[];
  addModal: (
    modalId: string,
    modalProps: UnknownProps,
    outletId?: string
  ) => void;
  removeModal: (modalId: string) => void;
  addOutlet: (outletId: string) => void;
  removeOutlet: (outletId: string) => void;
};
