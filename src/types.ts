import React from 'react';

export type ModalComponentProps = {
  rmu: {
    modalId: string;
    close: () => void;
  };
};

export type ModalComponent = React.FC<ModalComponentProps>;

export type ModalUnknownProps = Record<string, unknown>;
