import { Component, For, JSX, Show, Signal, createSignal } from 'solid-js';
import {
  QuestionCheck,
  QuestionModel,
  getQuestionCheck,
} from '../../models/questionModel';
import { Chip } from '../Chip';
import { AwesomeIcon } from '../icons/AwesomeIcon';
import { PrimaryButton } from '../lib/Button';
import { QuestionAnswer, getFeedbackFromIndexes } from './Answer';
import { QuestionExplanations } from './Explanation';
import { QuestionImages } from './Image';

export type QuestionViewProps = {
  question: QuestionModel;
  selectedSignal?: Signal<number | undefined>;
  onCheck?: (check: QuestionCheck) => void;
  children?: (
    check: QuestionCheck | undefined,
    selectedAnswer: number | undefined,
  ) => JSX.Element;
  examMode?: boolean;
};

export const QuestionView: Component<QuestionViewProps> = (props) => {
  const { answers, correctAnswerIndex } = props.question.shuffleAnswers();

  const selectedSignal =
    props.selectedSignal ?? createSignal<number | undefined>(undefined);
  const [selectedAnswer, setSelectedAnswer] = selectedSignal;

  const getStatus = (): QuestionCheck | undefined => {
    const selected = selectedAnswer();
    if (selected === undefined) return undefined;
    return getQuestionCheck(selected, correctAnswerIndex);
  };
  const [status, setStatus] = createSignal<QuestionCheck | undefined>(
    getStatus(),
  );

  const check = () => {
    const newStatus = getStatus();
    if (newStatus === undefined) return;

    props.onCheck?.(newStatus);
    setStatus(newStatus);
  };
  const answerClicked = (index: number) => {
    if (status() !== undefined && !props.examMode) return;
    setSelectedAnswer(index);
  };

  return (
    <article class="px-2">
      <h2 class="mb-5 px-2 text-2xl">{props.question.title}</h2>

      <div class="md:flex md:flex-row">
        <Show when={props.question.images.length > 0}>
          <QuestionImages
            images={props.question.images}
            class="mb-5 px-2 md:order-last md:w-5/12"
          />
        </Show>
        <section class="flex flex-grow flex-col gap-y-6 px-2 md:w-7/12">
          <div class="flex flex-col gap-y-2">
            <For each={answers}>
              {(answer, index) => (
                <QuestionAnswer
                  answer={answer}
                  selected={selectedAnswer() === index()}
                  onClick={() => answerClicked(index())}
                  feedback={
                    props.examMode
                      ? undefined
                      : getFeedbackFromIndexes(
                          index(),
                          selectedAnswer(),
                          correctAnswerIndex,
                          status() !== undefined,
                        )
                  }
                />
              )}
            </For>
            <div class="mt-1 flex justify-stretch gap-2">
              <Show when={props.onCheck}>
                <PrimaryButton
                  onClick={check}
                  disabled={selectedAnswer() === undefined}
                >
                  <AwesomeIcon icon="fas fa-check" />
                  <span>בדוק תשובה</span>
                </PrimaryButton>
              </Show>
              {props.children?.(status(), selectedAnswer())}
            </div>
          </div>

          <Show when={!props.examMode}>
            <Chip text={props.question.category} class="me-auto ms-2" />
          </Show>

          <Show when={status() !== undefined && !props.examMode}>
            <QuestionExplanations question={props.question} />
          </Show>
        </section>
      </div>
    </article>
  );
};
