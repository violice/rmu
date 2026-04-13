import React, { Fragment, useContext, useEffect } from 'react';
import { RMUContext } from './rmu-context';
import { RMU_DEFAULT_OUTLET_ID } from './constants';

export const RMUOutlet = ({ outletId = RMU_DEFAULT_OUTLET_ID }) => {
  const ctx = useContext(RMUContext);

  if (!ctx) {
    throw new Error('RMUProvider not found in component tree');
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
