import React, { useState } from 'react';
import { init, connect, getConnectedModal, generateModalId } from './rmu';
import { RMUModal, UnknownProps } from './types';
import RMUContext from './RMUContext';
import RMUPlaceholder from './RMUPlaceholder';

type RMUProviderState = Record<
  string,
  {
    ModalComponent: RMUModal;
    modalProps: UnknownProps;
  }
>;

const RMUProvider = ({ children }: { children: React.ReactNode }) => {
  const [modals, setModals] = useState<RMUProviderState>({});

  const open = (
    modal: string | RMUModal,
    modalProps: UnknownProps = {}
  ) => {
    let modalId: string;

    if (typeof modal === 'string') {
      modalId = modal;
    } else {
      modalId = generateModalId();
      connect(modalId, modal);
    }

    const { ModalComponent } = getConnectedModal(modalId);

    setModals(modals => ({
      ...modals,
      [modalId]: {
        ModalComponent,
        modalProps,
      },
    }));
  };

  const close = (modalId: string) =>
    setModals(modals => {
      const changedModals = { ...modals };
      delete changedModals[modalId];
      return changedModals;
    });

  init(open, close);

  return (
    <RMUContext.Provider value={{ modals, open, close }}>
      {children}
      <RMUPlaceholder />
    </RMUContext.Provider>
  );
};

export default RMUProvider;
