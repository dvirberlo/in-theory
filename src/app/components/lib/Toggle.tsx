import { Component, createEffect, createSignal } from 'solid-js';

export const Toggle: Component<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}> = (props) => {
  const [checked, setChecked] = createSignal(props.checked);
  createEffect(() => props.onChange(checked()));
  return (
    <button
      class={
        'relative mx-1 my-2 inline-flex h-9 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-blue-600 transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ' +
        (checked() ? 'bg-opacity-100' : 'bg-opacity-25')
      }
      role="switch"
      type="button"
      aria-checked={checked()}
      onClick={() => setChecked((c) => !c)}
    >
      <span class="sr-only">{props.label}</span>
      <span
        aria-hidden="true"
        class={
          'pointer-events-none inline-block h-8 w-8 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ' +
          (checked() ? 'translate-x-7 rtl:-translate-x-7' : 'translate-x-0')
        }
      ></span>
    </button>
  );
};
