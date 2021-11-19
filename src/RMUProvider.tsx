import React, { useReducer } from 'react';
import { init, connect, getConnectedModal, generateModalId } from './rmu';
import { RMUContextState, RMUModal, UnknownProps } from './types';
import RMUContext from './RMUContext';

const reducer = (
  state: {
    modals: RMUContextState['modals'];
    outlets: RMUContextState['outlets'];
  },
  action: {
    type: string;
    payload: Record<string, any>;
  }
) => {
  switch (action.type) {
    case 'RMU/ADD_MODAL': {
      const { modalId, ModalComponent, modalProps, outletId } = action.payload;
      const outletNotFound = state.outlets.every(outlet => outlet !== outletId);
      if (outletNotFound) {
        throw new Error(`Outlet with id ${outletId} not found`);
      }
      return {
        ...state,
        modals: {
          ...state.modals,
          [modalId]: {
            ModalComponent,
            modalProps,
            outletId,
          },
        },
      };
    }
    case 'RMU/REMOVE_MODAL': {
      const { modalId } = action.payload;
      const changedModals = { ...state.modals };
      delete changedModals[modalId];
      return { ...state, modals: changedModals };
    }
    case 'RMU/ADD_OUTLET': {
      const { outletId } = action.payload;
      const alreadyExists = state.outlets.some(outlet => outlet === outletId);
      if (alreadyExists) {
        throw new Error(`Outlet with id ${outletId} already exists`);
      }
      return { ...state, outlets: [...state.outlets, outletId] };
    }
    case 'RMU/REMOVE_OUTLET': {
      const { outletId } = action.payload;
      return {
        ...state,
        outlets: state.outlets.filter(outlet => outlet !== outletId),
      };
    }
    default:
      return state;
  }
};

const RMUProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { modals: {}, outlets: [] });

  const addModal = (
    modal: string | RMUModal,
    modalProps: UnknownProps = {},
    outletId: string = 'RMU_DEFAULT_OUTLET'
  ) => {
    let modalId: string;

    if (typeof modal === 'string') {
      modalId = modal;
    } else {
      modalId = generateModalId();
      connect(modalId, modal);
    }

    const { ModalComponent } = getConnectedModal(modalId);

    if (!ModalComponent) {
      throw new Error(`Modal with id ${modalId} not found`);
    }

    dispatch({
      type: 'RMU/ADD_MODAL',
      payload: {
        modalId,
        ModalComponent,
        modalProps,
        outletId,
      },
    });
  };

  const removeModal = (modalId: string) => {
    dispatch({ type: 'RMU/REMOVE_MODAL', payload: { modalId } });
  };
  const addOutlet = (outletId: string) => {
    dispatch({ type: 'RMU/ADD_OUTLET', payload: { outletId } });
  };

  const removeOutlet = (outletId: string) => {
    dispatch({ type: 'RMU/REMOVE_OUTLET', payload: { outletId } });
  };

  init(addModal, removeModal);

  return (
    <RMUContext.Provider
      value={{
        ...state,
        addModal,
        removeModal,
        addOutlet,
        removeOutlet,
      }}
    >
      {children}
    </RMUContext.Provider>
  );
};

export default RMUProvider;
