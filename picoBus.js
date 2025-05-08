export class PicoBus {
  constructor() {
    this.listeners = new Map();
    this.starListeners = new Set();
  }

  on(event, callback) {
    if (event === '*') {
      this.starListeners.add(callback);
    } else {
      if (!this.listeners.has(event)) {
        this.listeners.set(event, new Set());
      }
      this.listeners.get(event).add(callback);
    }
    return this;
  }

  off(event, callback) {
    if (event === '*') {
      this.starListeners.delete(callback);
    } else {
      const group = this.listeners.get(event);
      if (group) group.delete(callback);
    }
    return this;
  }

  once(event, callback) {
    const wrapped = (...args) => {
      this.off(event, wrapped);
      callback(...args);
    };
    this.on(event, wrapped);
    return this;
  }

  emit(event, ...args) {
    if (this.listeners.has(event)) {
      for (const cb of this.listeners.get(event)) {
        cb(...args);
      }
    }
    for (const cb of this.starListeners) {
      cb(event, ...args);
    }
    return this;
  }

  removeAll(event) {
    if (event === '*') {
      this.starListeners.clear();
    } else if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
      this.starListeners.clear();
    }
    return this;
  }

  listenerCount(event) {
    return event === '*'
      ? this.starListeners.size
      : (this.listeners.get(event)?.size || 0);
  }
}
