import * as React from 'react';

import RMU from '../../dist';
import TestModalInProvider from './TestModalInProvider';

const TestComponentInProvider = () => {
  return (
    <div>
      <button
        onClick={() => {
          RMU.open(
            TestModalInProvider,
            {
              children: 'Context modal',
              onClose: () => alert('Context modal closed'),
            },
            'TEST_OUTLET'
          );
        }}
      >
        TestComponentInProvider - open modal
      </button>
    </div>
  );
};

export default TestComponentInProvider;
