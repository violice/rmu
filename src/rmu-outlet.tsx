import React, { Fragment, useContext, useEffect } from 'react';
import { RMUContext } from './rmu-context';

export const RMUOutlet = ({ outletId = 'rmu-default-outlet' }) => {
  const ctx = useContext(RMUContext);

  if (!ctx) {
    throw new Error('RMUProvider not found in component tree');
  }

  const { outlets, addOutlet, removeOutlet } = ctx;

  // eslint-disable react-hooks/exhaustive-deps
  useEffect(() => {
    addOutlet(outletId);
    return () => {
      removeOutlet(outletId);
    };
  }, []);
  // eslint-enable react-hooks/exhaustive-deps

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
