import { Component, JSX } from 'solid-js';
import { classes } from '../utils/tw';

export const Chip: Component<{
  text: string;
  onClick?: () => void;
  class?: JSX.HTMLAttributes<HTMLElement>['class'];
}> = (props) => {
  return (
    <button
      class={classes(
        'rounded-full bg-gray-400 px-4 py-2 font-medium transition-opacity duration-200 hover:opacity-90 dark:bg-gray-600',
        props.onClick !== undefined ? 'cursor-pointer' : 'cursor-default',
        props.class ?? '',
      )}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};
