import React, { useState } from 'react';
import { getConnectedModal, init } from './rmu';
import RMUContext from './RMUContext';

const RMUProvider: React.FC = ({ children }) => {
  const [modals, setModals] = useState<any>({});

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
      {Object.entries(modals).map(
        ([id, { ModalComponent, props }]: [string, any]) => (
          <ModalComponent key={id} {...props} />
        )
      )}
    </RMUContext.Provider>
  );
};

export default RMUProvider;
