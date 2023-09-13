import { Component, JSX } from 'solid-js';
import { tw } from '../utils/tw';

export const Chip: Component<{
  text: string;
  onClick?: () => void;
  class?: JSX.HTMLAttributes<HTMLElement>['class'];
}> = (props) => {
  return (
    <button
      class={`
      rounded-full bg-gray-400
        px-4
        py-2 font-medium transition-opacity duration-200
        hover:opacity-90 dark:bg-gray-600
        ${
          (props.onClick !== undefined
            ? tw`cursor-pointer`
            : tw`cursor-default `) + `${props.class ?? ''}`
        }`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};
