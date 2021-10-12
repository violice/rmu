import { createContext } from 'react';
import { RMUModal, UnknownProps } from './types';

type RMUContextState = {
  modals: Record<
    string,
    {
      ModalComponent: RMUModal;
      modalProps: UnknownProps;
    }
  >;
  open: (modalId: string, modalProps: UnknownProps) => void;
  close: (modalId: string) => void;
};

const RMUContext = createContext<RMUContextState>({
  modals: {},
  open: () => null,
  close: () => null,
});

export default RMUContext;
