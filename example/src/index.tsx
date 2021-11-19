import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import RMU, { RMUOutlet, RMUProvider } from '../../dist';

import { TEST_MODAL_ID } from './constants';
import TestModal from './TestModal';
import TestComponent from './TestComponent';
import TestProvider from './TestProvider';
import TestComponentInProvider from './TestComponentInProvider';

RMU.connect(TEST_MODAL_ID, TestModal);

const App = () => {
  return (
    <RMUProvider>
      <button
        onClick={() =>
          RMU.open(TEST_MODAL_ID, {
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
          RMU.open(TestModal, {
            children: 'Not connected modal',
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
