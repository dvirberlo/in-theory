import { Component, JSX } from 'solid-js';

export type InputProps = {
  placeholder?: string;
  type?: JSX.InputHTMLAttributes<HTMLInputElement>['type'];
  ref?: JSX.InputHTMLAttributes<HTMLInputElement>['ref'];
  onInput?: JSX.InputHTMLAttributes<HTMLInputElement>['onInput'];
  value?: string;
  dir?: JSX.HTMLAttributes<HTMLInputElement>['dir'];
  maxLength?: number;
  onEnter?: () => void;
};

export const Input: Component<InputProps> = (props) => {
  return (
    <input
      class="
 my-2 flex
   h-12 items-center justify-between rounded-xl bg-gray-300 p-4 transition-opacity
   duration-200 hover:opacity-75 dark:bg-gray-700"
      placeholder={props.placeholder}
      type={props.type}
      ref={props.ref}
      onInput={props.onInput}
      value={props.value ?? ''}
      dir={props.dir}
      maxLength={props.maxLength}
      onKeyDown={
        props.onEnter !== undefined
          ? (e) => {
              if (e.key !== 'Enter') return;
              e.preventDefault();
              props.onEnter?.();
            }
          : undefined
      }
    />
  );
};
