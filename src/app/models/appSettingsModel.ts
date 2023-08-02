import { FromFire, FireCheck } from './firestoreTypesTools';

export type AppSettings = {
  skipPastQuestions: boolean;
};

export const defaultAppSettings: AppSettings = {
  skipPastQuestions: true,
};

export class AppSettingsModel {
  static fromFire: FromFire<AppSettings> = (doc) => {
    const data = doc.data();
    return FireCheck.obj<AppSettings>(data, (check) => ({
      skipPastQuestions: check.bool('skipPastQuestions'),
    }));
  };
}
