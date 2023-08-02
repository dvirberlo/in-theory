import { useNavigate, useParams } from '@solidjs/router';
import {
  Component,
  Match,
  Switch,
  createEffect,
  createResource,
  createSignal,
} from 'solid-js';
import { routesPath } from '../app.routes';
import { AwesomeIcon } from '../components/icons/AwesomeIcon';
import { SecondaryButton } from '../components/lib/Button';
import { CenteredError } from '../components/lib/Error';
import { CenteredLoading } from '../components/lib/Loading';
import { QuestionView } from '../components/question/Question';

const LearnPage: Component = () => {
  const navigate = useNavigate();
  const { id: paramId } = useParams();

  const [QId, setQId] = createSignal<number>(Number(paramId));
  const [qResource] = createResource(QId, async (id) => {
    const { questionService } = await import('../services/questionService');
    if (isNaN(QId())) {
      const id = await questionService.randomLearnId();
      setQId(id);
      return;
    }
    return await questionService.getQuestion(QId());
  });

  createEffect(() => {
    navigate(routesPath.learnId(QId()), { replace: true });
  });

  async function nextQuestion() {
    const { questionService } = await import('../services/questionService');
    const nextQId = await questionService.randomLearnId();
    setQId(nextQId);
  }

  return (
    <Switch>
      <Match when={qResource.error}>
        <CenteredError error={qResource.error} message="לא נמצאה שאלה" />
      </Match>
      <Match when={qResource.loading}>
        <CenteredLoading />
      </Match>
      <Match when={qResource()}>
        <QuestionView
          question={qResource()!}
          onCheck={async (check) =>
            (
              await import('../services/questionService')
            ).questionService.setQuestionCheck(QId(), check)
          }
        >
          {(status, selectedAnswer) => (
            <SecondaryButton
              onClick={nextQuestion}
              disabled={status === undefined}
            >
              <span>שאלה הבאה</span>
              <AwesomeIcon icon="fas fa-arrow-right" rtl />
            </SecondaryButton>
          )}
        </QuestionView>
      </Match>
    </Switch>
  );
};

export default LearnPage;
