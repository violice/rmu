import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as RMU from '../dist';
import TestModal from './TestModal';
import { TEST_MODAL_ID } from './constants';

const { RMUProvider } = RMU;

RMU.connect(TEST_MODAL_ID, TestModal);

const App = () => {
  return (
    <RMUProvider>
      <button
        onClick={() =>
          RMU.open(TEST_MODAL_ID, {
            children: 'Modal Children',
            onClose: () => {
              alert('closed');
            },
          })
        }
      >
        Open test modal
      </button>
    </RMUProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
