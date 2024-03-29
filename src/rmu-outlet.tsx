import React, { Fragment, useContext, useEffect } from 'react';
import { RMUContext } from './rmu-context';

export const RMUOutlet = ({ outletId = 'rmu-default-outlet' }) => {
  const ctx = useContext(RMUContext);

  if (!ctx) {
    throw new Error('RMUProvider not found in components three');
  }

  const { outlets, addOutlet, removeOutlet } = ctx;

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
