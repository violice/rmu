import React from 'react';

const connectedModals: Record<string, { ModalComponent: React.FC }> = {};

const connect = (id: string, ModalComponent: React.FC) => {
  connectedModals[id] = { ModalComponent };
};

const getConnectedModal = (id: string) => connectedModals[id];

let open: (id: string, props?: Record<string, unknown>) => void;
let close: (id: string) => void;

const init = (
  _open: (id: string, props?: Record<string, unknown>) => void,
  _close: (id: string) => void
) => {
  open = _open;
  close = _close;
};

export { connect, getConnectedModal, open, close, init };
