import { DocumentData, FirestoreDataConverter } from 'firebase/firestore';
import { KeysMatching } from '../utils/types';

type StrKeysMatching<TObj extends Object, TType> = KeysMatching<
  TObj,
  TType | undefined
> &
  string;

// Note: Consider using zod for validation instead of this class
export class FireCheck<TObj extends Object> {
  constructor(protected data: DocumentData) {}
  static obj<TObj extends Object>(
    data: DocumentData,
    check: (check: FireCheck<TObj>) => TObj,
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

  str(key: StrKeysMatching<TObj, string>): string {
    if (typeof this.data[key] !== 'string')
      throw new Error(`Invalid string at key ${key}`);
    return this.data[key];
  }
  num(key: StrKeysMatching<TObj, number>): number {
    if (typeof this.data[key] !== 'number')
      throw new Error(`Invalid number at key ${key}`);
    return this.data[key];
  }
  bool(key: StrKeysMatching<TObj, boolean>): boolean {
    if (typeof this.data[key] !== 'boolean')
      throw new Error(`Invalid boolean at key ${key}`);
    return this.data[key];
  }
  enum<TEnum>(
    key: StrKeysMatching<TObj, TEnum>,
    enumArr: readonly TEnum[],
  ): TEnum {
    if (!enumArr.includes(this.data[key] as TEnum))
      throw new Error(`Invalid enum at key ${key}`);
    return this.data[key] as TEnum;
  }
  obj<TObjC extends Object>(
    key: StrKeysMatching<TObj, Object>,
    check: (check: FireCheck<TObjC>) => void,
  ): TObjC {
    if (typeof this.data[key] !== 'object')
      throw new Error(`Invalid object at key ${key}`);
    try {
      check(new FireCheck(this.data[key]));
    } catch (e) {
      console.error(`Error checking object:`, this.data[key], e);
      throw e;
    }
    return this.data[key];
  }

  strArr(key: StrKeysMatching<TObj, string[]>): string[] {
    if (
      !Array.isArray(this.data[key]) ||
      !(this.data[key] as Array<any>).every((el) => typeof el === 'string')
    )
      throw new Error(`Invalid string array at key ${key}`);
    return this.data[key];
  }
  numArr(key: StrKeysMatching<TObj, number[]>): number[] {
    if (
      !Array.isArray(this.data[key]) ||
      !(this.data[key] as Array<any>).every((el) => typeof el === 'number')
    )
      throw new Error(`Invalid number array at key ${key}`);
    return this.data[key];
  }
  boolArr(key: StrKeysMatching<TObj, boolean[]>): boolean[] {
    if (
      !Array.isArray(this.data[key]) ||
      !(this.data[key] as Array<any>).every((el) => typeof el === 'boolean')
    )
      throw new Error(`Invalid boolean array at key ${key}`);
    return this.data[key];
  }
  objArr<TObjC extends Object>(
    key: StrKeysMatching<TObj, TObjC[]>,
    check: (check: FireCheck<TObjC>) => void,
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
