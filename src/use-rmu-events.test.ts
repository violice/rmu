import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRMUEvents } from './use-rmu-events';
import { emitter } from './emitter';
import { RMU_EVENTS } from './constants';
import { RMUContextState } from './types';
import React from 'react';

describe('useRMUEvents', () => {
  const mockOpenModal = vi.fn();
  const mockCloseModal = vi.fn();
  const mockAddOutlet = vi.fn();
  const mockRemoveOutlet = vi.fn();

  const mockCtx: RMUContextState = {
    outlets: {},
    openModal: mockOpenModal,
    closeModal: mockCloseModal,
    addOutlet: mockAddOutlet,
    removeOutlet: mockRemoveOutlet,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Clear all emitter subscriptions before each test
    emitter._clear();
  });

  it('should subscribe to open and close events on mount', () => {
    renderHook(() => useRMUEvents(mockCtx));

    // Emit open event and verify it calls openModal
    const mockComponent = React.createElement('div', null, 'Test');
    emitter.emit(RMU_EVENTS.open, {
      modalId: 'test-modal',
      modalComponent: mockComponent,
      outletId: 'test-outlet',
    });

    expect(mockOpenModal).toHaveBeenCalledWith({
      modalId: 'test-modal',
      modalComponent: mockComponent,
      outletId: 'test-outlet',
    });

    // Emit close event and verify it calls closeModal
    emitter.emit(RMU_EVENTS.close, {
      modalId: 'test-modal',
      outletId: 'test-outlet',
    });

    expect(mockCloseModal).toHaveBeenCalledWith({
      modalId: 'test-modal',
      outletId: 'test-outlet',
    });
  });

  it('should unsubscribe from events on unmount', () => {
    const { unmount } = renderHook(() => useRMUEvents(mockCtx));

    // Clear mocks after subscription
    vi.clearAllMocks();

    // Unmount the hook
    unmount();

    // Emit events after unmount - handlers should not be called
    const mockComponent = React.createElement('div', null, 'Test');
    emitter.emit(RMU_EVENTS.open, {
      modalId: 'test-modal',
      modalComponent: mockComponent,
      outletId: 'test-outlet',
    });

    emitter.emit(RMU_EVENTS.close, {
      modalId: 'test-modal',
      outletId: 'test-outlet',
    });

    expect(mockOpenModal).not.toHaveBeenCalled();
    expect(mockCloseModal).not.toHaveBeenCalled();
  });

  it('should handle multiple open and close events', () => {
    renderHook(() => useRMUEvents(mockCtx));

    const mockComponent = React.createElement('div', null, 'Test');

    // Emit multiple open events
    emitter.emit(RMU_EVENTS.open, {
      modalId: 'modal-1',
      modalComponent: mockComponent,
      outletId: 'outlet-1',
    });

    emitter.emit(RMU_EVENTS.open, {
      modalId: 'modal-2',
      modalComponent: mockComponent,
      outletId: 'outlet-1',
    });

    expect(mockOpenModal).toHaveBeenCalledTimes(2);

    // Emit multiple close events
    emitter.emit(RMU_EVENTS.close, {
      modalId: 'modal-1',
      outletId: 'outlet-1',
    });

    emitter.emit(RMU_EVENTS.close, {
      modalId: 'modal-2',
      outletId: 'outlet-1',
    });

    expect(mockCloseModal).toHaveBeenCalledTimes(2);
  });
});
