import React, { useContext } from 'react';
import RMUContext from './RMUContext';

const RMUPlaceholder = () => {
  const { modals, close } = useContext(RMUContext);

  return (
    <>
      {Object.entries(modals)
        .filter(([_, { ModalComponent }]) => !!ModalComponent)
        .map(([id, { ModalComponent, modalProps }]) => {
          return (
            <ModalComponent
              key={id}
              {...modalProps}
              rmu={{ modalId: id, close: () => close(id) }}
            />
          );
        })}
    </>
  );
};

export default RMUPlaceholder;
