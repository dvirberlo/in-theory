import { initializeFirestore, persistentLocalCache } from 'firebase/firestore';
import { app } from './firebase.config';

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache(),
});
