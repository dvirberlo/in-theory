import { Router, useIsRouting, useRoutes } from '@solidjs/router';
import {
  ErrorBoundary,
  Match,
  ParentComponent,
  Suspense,
  Switch,
  createSignal,
} from 'solid-js';
import { routes } from './app.routes';
import { AwesomeIcon } from './components/icons/AwesomeIcon';
import { IconSquare } from './components/lib/Button';
import { CenteredError } from './components/lib/Error';
import { CenteredLoading } from './components/lib/Loading';
import { OverlaySideNav, SideNav } from './components/lib/SideNav';
import { appConfig } from './config/app.config';

import '../index.css';
import('@fortawesome/fontawesome-free/css/fontawesome.min.css');
import('@fortawesome/fontawesome-free/css/solid.min.css');

const AppShell: ParentComponent = (props) => {
  appConfig();

  const isRouting = useIsRouting();

  const openSignal = createSignal<boolean>(false);
  const [navOpen, setNavOpen] = openSignal;

  return (
    <div
      dir="rtl"
      class="
      h-[100dvh] w-[100dvw]
      overflow-y-auto overflow-x-hidden
      bg-neutral-100 text-black
      dark:bg-neutral-900 dark:text-white
      "
    >
      <OverlaySideNav openSignal={openSignal} />
      <div
        class="
          sticky top-0 z-20
          flex
          h-12 w-full flex-row items-center justify-center rounded-b-2xl
          bg-gray-50 px-2
          text-neutral-900 shadow-lg
          shadow-neutral-400 dark:bg-gray-950 dark:text-neutral-100
          dark:shadow-neutral-800 md:hidden
          md:rounded-none"
      >
        <IconSquare
          class="
          absolute start-2 top-0 me-auto mt-1 text-3xl
          "
          onClick={() => setNavOpen((prev) => !prev)}
          area-label="menu"
        >
          <AwesomeIcon icon="fas fa-bars" />
        </IconSquare>
        <h1 class="text-2xl font-bold">בתיאוריה</h1>
      </div>

      <div
        class="
      flex h-full
      w-full flex-row justify-center
      "
      >
        <SideNav class="hidden md:flex " />

        <main
          class="
        w-full pt-2
        md:pt-2
        "
        >
          <ErrorBoundary
            fallback={(error, reset) => (
              <CenteredError error={error} reset={reset} />
            )}
          >
            <Suspense fallback={<CenteredLoading />}>
              <Switch>
                <Match when={isRouting()}>
                  <CenteredLoading />
                </Match>
                <Match when={!isRouting()}>{props.children}</Match>
              </Switch>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export const App = () => (
  <Router>
    <AppShell>{useRoutes(routes)()}</AppShell>
  </Router>
);
