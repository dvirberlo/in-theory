import { Component, For, JSX } from 'solid-js';
import { Image } from '../../models/questionModel';

export const QuestionImages: Component<{
  images: Image[];
  class?: JSX.HTMLAttributes<HTMLElement>['class'];
}> = (props) => {
  return (
    <section class={props.class + ` flex flex-col gap-2`}>
      <For each={props.images}>
        {(image) => <QuestionImage image={image} />}
      </For>
    </section>
  );
};

const QuestionImage: Component<{ image: Image }> = (props) => {
  return (
    <div class="flex flex-col w-full max-h-[min(33dvh,100%)]">
      <img
        src={`/images/questions/${props.image.id}`}
        alt={props.image.alt}
        title={props.image.alt}
        class="h-auto w-auto object-contain rounded-md shadow-lg"
        width="350px"
        height="230px"
      />
    </div>
  );
};
