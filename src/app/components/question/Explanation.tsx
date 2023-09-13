import { Component, For, Match, Show, Switch } from 'solid-js';
import { ExplainsModel } from '../../models/explainsModel';
import { Explanation, QuestionModel } from '../../models/questionModel';
import { userAccessor } from '../../services/authService';
import { dynamicNumber, relativeDateMs } from '../../utils/formatters';
import { AwesomeIcon } from '../icons/AwesomeIcon';
import { IconButton, PrimaryButton } from '../lib/Button';

export const QuestionExplanations: Component<{ question: QuestionModel }> = (
  props,
) => {
  const explains = ExplainsModel.fromQuestion(props.question);

  const voteClick = async (up: boolean, index: number) => {
    const { explainsService } = await import('../../services/explainsService');
    const voteType = await explains.vote(up, index);
    const success = !voteType
      ? false
      : await explainsService.voteExplanation(props.question, voteType);
    console.log('success', success);
  };

  return (
    <div
      class="
    mb-4 animate-fade-in
    overflow-hidden rounded-xl
    bg-neutral-300
    dark:bg-neutral-700
    "
    >
      <p class="text-center text-2xl font-semibold">הסברים</p>
      <div class="mb-4 pt-4">
        <Show when={explains.sorted$.length === 0}>
          <p class="text-md text-center font-light">אין הסברים כרגע</p>
        </Show>
        <For each={explains.sorted$}>
          {(explanation, index) => (
            <QuestionExplanation
              explanation={explanation}
              voteClick={(up) => voteClick(up, index())}
              isPressed={explains.isPressed(index())}
            />
          )}
        </For>
      </div>
      <div class="mt-4 flex flex-col gap-2 bg-neutral-400 pb-4 pt-1 dark:bg-neutral-600">
        <Switch>
          <Match when={userAccessor()}>
            <AddExplanationComponent
              question={props.question}
              explains={explains}
            />
          </Match>
          <Match when={!userAccessor()}>
            <p class="text-mdt px-4">כדי להוסיף הסברים יש להתחבר</p>
          </Match>
        </Switch>
      </div>
    </div>
  );
};

const QuestionExplanation: Component<{
  explanation: Explanation;
  isPressed: readonly [up: boolean, down: boolean];
  voteClick: (up: boolean) => void;
}> = (props) => {
  return (
    <div class="min-h-24 my-1 flex flex-row">
      <div class="mx-4 flex flex-col items-center pt-2 text-2xl">
        <IconButton
          onClick={() => props.voteClick(true)}
          pressed={props.isPressed[0]}
          disabled={!userAccessor()}
        >
          <AwesomeIcon icon="fas fa-chevron-up" />
        </IconButton>
        <span dir="ltr" class="my-2 text-xl font-medium leading-3">
          {dynamicNumber(props.explanation.votes)}
        </span>
        <IconButton
          onClick={() => props.voteClick(false)}
          pressed={props.isPressed[1]}
          disabled={!userAccessor()}
        >
          <AwesomeIcon icon="fas fa-chevron-down" />
        </IconButton>
        <p class="mx-4 mt-1 text-xs">
          {relativeDateMs(props.explanation.date)}
        </p>
      </div>
      <span class="whitespace-break-spaces break-words p-1">
        {props.explanation.text}
      </span>
    </div>
  );
};

const AddExplanationComponent: Component<{
  question: QuestionModel;
  explains: ExplainsModel;
}> = (props) => {
  let textArea: HTMLTextAreaElement | undefined;

  const addExplanation = async () => {
    const { explainsService } = await import('../../services/explainsService');
    const text = textArea?.value;
    if (text === undefined) return;
    await explainsService.addExplanation(props.question, text);
  };

  return (
    <>
      <p class="mt-4 flex px-4 text-lg font-semibold">הוספת הסבר</p>
      <textarea
        class="flex h-24
        resize-none items-center justify-between
        border-2 border-neutral-300 bg-neutral-400 p-4 transition-opacity
        duration-200 hover:opacity-75 dark:border-neutral-700 dark:bg-neutral-600"
        ref={textArea}
      />
      <PrimaryButton onClick={addExplanation} class="mx-auto">
        <AwesomeIcon icon="fas fa-plus" />
        <span>הוסף הסבר</span>
      </PrimaryButton>
    </>
  );
};
