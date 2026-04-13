import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRMUState } from './use-rmu-state';

describe('useRMUState', () => {
  it('should initialize with empty outlets', () => {
    const { result } = renderHook(() => useRMUState());
    expect(result.current.outlets).toEqual({});
  });

  it('should add outlet', () => {
    const { result } = renderHook(() => useRMUState());

    act(() => {
      result.current.addOutlet('test-outlet');
    });

    expect(result.current.outlets).toHaveProperty('test-outlet');
    expect(result.current.outlets['test-outlet']).toEqual({});
  });

  it('should throw when adding duplicate outlet', () => {
    const { result } = renderHook(() => useRMUState());

    act(() => {
      result.current.addOutlet('test-outlet');
    });

    expect(() => {
      act(() => {
        result.current.addOutlet('test-outlet');
      });
    }).toThrow('Outlet with id test-outlet already exists');
  });

  it('should remove outlet', () => {
    const { result } = renderHook(() => useRMUState());

    act(() => {
      result.current.addOutlet('test-outlet');
      result.current.removeOutlet('test-outlet');
    });

    expect(result.current.outlets).not.toHaveProperty('test-outlet');
  });

  it('should open modal in outlet', () => {
    const { result } = renderHook(() => useRMUState());
    const mockComponent = React.createElement('div', null, 'Test');

    act(() => {
      result.current.addOutlet('test-outlet');
      result.current.openModal({
        modalId: 'modal-1',
        modalComponent: mockComponent,
        outletId: 'test-outlet',
      });
    });

    expect(result.current.outlets['test-outlet']).toHaveProperty('modal-1');
    expect(result.current.outlets['test-outlet']['modal-1']).toBe(mockComponent);
  });

  it('should throw when opening modal in non-existent outlet', () => {
    const { result } = renderHook(() => useRMUState());

    expect(() => {
      act(() => {
        result.current.openModal({
          modalId: 'modal-1',
          modalComponent: React.createElement('div', null, 'Test'),
          outletId: 'non-existent',
        });
      });
    }).toThrow('Outlet with id non-existent not found');
  });

  it('should close modal', () => {
    const { result } = renderHook(() => useRMUState());

    act(() => {
      result.current.addOutlet('test-outlet');
      result.current.openModal({
        modalId: 'modal-1',
        modalComponent: React.createElement('div', null, 'Test'),
        outletId: 'test-outlet',
      });
      result.current.closeModal({ modalId: 'modal-1', outletId: 'test-outlet' });
    });

    expect(result.current.outlets['test-outlet']).not.toHaveProperty('modal-1');
  });

  it('should throw when closing modal in non-existent outlet', () => {
    const { result } = renderHook(() => useRMUState());

    expect(() => {
      act(() => {
        result.current.closeModal({
          modalId: 'modal-1',
          outletId: 'non-existent',
        });
      });
    }).toThrow('Outlet with id non-existent not found');
  });

  it('should handle multiple modals in same outlet', () => {
    const { result } = renderHook(() => useRMUState());

    act(() => {
      result.current.addOutlet('test-outlet');
      result.current.openModal({
        modalId: 'modal-1',
        modalComponent: React.createElement('div', null, 'Modal 1'),
        outletId: 'test-outlet',
      });
      result.current.openModal({
        modalId: 'modal-2',
        modalComponent: React.createElement('div', null, 'Modal 2'),
        outletId: 'test-outlet',
      });
    });

    expect(Object.keys(result.current.outlets['test-outlet'])).toHaveLength(2);
    expect(result.current.outlets['test-outlet']).toHaveProperty('modal-1');
    expect(result.current.outlets['test-outlet']).toHaveProperty('modal-2');
  });
});
