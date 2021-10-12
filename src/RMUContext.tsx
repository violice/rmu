import { createContext } from 'react';
import { ModalComponent, ModalUnknownProps } from './types';

type RMUContextState = {
  modals: Record<
    string,
    {
      ModalComponent: ModalComponent;
      modalProps: ModalUnknownProps;
    }
  >;
  open: (modalId: string, modalProps: ModalUnknownProps) => void;
  close: (modalId: string) => void;
};

const RMUContext = createContext<RMUContextState>({
  modals: {},
  open: () => null,
  close: () => null,
});

export default RMUContext;
