import { useNavigate } from '@solidjs/router';
import { Component, Show, createSignal } from 'solid-js';
import { routesPath } from '../../app.routes';
import { PrimaryButton, SecondaryButton } from './Button';
import { AwesomeIcon } from '../icons/AwesomeIcon';

export const CenteredError: Component<{
  message?: string;
  error?: any;
  reset?: () => void;
  resetLabel?: string;
  hideReload?: boolean;
  hideHome?: boolean;
}> = (props) => {
  console.error(props.error);
  const navigate = useNavigate();
  const showDev = import.meta.env.DEV ? createSignal(true) : undefined;
  return (
    <div class="flex flex-col items-center justify-center h-full gap-y-3">
      <span
        class="animate-bounce text-8xl text-red-500"
        role="img"
        aria-label="skull"
      >
        <AwesomeIcon icon="fas fa-skull-crossbones" />
      </span>
      <div class="text-2xl">{props.message ?? 'אירעה שגיאה'}</div>
      <div class="flex flex-row gap-x-4">
        <Show when={props.reset}>
          <PrimaryButton onClick={props.reset}>
            {props.resetLabel ?? 'אתחל'}
          </PrimaryButton>
        </Show>
        <Show when={!props.hideReload}>
          <PrimaryButton onClick={() => window.location.reload()}>
            רענן
          </PrimaryButton>
        </Show>
        <Show when={!props.hideHome}>
          <SecondaryButton onClick={() => navigate(routesPath.home)}>
            דף הבית
          </SecondaryButton>
        </Show>
      </div>
      <Show when={showDev?.[0]() === true && props.error !== undefined}>
        <div dir="ltr" class="text-xl my-6">
          <div>Debug info: (dev only)</div>
          <p>{props.error?.toString()}</p>
          <PrimaryButton onClick={() => showDev?.[1](false)} class="mx-auto">
            Hide
          </PrimaryButton>
        </div>
      </Show>
    </div>
  );
};
