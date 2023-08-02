import { setUser } from '../services/authService';
import { app } from './firebase.config';

export const authPromise = (async () => {
  const { browserLocalPersistence, initializeAuth } = await import(
    'firebase/auth'
  );
  const auth = initializeAuth(app, {
    persistence: browserLocalPersistence,
  });
  auth.onAuthStateChanged((user) => {
    setUser(user);
  });
  return auth;
})();
