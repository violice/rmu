import React from 'react';

const connectedModals: {
  [id: string]: { ModalComponent: React.FC<Record<string, unknown>> };
} = {};

const connect = (
  id: string,
  ModalComponent: React.FC<Record<string, unknown>>
) => {
  connectedModals[id] = { ModalComponent };
};

const getConnectedModal = (id: string) => connectedModals[id];

let open: (id: string, props?: Record<string, unknown>) => void;
let close: (id: string) => void;

const init = (
  o: (id: string, props?: Record<string, unknown>) => void,
  c: (id: string) => void
) => {
  open = o;
  close = c;
};

export { connect, getConnectedModal, open, close, init };
