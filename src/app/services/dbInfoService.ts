import { collection } from 'firebase/firestore';
import { db } from '../config/firestore.config';
import { DBInfo, DBInfoModel } from '../models/DBInfoModel';
import { docCacheFirst } from './tools/firestoreTools';

class DBInfoService {
  protected readonly infoCollection = collection(db, 'info');
  protected readonly infoId = '0';

  dbInfo: DBInfo | undefined;

  getDBInfo(): Promise<DBInfo> | DBInfo {
    if (this.dbInfo) return this.dbInfo;
    return docCacheFirst(
      this.infoCollection,
      this.infoId,
      DBInfoModel.fromFire
    ).then((info) => {
      this.dbInfo = info;
      return info;
    });
  }
}

export const dbInfoService = new DBInfoService();
