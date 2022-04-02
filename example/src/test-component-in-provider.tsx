import * as React from 'react';

import { closeModal, openModal } from '../../dist';

import TestModalInProvider from './test-modal-in-provider';

const TestComponentInProvider = () => {
  return (
    <div>
      <button
        onClick={() => {
          const modal = openModal(
            <TestModalInProvider onClose={() => closeModal(modal)} />,
            { outletId: 'TEST_OUTLET' }
          );
        }}
      >
        TestComponentInProvider - open modal
      </button>
    </div>
  );
};

export default TestComponentInProvider;
