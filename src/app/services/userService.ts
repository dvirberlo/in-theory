import { dbInfoService } from './dbInfoService';
import { PersistentSet } from './tools/persistance';

class UserService {
  readonly questionsDone = new PersistentSet<number>(
    'questionsDone',
    new Set(),
  );
  readonly questionsFailed = new PersistentSet<number>(
    'questionsFailed',
    new Set(),
  );

  async getQuestionsProgress(): Promise<{
    done: number;
    failed: number;
    total: number;
  }> {
    const info = await dbInfoService.getDBInfo();
    return {
      done: this.questionsDone.value.size,
      failed: this.questionsFailed.value.size,
      total: info.totalQuestions,
    };
  }
}

export const userService = new UserService();
