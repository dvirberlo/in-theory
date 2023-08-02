import { EXAM_QUESTIONS } from '../constants/examConstants';
import { ExamModel, ExamQuestionModel } from '../models/examModel';

class ExamService {
  newExam(): ExamModel {
    const length = EXAM_QUESTIONS;

    const questions = Array.from<ExamQuestionModel | undefined>({ length });

    return { questions };
  }

  async getQuestion(exam: ExamModel, idx: number): Promise<ExamQuestionModel> {
    const { questionService } = await import('./questionService');
    if (exam.questions[idx] !== undefined) {
      return exam.questions[idx]!;
    }

    let id = await questionService.randomQuestionId();
    while (exam.questions.find((q) => q?.id === id)) {
      id = await questionService.randomQuestionId();
    }

    const question = ExamQuestionModel.fromQuestionModel(
      await questionService.getQuestion(id),
    );
    exam.questions[idx] = question;
    return question;
  }
}

export const examService = new ExamService();
