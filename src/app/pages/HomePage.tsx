import { useNavigate } from '@solidjs/router';
import { Component, Match, Show, Switch, createResource } from 'solid-js';
import { routesPath } from '../app.routes';
import { AwesomeIcon } from '../components/icons/AwesomeIcon';
import { PrimaryButton, SecondaryButton } from '../components/lib/Button';
import { CenteredLoading } from '../components/lib/Loading';
import { Progress } from '../components/lib/Progress';
import { userAccessor } from '../services/authService';

const HomePage: Component = () => {
  const navigate = useNavigate();

  return (
    <div class="space-y-10 p-4">
      <h1 class="text-center text-6xl font-thin">לימוד תיאוריה</h1>
      <div>
        <p class="text-2xl font-bold text-sky-600 dark:text-sky-400">
          לימוד תיאוריה יעיל ונוח
        </p>
        <p class="-mt-0 text-xl font-medium text-teal-600 dark:text-teal-400">
          באפליקציה נוחה וללא פרסומות
        </p>
      </div>
      <div class="flex flex-row items-center gap-x-4">
        <PrimaryButton onClick={() => navigate(routesPath.learn)}>
          התחל ללמוד
          <AwesomeIcon icon="fas fa-arrow-right" rtl />
        </PrimaryButton>
        <Show when={!userAccessor()}>
          <SecondaryButton onClick={() => navigate(routesPath.login)}>
            <AwesomeIcon icon="fas fa-sign-in-alt" rtl />
            התחברות (אופציונלי)
          </SecondaryButton>
        </Show>
      </div>
      <UserProgress />
    </div>
  );
};

const UserProgress: Component = () => {
  const [progress] = createResource(
    async () =>
      await (
        await import('../services/userService')
      ).userService.getQuestionsProgress(),
  );

  return (
    <Switch>
      <Match when={progress.loading}>
        <CenteredLoading />
      </Match>
      <Match when={progress()}>
        <Progress
          correct={progress()!.correct}
          wrong={progress()!.wrong}
          total={progress()!.total}
        />
      </Match>
    </Switch>
  );
};

export default HomePage;
