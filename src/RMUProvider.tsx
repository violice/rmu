import React, { useState } from 'react';
import { getConnectedModal, init } from './rmu';
import RMUContext from './RMUContext';

type RMUProviderState = Record<string, {
  ModalComponent: React.FC;
  props: Record<string, unknown>;
}>;

const RMUProvider: React.FC = ({ children }) => {
  const [modals, setModals] = useState<RMUProviderState>({});

  const open = (id: string, props: Record<string, unknown> = {}) => {
    const { ModalComponent } = getConnectedModal(id);

    const changedModals = {
      ...modals,
      [id]: {
        ModalComponent,
        props,
      },
    };
    setModals(changedModals);
  };

  const close = (id: string) => {
    const changedModals = { ...modals };
    delete changedModals[id];
    setModals(changedModals);
  };

  init(open, close);

  return (
    <RMUContext.Provider value={{ modals, open, close }}>
      {children}
      {Object.entries(modals).map(([id, { ModalComponent, props }]) => {
        if (!ModalComponent) {
          return null;
        }
        return <ModalComponent key={id} {...props} />;
      })}
    </RMUContext.Provider>
  );
};

export default RMUProvider;
