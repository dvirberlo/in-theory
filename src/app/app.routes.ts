import { RouteDefinition } from '@solidjs/router';
import { lazy } from 'solid-js';

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const LearnPage = lazy(() => import('./pages/LearnPage'));
const SignsPage = lazy(() => import('./pages/SignsPage'));
// const SignsPage = lazy(() => new Promise(() => {}));
const ExamPage = lazy(() => import('./pages/ExamPage'));
const InfoPage = lazy(() => import('./pages/InfoPage'));
const NoPage = lazy(() => import('./pages/NoPage'));

export const routesPath = {
  home: '/',
  login: '/login',
  settings: '/settings',
  learn: '/learn',
  learnId: (id: string | number) => `/learn/${id}`,
  exam: '/exam',
  signs: '/signs',
  info: '/info',
} satisfies Record<string, string | ((...args: any[]) => string)>;

export const routes = {
  path: '*',
  children: [
    {
      path: routesPath.home,
      component: HomePage,
    },
    {
      path: routesPath.login,
      component: LoginPage,
    },
    {
      path: routesPath.settings,
      component: SettingsPage,
    },
    {
      path: routesPath.learnId(':id?'),
      component: LearnPage,
    },
    {
      path: routesPath.exam,
      component: ExamPage,
    },
    {
      path: routesPath.signs,
      component: SignsPage,
    },
    {
      path: routesPath.info,
      component: InfoPage,
    },
    {
      path: '*',
      component: NoPage,
    },
  ],
} satisfies RouteDefinition;
