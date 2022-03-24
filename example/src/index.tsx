import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { rmu, RMUOutlet, RMUProvider } from '../../dist';

import { TEST_MODAL_ID } from './constants';
import TestModal from './test-modal';
import TestComponent from './test-component';
import TestProvider from './test-provider';
import TestComponentInProvider from './test-component-in-provider';

rmu.connect(TEST_MODAL_ID, TestModal);

const App = () => {
  return (
    <RMUProvider>
      <button
        onClick={() =>
          rmu.open(TEST_MODAL_ID, {
            children: 'Connected modal',
            onClose: () => {
              alert('Connected modal closed');
            },
          })
        }
      >
        Open connected modal
      </button>
      <button
        onClick={() =>
          rmu.open(TestModal, {
            children: 'Not connected modal',
            test: 123,
            onClose: () => {
              alert('Not connected modal closed');
            },
          })
        }
      >
        Open not connected modal
      </button>
      <TestComponent />
      <TestProvider>
        <TestComponentInProvider />
        <RMUOutlet id="TEST_OUTLET" />
      </TestProvider>
      <RMUOutlet />
    </RMUProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
