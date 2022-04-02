import * as React from 'react';
import { TestContext } from './test-context';

const TestModalInProvider = ({ onClose }: { onClose: () => void }) => {
  const context = React.useContext(TestContext);

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        position: 'absolute',
        top: '0px',
        left: '0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.1)',
      }}
      onClick={onClose}
    >
      {JSON.stringify(context)}
      TestModalInProvider
    </div>
  );
};

export default TestModalInProvider;
