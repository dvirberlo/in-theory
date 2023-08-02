import { Component, Match, Switch, createResource } from 'solid-js';
import { CenteredLoading } from '../lib/Loading';

export const UserProgress: Component = () => {
  const [progress] = createResource(
    async () =>
      await (
        await import('../../services/userService')
      ).userService.getQuestionsProgress()
  );

  return (
    <Switch>
      <Match when={progress.loading}>
        <CenteredLoading />
      </Match>
      <Match when={progress()}>
        <div class="flex flex-col gap-2">
          <p class="text-2xl font-semibold text-center">התקדמות</p>
          <div class="flex flex-col gap-2">
            <div class="flex flex-row justify-between">
              <p>סה"כ שאלות</p>
              <p>{progress()!.total}</p>
            </div>
            <div class="flex flex-row justify-between">
              <p>נכונות</p>
              <p>{progress()!.done}</p>
            </div>
            <div class="flex flex-row justify-between">
              <p>לא נכונות</p>
              <p>{progress()!.failed}</p>
            </div>
            <div class="flex flex-row justify-between">
              <p>לא נענו</p>
              <p>
                {progress()!.total - (progress()!.done + progress()!.failed)}
              </p>
            </div>
          </div>
        </div>
      </Match>
    </Switch>
  );
};
