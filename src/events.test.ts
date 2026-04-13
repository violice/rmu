import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { openModal, closeModal } from './events';
import { RMU_EVENTS, RMU_DEFAULT_OUTLET_ID } from './constants';
import { emitter } from './emitter';

describe('events', () => {
  const mockComponent = React.createElement('div', null, 'Test Modal');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('openModal', () => {
    it('should emit open event with default outlet', () => {
      const emitSpy = vi.spyOn(emitter, 'emit');
      const result = openModal(mockComponent);

      expect(emitSpy).toHaveBeenCalledWith(RMU_EVENTS.open, {
        modalId: expect.stringMatching(/^rmu-modal-\d+$/),
        modalComponent: mockComponent,
        outletId: RMU_DEFAULT_OUTLET_ID,
      });
      expect(result).toHaveProperty('modalId');
      expect(result).toHaveProperty('outletId', RMU_DEFAULT_OUTLET_ID);
    });

    it('should emit open event with custom outlet', () => {
      const emitSpy = vi.spyOn(emitter, 'emit');
      const result = openModal(mockComponent, { outletId: 'custom-outlet' });

      expect(emitSpy).toHaveBeenCalledWith(RMU_EVENTS.open, {
        modalId: expect.stringMatching(/^rmu-modal-\d+$/),
        modalComponent: mockComponent,
        outletId: 'custom-outlet',
      });
      expect(result.outletId).toBe('custom-outlet');
    });

    it('should generate unique modal IDs', async () => {
      const result1 = openModal(mockComponent);
      await new Promise(resolve => setTimeout(resolve, 10));
      const result2 = openModal(mockComponent);
      expect(result1.modalId).not.toBe(result2.modalId);
    });
  });

  describe('closeModal', () => {
    it('should emit close event', () => {
      const emitSpy = vi.spyOn(emitter, 'emit');
      closeModal({ modalId: 'test-modal', outletId: 'test-outlet' });

      expect(emitSpy).toHaveBeenCalledWith(RMU_EVENTS.close, {
        modalId: 'test-modal',
        outletId: 'test-outlet',
      });
    });
  });
});
