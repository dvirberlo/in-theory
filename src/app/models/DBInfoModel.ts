import { FromFire, FireCheck } from './firestoreTypesTools';

export type DBInfo = {
  totalQuestions: number;
  lastUpdate: number;
  maxExplanations: number;
};

export class DBInfoModel {
  static fromFire: FromFire<DBInfo> = function (snapshot, options): DBInfo {
    const data = snapshot.data(options);
    return FireCheck.obj<DBInfo>(data, (check) => ({
      totalQuestions: check.num('totalQuestions'),
      lastUpdate: check.num('lastUpdate'),
      maxExplanations: check.num('maxExplanations'),
    }));
  };
}
