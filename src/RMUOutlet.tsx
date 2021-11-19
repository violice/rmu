import React, { useContext, useEffect } from 'react';
import RMUContext from './RMUContext';

const RMUOutlet = ({ id = 'RMU_DEFAULT_OUTLET' }) => {
  const { modals, removeModal, addOutlet, removeOutlet } = useContext(
    RMUContext
  );

  useEffect(() => {
    addOutlet(id);
    return () => {
      removeOutlet(id);
    };
  }, []);

  return (
    <>
      {Object.entries(modals)
        .filter(
          ([_, { ModalComponent, outletId }]) =>
            !!ModalComponent && outletId === id
        )
        .map(([id, { ModalComponent, modalProps }]) => {
          return (
            <ModalComponent
              key={id}
              {...modalProps}
              rmu={{ modalId: id, close: () => removeModal(id) }}
            />
          );
        })}
    </>
  );
};

export default RMUOutlet;
