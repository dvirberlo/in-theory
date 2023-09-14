import { JSX, ParentComponent } from 'solid-js';
import { classes } from '../../utils/tw';

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
    class={classes(
      'flex items-center gap-x-1.5 rounded-xl bg-neutral-700 px-4 py-3 font-semibold text-white transition-opacity duration-200 hover:opacity-80 disabled:opacity-40 dark:bg-neutral-400 dark:text-black',
      props.class ?? '',
    )}
    area-label={props['aria-label']}
  >
    {props.children}
  </button>
);

export const PrimaryButton: ParentComponent<ButtonProps> = (props) => (
  <button
    onClick={props.onClick}
    disabled={props.disabled}
    class={classes(
      'flex items-center gap-x-1.5 rounded-xl bg-sky-600 px-4 py-3 font-semibold text-white transition-all duration-200 hover:bg-opacity-90 disabled:opacity-40 dark:bg-sky-400 dark:text-black',
      props.class ?? '',
    )}
    area-label={props['aria-label']}
  >
    {props.children}
  </button>
);

export const SecondaryButton: ParentComponent<ButtonProps> = (props) => (
  <button
    onClick={props.onClick}
    disabled={props.disabled}
    class={classes(
      'flex items-center gap-x-1.5 rounded-xl bg-teal-300 px-4 py-3 font-semibold text-black transition-all duration-200 hover:bg-opacity-90 disabled:opacity-40 dark:bg-teal-700 dark:text-white',
      props.class ?? '',
    )}
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
    class={classes(
      props.disabled
        ? ''
        : 'hover:bg-neutral-700 hover:text-white hover:dark:bg-neutral-400 hover:dark:text-black',
      'flex h-[1.3em] w-[1.3em] flex-col items-center justify-center rounded-full text-3xl transition-all duration-200 hover:bg-opacity-75 disabled:opacity-40',
      props.pressed
        ? 'bg-neutral-700 text-white dark:bg-neutral-400 dark:text-black'
        : '',
      props.class ?? '',
    )}
    onClick={props.onClick}
    disabled={props.disabled}
    area-label={props['aria-label']}
  >
    {props.children}
  </button>
);

export const IconSquare: ParentComponent<ButtonProps> = (props) => (
  <button
    class={classes(
      'flex h-[1.3em] w-[1.3em] flex-col items-center justify-center rounded-full transition-opacity duration-200 hover:opacity-75 disabled:opacity-40',
      props.class ?? '',
    )}
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
    class={classes(
      'flex items-center gap-x-1.5 rounded-xl px-4 py-3 font-semibold text-black transition-all duration-200 hover:bg-neutral-300 disabled:opacity-40 dark:text-white hover:dark:bg-neutral-700',
      props.class ?? '',
    )}
    area-label={props['aria-label']}
  >
    {props.children}
  </button>
);

export const RedMenuButton: ParentComponent<ButtonProps> = (props) => (
  <button
    onClick={props.onClick}
    disabled={props.disabled}
    class={classes(
      'flex items-center gap-x-1.5 rounded-xl px-4 py-3 font-semibold text-red-700 transition-all duration-200 hover:bg-red-300 hover:text-black disabled:opacity-40 dark:text-red-300 hover:dark:bg-red-700 hover:dark:text-white',
      props.class ?? '',
    )}
    area-label={props['aria-label']}
  >
    {props.children}
  </button>
);

export const PrimaryMenuButton: ParentComponent<ButtonProps> = (props) => (
  <button
    onClick={props.onClick}
    disabled={props.disabled}
    class={classes(
      'flex items-center gap-x-1.5 rounded-xl px-4 py-3 font-semibold text-sky-700 transition-all duration-200 hover:bg-sky-300 hover:text-black disabled:opacity-40 dark:text-sky-300 hover:dark:bg-sky-700 hover:dark:text-white',
      props.class ?? '',
    )}
    area-label={props['aria-label']}
  >
    {props.children}
  </button>
);

export const SecondaryMenuButton: ParentComponent<ButtonProps> = (props) => (
  <button
    onClick={props.onClick}
    disabled={props.disabled}
    class={classes(
      'flex items-center gap-x-1.5 rounded-xl px-4 py-3 font-semibold text-teal-800 transition-all duration-200 hover:bg-teal-200 hover:text-black disabled:opacity-40 dark:text-teal-200 hover:dark:bg-teal-800 hover:dark:text-white',
      props.class ?? '',
    )}
    area-label={props['aria-label']}
  >
    {props.children}
  </button>
);
