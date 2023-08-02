import { useNavigate } from '@solidjs/router';
import type { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';
import {
  Component,
  Match,
  Show,
  Switch,
  batch,
  createEffect,
  createSignal,
} from 'solid-js';
import { routesPath } from '../app.routes';
import { PrimaryButton } from '../components/lib/Button';
import { Input } from '../components/lib/Input';
import { AdaptiveLoading } from '../components/lib/Loading';
import { userAccessor } from '../services/authService';
import {
  fireAuthCodeLength,
  validatePhoneNumber as isValidPhone,
} from '../utils/formatters';

const LoginPage: Component = () => {
  let phoneInput: HTMLInputElement | undefined;
  let codeInput: HTMLInputElement | undefined;
  let appVerifier: RecaptchaVerifier | undefined;
  let confirmationResult: ConfirmationResult | undefined;

  const navigate = useNavigate();

  const [state, setState] = createSignal<'phone' | 'code'>('phone');
  const [error, setError] = createSignal<string | undefined>(undefined);
  const [loading, setLoading] = createSignal(false);

  createEffect(async () => {
    if (userAccessor()) navigate(routesPath.home);
  });

  const captchaId = 'recaptcha-container';
  async function phoneSignIn(phoneNumber: string) {
    const { getAuth, RecaptchaVerifier, signInWithPhoneNumber } = await import(
      'firebase/auth'
    );
    const auth = getAuth();
    appVerifier ??= new RecaptchaVerifier(auth, captchaId, {
      size: 'invisible',
    });

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((_confirmationResult) => {
        confirmationResult = _confirmationResult;
        batch(() => {
          setState('code');
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error('Error initiating sign-in:', error);
        batch(() => {
          setError('מספר טלפון שגוי');
          setLoading(false);
        });
      });
  }
  const submitPhone = () => {
    if (!phoneInput) return;
    setLoading(true);
    const phone = phoneInput.value.replaceAll(' ', '');
    if (!isValidPhone(phone))
      return batch(() => {
        setError('מספר טלפון שגוי');
        setLoading(false);
      });

    phoneSignIn(phone);
  };
  const submitCode = () => {
    if (!codeInput) return;
    setLoading(true);
    if (codeInput.value.length !== fireAuthCodeLength)
      return batch(() => {
        setError('מספר טלפון שגוי');
        setLoading(false);
      });

    confirmationResult
      ?.confirm(codeInput.value)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate(routesPath.home);
      })
      .catch((error) => {
        batch(() => {
          setError('מספר טלפון שגוי');
          setLoading(false);
        });
      });
  };
  return (
    <div>
      <h1 class="text-6xl font-thin mb-8 p-4">התחברות</h1>
      <div class="flex flex-col px-2 max-w-md mx-auto gap-2">
        <div class="flex flex-col">
          <Switch>
            <Match when={state() === 'phone'}>
              <Input
                dir="ltr"
                value={'+972 '}
                placeholder="+000 000000000"
                ref={phoneInput}
                type="tel"
                onInput={() => setError(undefined)}
                onEnter={submitPhone}
              />
            </Match>
            <Match when={state() === 'code'}>
              <Input
                maxLength={fireAuthCodeLength}
                type="number"
                dir="ltr"
                placeholder={'0'.repeat(fireAuthCodeLength)}
                ref={codeInput}
                onInput={(e) => {
                  setError(undefined);
                  if (e.currentTarget.value.length === fireAuthCodeLength)
                    submitCode();
                }}
                onEnter={submitCode}
              />
            </Match>
          </Switch>
          <Show when={error()}>
            <p
              class="
          dark:text-red-500 text-red-700
          animate-fade-in transition-opacity duration-200
          "
            >
              {error()}
            </p>
          </Show>
        </div>
        <PrimaryButton
          onClick={() => (state() === 'phone' ? submitPhone() : submitCode())}
          class="justify-center"
        >
          <span class="me-2">{state() === 'phone' ? 'המשך' : 'התחבר'}</span>
          <Show when={loading()}>
            <AdaptiveLoading />
          </Show>
        </PrimaryButton>
        <div id={captchaId} />
      </div>
    </div>
  );
};

export default LoginPage;
