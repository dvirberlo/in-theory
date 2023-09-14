import { Component } from 'solid-js';

export const Progress: Component<{
  total: number;
  correct: number;
  wrong: number;
}> = (props) => {
  const answered = props.correct + props.wrong;
  const correctPercent = Math.round((props.correct / answered) * 100);
  const wrongPercent = Math.round((props.wrong / answered) * 100);

  if (answered === 0) return <></>;
  return (
    <div class="flex flex-col px-1">
      <div class="relative h-5 flex-col">
        <div
          class="absolute z-20 flex h-full flex-row items-center rounded-full bg-green-400"
          style={{
            width: `${correctPercent}%`,
          }}
        ></div>
        <div
          class="absolute z-10 flex h-full flex-row items-center rounded-full bg-red-400"
          style={{
            width: `${correctPercent + wrongPercent}%`,
          }}
        ></div>
        {/* <div class="absolute flex h-full w-full flex-row items-center rounded-full bg-gray-300"></div> */}
      </div>
      <div class="flex flex-row flex-wrap gap-x-3">
        <div class="flex flex-row items-center gap-x-1">
          <div class="h-4 w-4 rounded-full bg-green-400" />
          <p class="font-semibold">{props.correct}</p>
          <p>הצלחה</p>
        </div>
        <div class="flex flex-row items-center gap-x-1">
          <div class="h-4 w-4 rounded-full bg-red-400" />
          <p class="font-semibold">{props.wrong}</p>
          <p>כישלון</p>
        </div>
        <div class="flex flex-row items-center gap-x-1">
          <div class="h-4 w-4 rounded-full bg-gray-300" />
          <p class="font-semibold">
            {props.total - props.correct - props.wrong}
          </p>
          <p>טרם נענה</p>
        </div>
      </div>
    </div>
  );
};
