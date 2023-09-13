export class Persistent<T> {
  protected fromStorage(str: string): T {
    return JSON.parse(str) as T;
  }
  protected toStorage(value: T): string {
    return JSON.stringify(value);
  }

  value: T;
  constructor(
    public key: string,
    defaultValue: T,
    public storage: Storage = localStorage,
  ) {
    const str = storage.getItem(key);
    if (!str) this.value = defaultValue;
    else this.value = this.fromStorage(str);
  }

  set(val: T | ((prev: T) => T)): void {
    this.value =
      typeof val === 'function' ? (val as (prev: T) => T)(this.value) : val;
    (async () => {
      this.storage.setItem(this.key, this.toStorage(this.value));
    })();
  }
}

export class PersistentSet<T> extends Persistent<Set<T>> {
  protected fromStorage(str: string): Set<T> {
    const arr = JSON.parse(str);
    if (Array.isArray(arr)) return new Set(arr as T[]);
    else return new Set();
  }
  protected toStorage(value: Set<T>): string {
    return JSON.stringify([...value]);
  }
}
