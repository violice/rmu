import { useReducer } from 'react';
import { RMUContextState } from './types';

const ACTIONS = {
  openModal: 'rmu:open-modal',
  closeModal: 'rmu:close-modal',
  addOutlet: 'rmu:add-modal',
  removeOutlet: 'rmu:remove-outlet',
} as const;

const reducer = (
  state: {
    outlets: RMUContextState['outlets'];
  },
  action: {
    type: string;
    payload: Record<string, any>;
  }
) => {
  switch (action.type) {
    case ACTIONS.openModal: {
      const { modalId, modalComponent, outletId } = action.payload;

      const outletNotFound = !state.outlets[outletId];

      if (outletNotFound) {
        throw new Error(`Outlet with id ${outletId} not found`);
      }

      return {
        ...state,
        outlets: {
          ...state.outlets,
          [outletId]: {
            ...state.outlets[outletId],
            [modalId]: modalComponent,
          },
        },
      };
    }
    case ACTIONS.closeModal: {
      const { modalId, outletId } = action.payload;

      const modalOutlet = state.outlets[outletId];
      delete modalOutlet[modalId];

      return {
        ...state,
        outlets: {
          ...state.outlets,
          outlet: modalOutlet,
        },
      };
    }
    case ACTIONS.addOutlet: {
      const { outletId } = action.payload;

      const alreadyExists = !!state.outlets[outletId];

      if (alreadyExists) {
        throw new Error(`Outlet with id ${outletId} already exists`);
      }

      return {
        ...state,
        outlets: {
          ...state.outlets,
          [outletId]: {},
        },
      };
    }
    case ACTIONS.removeOutlet: {
      const { outletId } = action.payload;

      return {
        ...state,
        outlets: {
          ...state.outlets,
          [outletId]: undefined,
        },
      };
    }
    default:
      return state;
  }
};

export const useRMUState = () => {
  const [state, dispatch] = useReducer(reducer, {
    outlets: {},
  });

  const openModal: RMUContextState['openModal'] = ({
    modalId,
    modalComponent,
    outletId,
  }) => {
    dispatch({
      type: ACTIONS.openModal,
      payload: { modalId, modalComponent, outletId },
    });
  };

  const closeModal: RMUContextState['closeModal'] = ({ modalId, outletId }) => {
    dispatch({ type: ACTIONS.closeModal, payload: { modalId, outletId } });
  };

  const addOutlet: RMUContextState['addOutlet'] = outletId => {
    dispatch({ type: ACTIONS.addOutlet, payload: { outletId } });
  };

  const removeOutlet: RMUContextState['removeOutlet'] = outletId => {
    dispatch({ type: ACTIONS.removeOutlet, payload: { outletId } });
  };

  return {
    ...state,
    openModal,
    closeModal,
    addOutlet,
    removeOutlet,
  };
};
