import {
  CollectionReference,
  DocumentData,
  Query,
  QueryDocumentSnapshot,
  doc,
  getDocFromCache,
  getDocFromServer,
  getDocsFromCache,
  getDocsFromServer,
} from 'firebase/firestore';
import { FromFire } from '../../models/firestoreTypesTools';

export class DocNotExistError extends Error {
  constructor(collection: CollectionReference, id: string) {
    super(`Document ${id} does not exist in ${collection.path}`);
  }
}

export const defaultFromFire: FromFire<any> = <T>(
  snapshot: QueryDocumentSnapshot<DocumentData>
) => snapshot.data() as T;

export async function docCacheFirst<T>(
  collection: CollectionReference,
  id: string,
  fromFire: FromFire<T> = defaultFromFire
): Promise<T> {
  const docRef = doc(collection, id);
  try {
    const fromCache = await getDocFromCache(docRef);
    if (fromCache.exists()) return fromFire(fromCache);
  } catch (e) {}
  const fromServer = await getDocFromServer(docRef);
  if (fromServer.exists()) return fromFire(fromServer);
  throw new Error(`Document ${id} does not exist in ${collection.path}`);
}
export async function docsCacheFirst<T>(
  query: Query,
  fromFire: FromFire<T> = defaultFromFire
): Promise<T[]> {
  const fromCache = await getDocsFromCache(query);
  if (!fromCache.empty) return fromCache.docs.map((doc) => fromFire(doc));
  const fromServer = await getDocsFromServer(query);
  if (!fromServer.empty) return fromServer.docs.map((doc) => fromFire(doc));
  return [];
}
