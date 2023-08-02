export type KeysWithArrayValues<TObj, TArr = any> = {
  [K in keyof TObj]: TObj[K] extends TArr[] ? K : never;
}[keyof TObj];
