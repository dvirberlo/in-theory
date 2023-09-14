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

  set(val?: T | ((prev: T) => T)): void {
    if (val !== undefined) {
      this.value =
        typeof val === 'function' ? (val as (prev: T) => T)(this.value) : val;
    }

    setTimeout(() =>
      this.storage.setItem(this.key, this.toStorage(this.value)),
    );
  }

  mutate(func?: (self: T) => void): void {
    func?.(this.value);
    this.set();
  }
}

export class PersistentSet<T> extends Persistent<Set<T>> implements Set<T> {
  protected fromStorage(str: string): Set<T> {
    const arr = JSON.parse(str);
    if (Array.isArray(arr)) return new Set(arr as T[]);
    else return new Set();
  }
  protected toStorage(value: Set<T>): string {
    return JSON.stringify([...value]);
  }

  // Set methods:
  add(value: T): this {
    this.value.add(value);
    this.mutate();
    return this;
  }
  clear(): void {
    this.value.clear();
    this.mutate();
  }
  delete(value: T): boolean {
    const removed = this.value.delete(value);
    this.mutate();
    return removed;
  }
  forEach(
    callbackfn: (value: T, value2: T, set: Set<T>) => void,
    thisArg?: any,
  ): void {
    this.value.forEach(callbackfn, thisArg);
  }
  has(value: T): boolean;
  has(value: T | (TSReset.WidenLiteral<T> & {})): boolean;
  has(value: unknown): boolean {
    return this.value.has(value as T);
  }
  get size() {
    return this.value.size;
  }
  entries(): IterableIterator<[T, T]> {
    return this.value.entries();
  }
  keys(): IterableIterator<T> {
    return this.value.keys();
  }
  values(): IterableIterator<T> {
    return this.value.values();
  }
  [Symbol.iterator](): IterableIterator<T> {
    return this.value[Symbol.iterator]();
  }
  get [Symbol.toStringTag]() {
    return this.value[Symbol.toStringTag];
  }
}
