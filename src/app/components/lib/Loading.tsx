import { Component } from 'solid-js';

export const CenteredLoading: Component = () => {
  return (
    <div class="flex h-full animate-delayed-fade-in flex-col items-center justify-center">
      <div class="h-12 w-12 animate-spin-fast rounded-full border-b-2 border-t-2 border-black dark:border-white"></div>
    </div>
  );
};
export const AdaptiveLoading: Component = () => {
  return (
    <div
      class="
    my-auto flex h-full animate-delayed-fade-in
    flex-col
    items-center
    justify-center
    "
    >
      <div
        class="
      h-[1.1em]
      w-[1.1em]
      animate-spin-fast rounded-full
      border-b-2 border-t-2
      border-current
      "
      ></div>
    </div>
  );
};
