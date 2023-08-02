import { Component, Match, Switch, createEffect } from 'solid-js';
import { AwesomeIcon } from '../icons/AwesomeIcon';
import { tw } from '../../utils/tw';

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
      class={`w-full min-h-12 p-4 flex flex-row items-center justify-between
        ${
          props.feedback === 'correct' || props.feedback === 'missed'
            ? `dark:bg-green-700 bg-green-300`
            : props.feedback === 'wrong'
            ? `dark:bg-red-700 bg-red-300`
            : `dark:bg-gray-800 bg-gray-300`
        }
        dark:text-white text-black
        cursor-pointer rounded-xl
        text-start
        hover:bg-opacity-75 hover:border-opacity-50
        transition-all duration-200
        dark:ring-white ring-black ${props.selected ? 'ring-2 ' : ''}`}
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
