import { createContext } from 'react';

type RMUContextState = {
  modals: Record<
    string,
    {
      ModalComponent: React.FC;
      props: Record<string, unknown>;
    }
  >;
  open: (id: string, props: Record<string, unknown>) => void;
  close: (id: string) => void;
};

const RMUContext = createContext<RMUContextState>({
  modals: {},
  open: () => null,
  close: () => null,
});

export default RMUContext;
