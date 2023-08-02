import { DocumentData, FirestoreDataConverter } from 'firebase/firestore';

// Note: Consider using zod for validation instead of this class
export class FireCheck<TObj = any> {
  constructor(protected data: DocumentData) {}
  static obj<TObj = any>(
    data: DocumentData,
    check: (check: FireCheck<TObj>) => TObj
  ) {
    if (typeof data !== 'object') throw new Error(`Invalid object data`);
    try {
      check(new FireCheck(data));
    } catch (e) {
      console.error(`Error checking object:`, data, e);
      throw e;
    }
    return data as TObj;
  }

  str(key: keyof TObj): string {
    const _key = key as string;
    if (typeof this.data[_key] !== 'string')
      throw new Error(`Invalid string at key ${_key}`);
    return this.data[_key];
  }
  num(key: keyof TObj): number {
    const _key = key as string;
    if (typeof this.data[_key] !== 'number')
      throw new Error(`Invalid number at key ${_key}`);
    return this.data[_key];
  }
  // arr(key: keyof TObj): any[] {
  //   const _key = key as string;
  //   if (!Array.isArray(this.data[_key]))
  //     throw new Error(`Invalid array at key ${_key}`);
  //   return this.data[_key];
  // }
  bool(key: keyof TObj): boolean {
    const _key = key as string;
    if (typeof this.data[_key] !== 'boolean')
      throw new Error(`Invalid boolean at key ${_key}`);
    return this.data[_key];
  }
  obj<TObjC = any>(
    key: keyof TObj,
    check: (check: FireCheck<TObjC>) => void
  ): TObjC {
    const _key = key as string;
    if (typeof this.data[_key] !== 'object')
      throw new Error(`Invalid object at key ${_key}`);
    try {
      check(new FireCheck(this.data[_key]));
    } catch (e) {
      console.error(`Error checking object:`, this.data[_key], e);
      throw e;
    }
    return this.data[_key];
  }

  strArr(key: keyof TObj): string[] {
    const _key = key as string;
    if (
      !Array.isArray(this.data[_key]) ||
      !(this.data[_key] as Array<any>).every((el) => typeof el === 'string')
    )
      throw new Error(`Invalid string array at key ${_key}`);
    return this.data[_key];
  }
  numArr(key: keyof TObj): number[] {
    const _key = key as string;
    if (
      !Array.isArray(this.data[_key]) ||
      !(this.data[_key] as Array<any>).every((el) => typeof el === 'number')
    )
      throw new Error(`Invalid number array at key ${_key}`);
    return this.data[_key];
  }
  boolArr(key: keyof TObj): boolean[] {
    const _key = key as string;
    if (
      !Array.isArray(this.data[_key]) ||
      !(this.data[_key] as Array<any>).every((el) => typeof el === 'boolean')
    )
      throw new Error(`Invalid boolean array at key ${_key}`);
    return this.data[_key];
  }
  objArr<TObjC = any>(
    key: keyof TObj,
    check: (check: FireCheck<TObjC>) => void
  ): TObjC[] {
    const _key = key as string;
    if (
      !Array.isArray(this.data[_key]) ||
      !(this.data[_key] as Array<any>).every((el) => typeof el === 'object')
    )
      throw new Error(`Invalid object array at key ${_key}`);
    (this.data[_key] as Array<any>).forEach((el) => {
      try {
        check(new FireCheck(el));
      } catch (e) {
        console.error(`Error checking object:`, el, e);
        throw e;
      }
    });
    return this.data[_key];
  }
}

export type FromFire<T> = FirestoreDataConverter<T>['fromFirestore'];
export type ToFire<T> = FirestoreDataConverter<T>['toFirestore'];
