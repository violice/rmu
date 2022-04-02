import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { closeModal, openModal, RMUOutlet, RMUProvider } from '../../dist';

import TestModal from './test-modal';
import TestComponent from './test-component';
import TestProvider from './test-provider';
import TestComponentInProvider from './test-component-in-provider';

const App = () => {
  return (
    <RMUProvider>
      <button
        onClick={() => {
          const modal = openModal(
            <TestModal onClose={() => closeModal(modal)}>TestModal</TestModal>
          );
        }}
      >
        Open modal
      </button>
      <TestComponent />
      <TestProvider>
        <TestComponentInProvider />
        <RMUOutlet outletId="TEST_OUTLET" />
      </TestProvider>
      <RMUOutlet />
    </RMUProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
