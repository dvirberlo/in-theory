import { Component, Match, Switch, createEffect } from 'solid-js';
import { AwesomeIcon } from '../icons/AwesomeIcon';
import { classes } from '../../utils/tw';

export type AnswerFeedback = 'correct' | 'wrong' | 'missed' | undefined;

export function getFeedbackFromIndexes(
  index: number,
  selectedIndex: number | undefined,
  correctIndex: number,
  show = true,
): AnswerFeedback {
  if (!show || selectedIndex === undefined) return undefined;
  return getFeedback(index === selectedIndex, index === correctIndex);
}

export function getFeedback(
  isSelected: boolean,
  isCorrect: boolean,
): AnswerFeedback {
  if (isCorrect) {
    return isSelected ? 'correct' : 'missed';
  }
  return isSelected ? 'wrong' : undefined;
}

export const QuestionAnswer: Component<{
  answer: string;
  onClick?: () => void;
  selected?: boolean;
  feedback?: AnswerFeedback;
}> = (props) => {
  return (
    <button
      class={classes(
        'min-h-12 flex w-full flex-row items-center justify-between p-4',
        props.feedback === 'correct' || props.feedback === 'missed'
          ? `bg-green-300 dark:bg-green-700`
          : props.feedback === 'wrong'
          ? `bg-red-300 dark:bg-red-700`
          : `bg-gray-300 dark:bg-gray-800`,
        'cursor-pointer rounded-xl text-start text-black ring-black transition-all duration-200 hover:border-opacity-50 hover:bg-opacity-75 dark:text-white dark:ring-white',
        props.selected ? 'ring-2 ' : '',
      )}
      onClick={props.onClick}
    >
      {props.answer}
      <Switch>
        <Match when={props.feedback === 'wrong'}>
          <AwesomeIcon
            icon="fas fa-times"
            class="ms-6 text-red-900 dark:text-red-100"
          />
        </Match>
        <Match
          when={props.feedback === 'correct' || props.feedback === 'missed'}
        >
          <AwesomeIcon
            icon="fas fa-check"
            class="ms-6 text-green-900 dark:text-green-100"
          />
        </Match>
      </Switch>
    </button>
  );
};
