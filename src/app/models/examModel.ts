import { QuestionModel, ShuffledAnswers } from './questionModel';

export type ExamModel = {
  questions: (ExamQuestionModel | undefined)[];
};

export class ExamQuestionModel extends QuestionModel {
  static fromQuestionModel(question: QuestionModel): ExamQuestionModel {
    return new ExamQuestionModel(
      question.docId,
      question.id,
      question.title,
      question.wrongAnswers,
      question.correctAnswer,
      question.images,
      question.carTypes,
      question.category,
      question.explanations,
    );
  }

  answer: number | undefined;
  protected shuffled = super.shuffleAnswers();
  override shuffleAnswers(): ShuffledAnswers {
    return this.shuffled;
  }
}
