export type EventHandler<T = unknown> = (payload: T) => void;

type EventListenersMap = Record<string, Set<EventHandler<unknown>>>;

const listenersByType: EventListenersMap = {};

export const emitter = {
  subscribe<T>(type: string, handler: EventHandler<T>) {
    if (!listenersByType[type]) {
      listenersByType[type] = new Set<EventHandler<unknown>>();
    }
    listenersByType[type].add(handler as EventHandler<unknown>);
  },

  unsubscribe<T>(type: string, handler: EventHandler<T>) {
    const listeners = listenersByType[type];
    if (listeners) {
      listeners.delete(handler as EventHandler<unknown>);
      if (listeners.size === 0) {
        delete listenersByType[type];
      }
    }
  },

  emit<T>(type: string, payload: T) {
    const listeners = listenersByType[type];
    if (listeners) {
      // Clone to avoid issues if handlers mutate subscription during emit
      [...listeners].forEach((handler) => {
        try {
          handler(payload);
        } catch {
          // Swallow to ensure one handler error does not break others
        }
      });
    }
  },

  // For testing purposes only
  _clear() {
    Object.keys(listenersByType).forEach((key) => {
      delete listenersByType[key];
    });
  },
};
