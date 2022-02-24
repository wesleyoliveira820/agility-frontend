type Listener = () => void;

class LogoutEvent {
  private listeners: Listener[];

  constructor() {
    this.listeners = [];
  }

  public subscribe(fn: Listener) {
    this.listeners.push(fn);
  }

  public unsubscribe(fn: Listener) {
    this.listeners = this.listeners.filter((listener) => listener !== fn);
  }

  public notify() {
    this.listeners.forEach((fn) => fn());
  }
}

export default new LogoutEvent();
