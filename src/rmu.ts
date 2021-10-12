import { ModalComponent, ModalUnknownProps } from './types';

let open: (
  modal: string | ModalComponent,
  modalProps?: ModalUnknownProps
) => void;
let close: (modalId: string) => void;

const init = (
  _open: (
    modal: string | ModalComponent,
    modalProps?: ModalUnknownProps
  ) => void,
  _close: (modalId: string) => void
) => {
  open = _open;
  close = _close;
};

const connectedModals: Record<string, { ModalComponent: ModalComponent }> = {};

const connect = (modalId: string, ModalComponent: ModalComponent) => {
  connectedModals[modalId] = { ModalComponent };
};

const getConnectedModal = (id: string) => connectedModals[id];

const MODAL_ID_PREFIX = 'RMU_MODAL_ID';

let idCounter = 0;

const generateModalId = () => {
  idCounter++;
  return `${MODAL_ID_PREFIX}-${idCounter}`;
};

export { open, close, init, connect, getConnectedModal, generateModalId };
