import * as React from 'react';
import { useModal } from '../dist';
import { TEST_MODAL_ID } from './constants';

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
};

const TestModal: React.FC<Props> = ({ children = 'TextModal', onClose }) => {
  const { close } = useModal(TEST_MODAL_ID);

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
      {children}
    </div>
  );
};

export default TestModal;
