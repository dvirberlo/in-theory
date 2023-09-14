import { JSX, ParentComponent } from 'solid-js';
import { classes } from '../../utils/tw';

export type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  class?: string;
  ['aria-label']?: string;
};

const ButtonBase: ParentComponent<ButtonProps> = (props) => (
  <button
    onClick={props.onClick}
    disabled={props.disabled}
    class={classes(
      'flex items-center gap-x-1.5 rounded-xl px-4 py-3 font-semibold transition-all duration-200 hover:bg-opacity-80 disabled:opacity-40',
      props.class ?? '',
    )}
    area-label={props['aria-label']}
  >
    {props.children}
  </button>
);

export const PrimaryButton: ParentComponent<ButtonProps> = (props) => (
  <ButtonBase
    onClick={props.onClick}
    disabled={props.disabled}
    class={classes(
      'bg-blue-400 text-black dark:bg-blue-600 dark:text-white',
      props.class ?? '',
    )}
    aria-label={props['aria-label']}
    children={props.children}
  />
);

export const SecondaryButton: ParentComponent<ButtonProps> = (props) => (
  <ButtonBase
    onClick={props.onClick}
    disabled={props.disabled}
    class={classes(
      'bg-indigo-200 text-black dark:bg-indigo-800 dark:text-white',
      props.class ?? '',
    )}
    aria-label={props['aria-label']}
    children={props.children}
  />
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

const MenuButtonBase: ParentComponent<ButtonProps> = (props) => (
  <button
    onClick={props.onClick}
    disabled={props.disabled}
    class={classes(
      'transition-color flex items-center gap-x-1.5 rounded-xl px-4 py-3 font-semibold duration-200 disabled:opacity-40',
      props.class ?? '',
    )}
    area-label={props['aria-label']}
  >
    {props.children}
  </button>
);

export const MenuButton: ParentComponent<ButtonProps> = (props) => (
  <MenuButtonBase
    onClick={props.onClick}
    disabled={props.disabled}
    class={classes(
      'text-black hover:bg-neutral-300 dark:text-white hover:dark:bg-neutral-700',
      props.class ?? '',
    )}
    aria-label={props['aria-label']}
    children={props.children}
  />
);

export const RedMenuButton: ParentComponent<ButtonProps> = (props) => (
  <MenuButtonBase
    onClick={props.onClick}
    disabled={props.disabled}
    class={classes(
      'text-red-700 hover:bg-red-500 hover:bg-opacity-30 hover:text-black dark:text-red-300 hover:dark:text-white',
      props.class ?? '',
    )}
    aria-label={props['aria-label']}
    children={props.children}
  />
);

export const PrimaryMenuButton: ParentComponent<ButtonProps> = (props) => (
  <MenuButtonBase
    onClick={props.onClick}
    disabled={props.disabled}
    class={classes(
      // 'text-indigo-600 hover:bg-indigo-400 hover:text-black dark:text-indigo-400 hover:dark:bg-sky-600 hover:dark:text-white',
      'text-blue-600 hover:bg-blue-500 hover:bg-opacity-30 hover:text-black dark:text-blue-400 hover:dark:text-white',
      props.class ?? '',
    )}
    area-label={props['aria-label']}
    children={props.children}
  />
);
