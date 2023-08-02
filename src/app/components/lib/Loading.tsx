import { Component } from 'solid-js';

export const CenteredLoading: Component = () => {
  return (
    <div class="flex flex-col items-center justify-center h-full animate-delayed-fade-in">
      <div class="animate-spin-fast rounded-full h-12 w-12 border-t-2 border-b-2 dark:border-white border-black"></div>
    </div>
  );
};
export const AdaptiveLoading: Component = () => {
  return (
    <div
      class="
    flex flex-col items-center justify-center
    h-full
    my-auto
    animate-delayed-fade-in
    "
    >
      <div
        class="
      animate-spin-fast
      rounded-full
      h-[1.1em] w-[1.1em]
      border-t-2 border-b-2
      border-current
      "
      ></div>
    </div>
  );
};
