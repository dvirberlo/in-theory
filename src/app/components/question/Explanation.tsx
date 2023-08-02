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
    dark:bg-neutral-700 bg-neutral-300
    rounded-xl overflow-hidden
    animate-fade-in
    mb-4
    "
    >
      <p class="text-2xl font-semibold text-center">הסברים</p>
      <div class="pt-4 mb-4">
        <Show when={explains.sorted$.length === 0}>
          <p class="text-center text-md font-light">אין הסברים כרגע</p>
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
      <div class="dark:bg-neutral-600 bg-neutral-400 flex flex-col pb-4 gap-2 mt-4 pt-1">
        <Switch>
          <Match when={userAccessor()}>
            <AddExplanationComponent
              question={props.question}
              explains={explains}
            />
          </Match>
          <Match when={!userAccessor()}>
            <p class="px-4 text-mdt">כדי להוסיף הסברים יש להתחבר</p>
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
    <div class="flex flex-row min-h-24 my-1">
      <div class="flex flex-col mx-4 text-2xl items-center pt-2">
        <IconButton
          onClick={() => props.voteClick(true)}
          pressed={props.isPressed[0]}
          disabled={!userAccessor()}
        >
          <AwesomeIcon icon="fas fa-chevron-up" />
        </IconButton>
        <span dir="ltr" class="text-xl leading-3 my-2 font-medium">
          {dynamicNumber(props.explanation.votes)}
        </span>
        <IconButton
          onClick={() => props.voteClick(false)}
          pressed={props.isPressed[1]}
          disabled={!userAccessor()}
        >
          <AwesomeIcon icon="fas fa-chevron-down" />
        </IconButton>
        <p class="text-xs mx-4 mt-1">
          {relativeDateMs(props.explanation.date)}
        </p>
      </div>
      <span class="break-words whitespace-break-spaces p-1">
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
      <p class="text-lg font-semibold px-4 flex mt-4">הוספת הסבר</p>
      <textarea
        class="dark:bg-neutral-600 bg-neutral-400
        border-2 dark:border-neutral-700 border-neutral-300
        h-24 p-4 flex items-center justify-between
        hover:opacity-75 transition-opacity duration-200 resize-none"
        ref={textArea}
      />
      <PrimaryButton onClick={addExplanation} class="mx-auto">
        <AwesomeIcon icon="fas fa-plus" />
        <span>הוסף הסבר</span>
      </PrimaryButton>
    </>
  );
};
