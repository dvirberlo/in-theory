import {
  Component,
  Match,
  ParentComponent,
  Switch,
  batch,
  createEffect,
  createResource,
  createSignal,
  onCleanup,
} from 'solid-js';
import { AwesomeIcon } from '../components/icons/AwesomeIcon';
import { PrimaryButton, SecondaryButton } from '../components/lib/Button';
import { CenteredLoading } from '../components/lib/Loading';
import { QuestionView } from '../components/question/Question';
import {
  EXAM_QUESTIONS,
  EXAM_TIME,
  MINIMUM_PASSING_QUESTION_COUNT,
} from '../constants/examConstants';
import { ExamModel } from '../models/examModel';

type ExamState = 'init' | 'fill' | 'review';

const ExamPage: Component = () => {
  let exam: ExamModel | undefined;

  const [state, setState] = createSignal<ExamState>('init');

  const newExam = async () => {
    const { examService } = await import('../services/examService');
    exam = examService.newExam();
    setState('fill');
  };
  const submitExam = () => setState('review');

  return (
    <Switch>
      <Match when={state() === 'init'}>
        <ExamInit newExam={newExam} />
      </Match>
      <Match when={state() === 'fill'}>
        <ExamFill exam={exam!} submitExam={submitExam} />
      </Match>
      <Match when={state() === 'review'}>
        <ExamReview exam={exam!} />
      </Match>
    </Switch>
  );
};

const ExamInit: Component<{
  newExam: () => void;
}> = (props) => {
  return (
    <article class="p-4">
      <h1 class="text-6xl font-thin ">מבחן</h1>
      <div class="mb-6 mt-2 space-y-2 text-xl">
        <p>
          <AwesomeIcon icon="fas fa-pen" class="me-2" />
          המבחן מורכב מ{EXAM_QUESTIONS} שאלות.
        </p>
        <p>
          <AwesomeIcon icon="fas fa-check-square" class="me-2" />
          על מנת לעבור יש לענות נכון על לפחות {
            MINIMUM_PASSING_QUESTION_COUNT
          }{' '}
          שאלות.
        </p>
        <p>
          <AwesomeIcon icon="fas fa-hourglass-start" class="me-2" />
          משך המבחן הוא {EXAM_TIME / (1000 * 60)} דקות. <br />
        </p>
      </div>
      <PrimaryButton onClick={props.newExam}>
        התחל מבחן
        <AwesomeIcon icon="fas fa-play" rtl />
      </PrimaryButton>
    </article>
  );
};

