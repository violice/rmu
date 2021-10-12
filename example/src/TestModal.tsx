import * as React from 'react';
import { ModalComponentProps } from '../../dist';
import { TEST_MODAL_ID } from './constants';

type Props = {
  onClose?: () => void;
};

const TestModal: React.FC<Props & ModalComponentProps> = ({
  rmu: { modalId, close },
  children = 'TextModal',
  onClose,
}) => {
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
