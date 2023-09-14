import { collection, limit, query, where } from 'firebase/firestore';
import { db } from '../config/firestore.config';
import { QuestionCheck, QuestionModel } from '../models/questionModel';
import { appSettingsService } from './appSettingsService';
import { dbInfoService } from './dbInfoService';
import { DocNotExistError, docsCacheFirst } from './tools/firestoreTools';
import { userService } from './userService';

export class NoMoreQuestionsError extends Error {
  constructor() {
    super('No more questions');
  }
}

class QuestionService {
  protected readonly collection = collection(db, 'questions');

  async getQuestion(id: number): Promise<QuestionModel> {
    const q = query(this.collection, where('id', '==', id), limit(1));
    const docs = await docsCacheFirst(q, QuestionModel.fromFire);
    if (docs.length === 0)
      throw new DocNotExistError(this.collection, `(id == ${id})`);
    return docs[0];
  }

  async randomQuestionId(): Promise<number> {
    const info = await dbInfoService.getDBInfo();
    return Math.floor(Math.random() * info.totalQuestions);
  }
  async randomLearnId(): Promise<number> {
    const info = await dbInfoService.getDBInfo();

    let id = await this.randomQuestionId();
    if (!appSettingsService.settings.value.skipPastQuestions) return id;

    const skipSet = userService.correctQuestions;
    if (info.totalQuestions <= skipSet.size) {
      throw new NoMoreQuestionsError();
    }
    while (skipSet.has(id)) {
      id = (id + 1) % info.totalQuestions;
    }
    return id;
  }

  setQuestionCheck(id: number, check: QuestionCheck): void {
    const isCorrect = check === 'correct';
    const newSet = isCorrect
        ? userService.correctQuestions
        : userService.wrongQuestions,
      otherSet = isCorrect
        ? userService.wrongQuestions
        : userService.correctQuestions;

    const removed = otherSet.delete(id);
    if (
      !isCorrect ||
      !removed ||
      !appSettingsService.settings.value.waitForCorrectTwice
    )
      newSet.add(id);
  }
}

export const questionService = new QuestionService();
