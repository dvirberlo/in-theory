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
      dark:bg-gray-600 bg-gray-400
        font-medium
        rounded-full px-4 py-2 hover:opacity-90
        transition-opacity duration-200
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
