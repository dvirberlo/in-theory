import { User } from 'firebase/auth';
import { createSignal } from 'solid-js';

// this signal is set and updated by auth.config.ts
const [userAccessor, setUser] = createSignal<User | null | undefined>(
  undefined,
);
export { userAccessor, setUser };
