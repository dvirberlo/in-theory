import { dbInfoService } from './dbInfoService';
import { PersistentSet } from './tools/persistance';

class UserService {
  readonly correctQuestions = new PersistentSet<number>(
    'questionsDone',
    new Set(),
  );
  readonly wrongQuestions = new PersistentSet<number>(
    'questionsFailed',
    new Set(),
  );

  async getQuestionsProgress(): Promise<{
    correct: number;
    wrong: number;
    total: number;
  }> {
    const info = await dbInfoService.getDBInfo();
    return {
      correct: this.correctQuestions.value.size,
      wrong: this.wrongQuestions.value.size,
      total: info.totalQuestions,
    };
  }
}

export const userService = new UserService();
