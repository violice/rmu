import React, { Fragment, useContext, useEffect } from 'react';
import RMUContext from './rmu-context';

const RMUOutlet = ({ outletId = 'rmu-default-outlet' }) => {
  const { outlets, addOutlet, removeOutlet } = useContext(
    RMUContext
  );

  useEffect(() => {
    addOutlet(outletId);
    return () => {
      removeOutlet(outletId);
    };
  }, []);

  const modals = outlets[outletId] ?? {};

  return (
    <>
      {Object.entries(modals).map(([modalId, modalComponent]) => (
        <Fragment key={modalId}>{modalComponent}</Fragment>
      ))}
    </>
  );
};

export default RMUOutlet;
