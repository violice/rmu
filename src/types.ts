import React from 'react';

export type RMUModalProps = {
  rmu: {
    modalId: string;
    close: () => void;
  };
};

export type RMUModal = React.FC<RMUModalProps>;

export type UnknownProps = Record<string, unknown>;
