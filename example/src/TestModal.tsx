import * as React from 'react';
import { RMUModalProps } from '../../dist';

type Props = {
  test: number;
  children: string;
  onClose?: () => void;
};

const TestModal = ({
  rmu: { modalId, close },
  children = 'TextModal',
  onClose,
}: Props & RMUModalProps) => {
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
      {children}
    </div>
  );
};

export default TestModal;