const ExamFill: Component<{
  exam: ExamModel;
  submitExam: () => void;
}> = (props) => {
  let exam = props.exam;

  const { QIdx, selectedSignal, question, nextQuestion, prevQuestion } =
    examExplorer(exam);

  const [selected, setSelected] = selectedSignal;
  const [examFilled, setExamFilled] = createSignal(false);
  createEffect(() => {
    const answer = selected();
    if (exam) {
      const q = exam.questions[QIdx()];
      if (q) q.answer = answer;
      setExamFilled(exam.questions.every((a) => a?.answer !== undefined));
    }
  });

  const totalTime = EXAM_TIME / 1000;
  const [time, setTime] = createSignal(totalTime);
  const timeInterval = setInterval(
    () =>
      setTime((t) => {
        if (t === 0) submit();
        return t - 1;
      }),
    1000,
  );
  onCleanup(() => clearInterval(timeInterval));

  const submit = () => {
    clearInterval(timeInterval);
    props.submitExam();
  };

  return (
    <article class="p-4">
      <div class="flex flex-row justify-between">
        <h1 class="mb-4 text-6xl font-thin">מבחן</h1>
        <ExamBanner class="bg-orange-600 font-mono text-2xl font-semibold text-white dark:bg-orange-300 dark:text-gray-900">
          <AwesomeIcon icon="fas fa-hourglass-start" class="me-2" />
          <div dir="ltr">
            <span>
              {Math.floor(time() / 60)
                .toString()
                .padStart(2, '0')}
              :{(time() % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </ExamBanner>
      </div>
      <div class="space-y-4">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <h2 class="mb-4 text-3xl font-thin">שאלה מספר {QIdx() + 1}</h2>
          <div class="flex flex-row gap-x-4">
            <PreviousButton onClick={prevQuestion} />
            <NextButton onClick={nextQuestion} />
            <PrimaryButton onClick={submit} disabled={!examFilled()}>
              <AwesomeIcon icon="fas fa-paper-plane" rtl />
              הגשת מבחן
            </PrimaryButton>
          </div>
        </div>
        <Switch>
          <Match when={question.loading}>
            <CenteredLoading />
          </Match>
          <Match when={question()}>
            {(q) => (
              <QuestionView
                question={q()}
                selectedSignal={selectedSignal}
                examMode
              />
            )}
          </Match>
        </Switch>
      </div>
    </article>
  );
};

const ExamReview: Component<{
  exam: ExamModel;
}> = (props) => {
  let exam = props.exam;
  const correctCount = exam.questions.filter(
    (q) => q?.answer === q?.shuffleAnswers().correctAnswerIndex,
  ).length;
  const hasPassed = correctCount >= MINIMUM_PASSING_QUESTION_COUNT;

  const { QIdx, selectedSignal, question, nextQuestion, prevQuestion } =
    examExplorer(exam);

  return (
    <article class="p-4">
      <div class="flex flex-row justify-between">
        <h1 class="mb-4 text-6xl font-thin">מבחן</h1>
        <ExamBanner
          class={`
            text-xl text-gray-100 dark:text-gray-900
            ${
              hasPassed
                ? 'bg-green-700 dark:bg-green-300'
                : 'bg-red-700 dark:bg-red-300'
            }
          `}
        >
          <span>ציון:</span>
          <div dir="ltr">
            <span class="font-bold">{correctCount}</span>
            <span>/</span>
            <span class="font-bold">{EXAM_QUESTIONS}</span>
          </div>
          <span>{hasPassed ? '(עובר)' : '(לא עובר)'}</span>
        </ExamBanner>
      </div>
      <div class="space-y-4">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <h2 class="mb-4 text-3xl font-thin">שאלה מספר {QIdx() + 1}</h2>
          <div class="flex flex-row gap-x-4">
            <PreviousButton onClick={prevQuestion} />
            <NextButton onClick={nextQuestion} />
          </div>
        </div>
        <Switch>
          <Match when={question.loading}>
            <CenteredLoading />
          </Match>
          <Match when={question()}>
            {(q) => (
              <QuestionView question={q()} selectedSignal={selectedSignal} />
            )}
          </Match>
        </Switch>
      </div>
    </article>
  );
};

const PreviousButton: Component<{ onClick: () => void }> = (props) => {
  return (
    <SecondaryButton onClick={props.onClick}>
      <AwesomeIcon icon="fas fa-arrow-left" rtl />
      השאלה הקודמת
    </SecondaryButton>
  );
};
const NextButton: Component<{ onClick: () => void }> = (props) => {
  return (
    <SecondaryButton onClick={props.onClick}>
      השאלה הבאה
      <AwesomeIcon icon="fas fa-arrow-right" rtl />
    </SecondaryButton>
  );
};

const ExamBanner: ParentComponent<{
  class?: string;
}> = (props) => {
  return (
    <div
      class={`
          mb-4 flex
          flex-row
          items-center
          gap-x-1
          rounded-s-2xl
          p-3
          ${props.class ?? ''}
          `}
    >
      {props.children}
    </div>
  );
};

const examExplorer = (exam: ExamModel) => {
  const [QIdx, _setQIdx] = createSignal(0);

  const selectedSignal = createSignal<number | undefined>(
    exam.questions[QIdx()]?.answer,
  );
  const [selected, setSelected] = selectedSignal;

  const setQIdx = (...args: Parameters<typeof _setQIdx>) => {
    return batch(() => {
      const newQId = _setQIdx(...args);
      setSelected(exam.questions[QIdx()]?.answer);
      return newQId;
    });
  };

  const [question] = createResource(QIdx, async (idx) => {
    const { examService } = await import('../services/examService');
    return await examService.getQuestion(exam, idx);
  });

  const nextQuestion = () =>
    setQIdx((prev) => {
      return (prev + 1) % exam.questions.length;
    });
  const prevQuestion = () =>
    setQIdx((prev) => {
      return (prev - 1 + exam.questions.length) % exam.questions.length;
    });

  return {
    QIdx,
    setQIdx,
    selectedSignal,
    question,
    nextQuestion,
    prevQuestion,
  } as const;
};

export default ExamPage;
