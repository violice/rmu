import { RMUModal, UnknownProps } from './types';

const MODAL_ID_PREFIX = 'RMU_MODAL_ID';
let idCounter = 0;

const generateModalId = () => {
  idCounter++;
  return `${MODAL_ID_PREFIX}-${idCounter}`;
};

const connectedModals: Record<string, { ModalComponent: RMUModal }> = {};

const connect = (modalId: string, ModalComponent: RMUModal) => {
  connectedModals[modalId] = { ModalComponent };
};

const getConnectedModal = (id: string) => connectedModals[id];

const rmu: {
  connect: (modalId: string, ModalComponent: RMUModal) => void;
  open: (
    modal: string | RMUModal,
    modalProps?: UnknownProps,
    outletId?: string
  ) => void;
  close: (modalId: string) => void;
} = {
  connect,
  open: () => {},
  close: () => {},
};

const init = (
  _open: (modal: string | RMUModal, modalProps?: UnknownProps) => void,
  _close: (modalId: string) => void
) => {
  rmu.open = _open;
  rmu.close = _close;
};

export { rmu, init, connect, getConnectedModal, generateModalId };
