import { getAnalytics } from 'firebase/analytics';
import { app } from './firebase.config';

export const analytics = getAnalytics(app);
