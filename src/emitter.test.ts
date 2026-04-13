import { describe, it, expect, vi } from 'vitest';
import { emitter } from './emitter';

describe('emitter', () => {
  it('should subscribe and emit events', () => {
    const handler = vi.fn();
    emitter.subscribe('test', handler);
    emitter.emit('test', 'payload');
    expect(handler).toHaveBeenCalledWith('payload');
  });

  it('should unsubscribe from events', () => {
    const handler = vi.fn();
    emitter.subscribe('test', handler);
    emitter.unsubscribe('test', handler);
    emitter.emit('test', 'payload');
    expect(handler).not.toHaveBeenCalled();
  });

  it('should handle multiple handlers', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();
    emitter.subscribe('test', handler1);
    emitter.subscribe('test', handler2);
    emitter.emit('test', 'data');
    expect(handler1).toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
  });

  it('should not break when emitting to non-existent event', () => {
    expect(() => emitter.emit('non-existent', 'data')).not.toThrow();
  });

  it('should pass payload to handlers', () => {
    const handler = vi.fn();
    const payload = { id: 1, name: 'test' };
    emitter.subscribe('test', handler);
    emitter.emit('test', payload);
    expect(handler).toHaveBeenCalledWith(payload);
  });

  it('should delete event type when all handlers are unsubscribed', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    // Subscribe multiple handlers
    emitter.subscribe('cleanup-test', handler1);
    emitter.subscribe('cleanup-test', handler2);

    // Emit should work
    emitter.emit('cleanup-test', 'data');
    expect(handler1).toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();

    // Unsubscribe first handler - event type should still exist
    emitter.unsubscribe('cleanup-test', handler1);
    emitter.emit('cleanup-test', 'data2');
    expect(handler2).toHaveBeenCalledTimes(2);

    // Unsubscribe second handler - event type should be deleted
    emitter.unsubscribe('cleanup-test', handler2);

    // Emit should not throw and handlers should not be called
    expect(() => emitter.emit('cleanup-test', 'data3')).not.toThrow();
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(2);
  });

  it('should handle errors in handlers without breaking other handlers', () => {
    const errorHandler = vi.fn(() => {
      throw new Error('Handler error');
    });
    const normalHandler = vi.fn();

    emitter.subscribe('error-test', errorHandler);
    emitter.subscribe('error-test', normalHandler);

    // Emit should not throw even if one handler throws
    expect(() => emitter.emit('error-test', 'data')).not.toThrow();

    // Both handlers should have been called
    expect(errorHandler).toHaveBeenCalled();
    expect(normalHandler).toHaveBeenCalled();
  });
});
