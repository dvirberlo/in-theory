import { JSX, ParentComponent } from 'solid-js';
import { tw } from '../../utils/tw';

export type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  class?: string;
  ['aria-label']?: string;
};

export const Button: ParentComponent<ButtonProps> = (props) => (
  <button
    onClick={props.onClick}
    disabled={props.disabled}
    class={
      `dark:bg-neutral-400 bg-neutral-700 dark:text-black text-white
      font-semibold py-3 px-4 rounded-xl
      hover:opacity-80 disabled:opacity-40 transition-opacity duration-200
      gap-x-1.5 flex items-center
      ` + (props.class ?? '')
    }
    area-label={props['aria-label']}
  >
    {props.children}
  </button>
);

export const PrimaryButton: ParentComponent<ButtonProps> = (props) => (
  <button
    onClick={props.onClick}
    disabled={props.disabled}
    class={
      `dark:bg-sky-400 bg-sky-600 dark:text-black text-white
      font-semibold py-3 px-4 rounded-xl
      hover:bg-opacity-90 transition-all duration-200
      disabled:opacity-40
      gap-x-1.5 flex items-center
      ` + (props.class ?? '')
    }
    area-label={props['aria-label']}
  >
    {props.children}
  </button>
);

export const SecondaryButton: ParentComponent<ButtonProps> = (props) => (
  <button
    onClick={props.onClick}
    disabled={props.disabled}
    class={
      `dark:bg-teal-700 bg-teal-300 dark:text-white text-black
      font-semibold py-3 px-4 rounded-xl
      hover:bg-opacity-90 transition-all duration-200
      disabled:opacity-40
      gap-x-1.5 flex items-center
      ` + (props.class ?? '')
    }
    area-label={props['aria-label']}
  >
    {props.children}
  </button>
);

export const IconButton: ParentComponent<
  ButtonProps & {
    pressed?: boolean;
  }
> = (props) => (
  <button
    class={`
    ${
      props.disabled
        ? ''
        : `
      hover:dark:bg-neutral-400 hover:bg-neutral-700
      hover:dark:text-black hover:text-white
      `
    }
    hover:bg-opacity-75 transition-all duration-200
    disabled:opacity-40
    flex flex-col items-center justify-center
    w-[1.3em] h-[1.3em]
    text-3xl
    rounded-full
    ${
      props.pressed
        ? 'dark:bg-neutral-400 bg-neutral-700 dark:text-black text-white'
        : ''
    }
      ${props.class ?? ''}
    `}
    onClick={props.onClick}
    disabled={props.disabled}
    area-label={props['aria-label']}
  >
    {props.children}
  </button>
);

export const IconSquare: ParentComponent<ButtonProps> = (props) => (
  <button
    class={`
    flex flex-col items-center justify-center
    w-[1.3em] h-[1.3em]
    rounded-full
    hover:opacity-75 disabled:opacity-40 transition-opacity duration-200
    ${props.class ?? ''}
    `}
    onClick={props.onClick}
    disabled={props.disabled}
    area-label={props['aria-label']}
  >
    {props.children}
  </button>
);

export const MenuButton: ParentComponent<ButtonProps> = (props) => (
  <button
    onClick={props.onClick}
    disabled={props.disabled}
    class={
      `
      hover:bg-neutral-300 hover:dark:bg-neutral-700
      text-black dark:text-white
      font-semibold py-3 px-4 rounded-xl
      disabled:opacity-40 transition-all duration-200
      gap-x-1.5 flex items-center
      ` + (props.class ?? '')
    }
    area-label={props['aria-label']}
  >
    {props.children}
  </button>
);

export const RedMenuButton: ParentComponent<ButtonProps> = (props) => (
  <button
    onClick={props.onClick}
    disabled={props.disabled}
    class={
      `dark:text-red-300 text-red-700
      hover:bg-red-300 hover:dark:bg-red-700 hover:text-black hover:dark:text-white
      font-semibold py-3 px-4 rounded-xl
      disabled:opacity-40 transition-all duration-200
      gap-x-1.5 flex items-center
      ` + (props.class ?? '')
    }
    area-label={props['aria-label']}
  >
    {props.children}
  </button>
);

export const PrimaryMenuButton: ParentComponent<ButtonProps> = (props) => (
  <button
    onClick={props.onClick}
    disabled={props.disabled}
    class={
      `dark:text-sky-300 text-sky-700
      hover:bg-sky-300 hover:dark:bg-sky-700 hover:dark:text-white hover:text-black
      font-semibold py-3 px-4 rounded-xl
      disabled:opacity-40 transition-all duration-200
      gap-x-1.5 flex items-center
      ` + (props.class ?? '')
    }
    area-label={props['aria-label']}
  >
    {props.children}
  </button>
);

export const SecondaryMenuButton: ParentComponent<ButtonProps> = (props) => (
  <button
    onClick={props.onClick}
    disabled={props.disabled}
    class={
      `dark:text-teal-200 text-teal-800
      hover:bg-teal-200 hover:dark:bg-teal-800 hover:dark:text-white hover:text-black
      font-semibold py-3 px-4 rounded-xl
      disabled:opacity-40 transition-all duration-200
      gap-x-1.5 flex items-center
      ` + (props.class ?? '')
    }
    area-label={props['aria-label']}
  >
    {props.children}
  </button>
);
