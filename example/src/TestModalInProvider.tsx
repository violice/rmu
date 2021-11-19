import * as React from 'react';
import { RMUModalProps } from '../../dist';
import { TestContext } from './TestContext';

type Props = {
  onClose?: () => void;
};

const TestModalInProvider: React.FC<Props & RMUModalProps> = ({
  rmu: { modalId, close },
  onClose,
}) => {
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
      onClick={() => {
        close();
        onClose && onClose();
      }}
    >
      {modalId}
      {JSON.stringify(context)}
      TestModalInProvider
    </div>
  );
};

export default TestModalInProvider;
