import { AppSettings, defaultAppSettings } from '../models/appSettingsModel';
import { Persistent } from './tools/persistance';

export class AppSettingsService {
  settings = new Persistent<AppSettings>('appSettings', defaultAppSettings);
}

export const appSettingsService = new AppSettingsService();
