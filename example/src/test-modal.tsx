import * as React from 'react';

const TestModal = ({
  children,
  onClose,
}: {
  children?: string;
  onClose: () => void;
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
      onClick={onClose}
    >
      {children}
    </div>
  );
};

export default TestModal;
