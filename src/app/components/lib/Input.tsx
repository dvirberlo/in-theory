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
 dark:bg-gray-700 bg-gray-300
   h-12 rounded-xl my-2 p-4 flex items-center justify-between
   hover:opacity-75 transition-opacity duration-200"
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
