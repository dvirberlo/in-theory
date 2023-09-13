import { useNavigate } from '@solidjs/router';
import { Component, Match, Signal, Switch, createEffect } from 'solid-js';
import { routesPath } from '../../app.routes';
import { userAccessor } from '../../services/authService';
import { AwesomeIcon } from '../icons/AwesomeIcon';
import type { AwesomeIconType } from '../icons/awesomeIconType';
import {
  IconSquare,
  MenuButton,
  PrimaryMenuButton,
  RedMenuButton,
} from './Button';

export const OverlaySideNav: Component<{
  readonly openSignal: Signal<boolean>;
}> = (props) => {
  let dialog: HTMLDialogElement | undefined;

  const [navOpen, setNavOpen] = props.openSignal;

  createEffect(() => {
    if (!dialog) return;
    if (navOpen()) dialog.showModal();
    else dialog?.close();
  });

  const clickOutside = (e: MouseEvent) => {
    if (e.target !== dialog) return;
    dismiss();
  };
  const dismiss = () => {
    setNavOpen(false);
  };

  return (
    <dialog
      class="
        -z-50 my-2
        ms-2 hidden
        h-[calc(100dvh-1rem)] max-h-[calc(100dvh-1rem)]
        max-w-full flex-col
        rounded-2xl
        p-0
        backdrop:bg-transparent
        open:fixed

        open:inset-0
        open:z-50
        open:flex

        open:backdrop:animate-fade-in
        open:backdrop:backdrop-blur-xl

        ltr:open:animate-slide-in-right rtl:open:animate-slide-in-left
        "
      // unfortunately, the following animations could not work with display none when closed:
      // ltr:animate-slide-out-left rtl:animate-slide-out-right
      // opacity-0 open:opacity-100 transition-all duration-1000
      onClick={clickOutside}
      ref={dialog}
      aria-label="Side Navigation"
      role="dialog"
      aria-modal="true"
    >
      <SideNav dismiss={dismiss} />
    </dialog>
  );
};

export const SideNav: Component<{
  dismiss?: () => void;
  class?: string;
}> = (props) => {
  const _navigate = useNavigate();
  const navigate: typeof _navigate = (...args) => {
    props.dismiss?.();
    return _navigate(...(args as Parameters<typeof _navigate>));
  };

  return (
    <nav
      class={`
        relative flex
        h-full w-64 flex-col
        rounded-e-2xl rounded-s-2xl border-gray-300
        bg-gray-100 p-4
        text-gray-950 dark:border-gray-800
        dark:bg-gray-950
        dark:text-gray-50
        md:w-72
        md:rounded-s-none md:border-e-2
        ${props.class ?? ''}`}
    >
      <div
        class="
      mb-8 mt-4
      hidden flex-row
      justify-between md:flex
       "
      >
        <h1 class="text-2xl font-bold">בתיאוריה</h1>
      </div>
      <div
        class="
        flex flex-row
        justify-between md:hidden
         "
      >
        <h2 class="text-lg font-medium ">תפריט</h2>

        <IconSquare
          onClick={props.dismiss}
          class="text-2xl
          hover:animate-one-spin
          "
        >
          <AwesomeIcon icon="fas fa-times" />
        </IconSquare>
      </div>
      <div class="flex flex-grow flex-col gap-y-2 overflow-y-auto ">
        <MenuButton onClick={() => navigate(routesPath.home)}>
          <AwesomeIcon icon="fas fa-home" />
          <span>בית</span>
        </MenuButton>
        <MenuButton onClick={() => navigate(routesPath.learn)}>
          <AwesomeIcon icon="fas fa-brain" />
          <span>למידה</span>
        </MenuButton>
        <MenuButton onClick={() => navigate(routesPath.exam)}>
          <AwesomeIcon icon="fas fa-file-alt" />
          <span>מבחן</span>
        </MenuButton>
        <MenuButton onClick={() => navigate(routesPath.signs)}>
          <AwesomeIcon icon={'fas fa-signs-post' as AwesomeIconType} />
          <span>תמרורים</span>
        </MenuButton>
        <MenuButton onClick={() => navigate(routesPath.info)}>
          <AwesomeIcon icon="fas fa-book-open" />
          <span>מידע ללומד</span>
        </MenuButton>
        <div class="my-auto"></div>
        <MenuButton onClick={() => navigate(routesPath.settings)}>
          <AwesomeIcon icon="fas fa-cog" />
          <span>הגדרות</span>
        </MenuButton>
        <Switch>
          <Match when={userAccessor()}>
            <RedMenuButton
              onClick={async () => {
                const { getAuth } = await import('firebase/auth');
                await getAuth().signOut();
                navigate(routesPath.login);
              }}
            >
              <AwesomeIcon icon="fas fa-sign-out-alt" />
              <span>התנתק</span>
            </RedMenuButton>
          </Match>
          <Match when={!userAccessor()}>
            <PrimaryMenuButton onClick={() => navigate(routesPath.login)}>
              <AwesomeIcon icon="fas fa-sign-in-alt" rtl />
              <span>התחבר</span>
            </PrimaryMenuButton>
          </Match>
        </Switch>
      </div>
    </nav>
  );
};
