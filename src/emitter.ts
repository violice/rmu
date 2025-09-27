type EventHandler = (payload: any) => void;

type EventListenersMap = Record<string, Set<EventHandler>>;

const listenersByType: EventListenersMap = {};

export const emitter = {
  on(type: string, handler: EventHandler) {
    if (!listenersByType[type]) {
      listenersByType[type] = new Set<EventHandler>();
    }
    listenersByType[type].add(handler);
    return () => emitter.off(type, handler);
  },

  off(type: string, handler: EventHandler) {
    const listeners = listenersByType[type];
    if (listeners) {
      listeners.delete(handler);
      if (listeners.size === 0) {
        delete listenersByType[type];
      }
    }
  },

  emit(type: string, payload: any) {
    const listeners = listenersByType[type];
    if (!listeners) return;
    // Clone to avoid issues if handlers mutate subscription during emit
    [...listeners].forEach(handler => {
      try {
        handler(payload);
      } catch {
        // Swallow to ensure one handler error does not break others
      }
    });
  },
};

export default emitter;
