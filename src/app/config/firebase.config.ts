import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../environments/firebase.environment';

export const app = initializeApp(firebaseConfig);
