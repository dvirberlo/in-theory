import { batch } from 'solid-js';
import { SetStoreFunction, createStore } from 'solid-js/store';
import { userAccessor } from '../services/authService';
import { Explanation, Question, VotesArrayKeys } from './questionModel';

type Explains = Explanation[];

export type VoteType = {
  option: VoteOption;
  up: boolean;
  index: number;
};

export type VoteOption = 'vote' | 'cancel' | 'switch';

export class ExplainsModel {
  public sorted$: Explains;
  protected setSorted: SetStoreFunction<Explains>;
  constructor(protected original: Explains = []) {
    const sorted = [...original].sort((a, b) => b.votes - a.votes);
    [this.sorted$, this.setSorted] = createStore(sorted);
  }

  static fromQuestion(question: Question): ExplainsModel {
    return new ExplainsModel(question.explanations);
  }

  isPressed(index: number): readonly [up: boolean, down: boolean] {
    const explanation = this.sorted$[index];
    const user = userAccessor();
    return [
      !!user && explanation.upVotes.includes(user.uid),
      !!user && explanation.downVotes.includes(user.uid),
    ];
  }

  getOriginalIndex(index: number): number {
    const explanation = this.sorted$[index];
    return (
      this.original.findIndex(
        (original) => original.date === explanation.date,
      ) ?? index
    );
  }

  async getVoteType(up: boolean, index: number): Promise<VoteType> {
    const user = userAccessor();

    const originalIndex = this.getOriginalIndex(index);

    const explanation = this.sorted$[index];
    const voteArr = up ? 'upVotes' : 'downVotes';
    const otherArr = up ? 'downVotes' : 'upVotes';
    const vote = explanation[voteArr];
    const other = explanation[otherArr];

    if (user && vote.includes(user.uid)) {
      return { option: 'cancel', up, index: originalIndex };
    }
    if (user && other.includes(user.uid)) {
      return { option: 'switch', up, index: originalIndex };
    }
    return { option: 'vote', up, index: originalIndex };
  }

  async vote(up: boolean, index: number): Promise<VoteType | undefined> {
    const user = userAccessor();
    if (!user) return;

    const voteType = await this.getVoteType(up, index);
    const voteOption = voteType.option;

    const voteArr: VotesArrayKeys = up ? 'upVotes' : 'downVotes';
    const otherArr: VotesArrayKeys = up ? 'downVotes' : 'upVotes';

    const factor = up ? 1 : -1;

    switch (voteOption) {
      case 'cancel':
        batch(() => {
          this.setSorted(index, voteArr, (arr) =>
            arr.filter((uid) => uid !== user.uid),
          );
          this.setSorted(index, 'votes', (count) => count - factor);
        });
        break;

      case 'vote':
        batch(() => {
          this.setSorted(index, voteArr, [
            ...this.sorted$[index][voteArr],
            user.uid,
          ]);
          this.setSorted(index, 'votes', (count) => count + factor);
        });
        break;

      case 'switch':
        batch(() => {
          this.setSorted(index, voteArr, [
            ...this.sorted$[index][voteArr],
            user.uid,
          ]);
          this.setSorted(index, otherArr, (arr) =>
            arr.filter((uid) => uid !== user.uid),
          );
          this.setSorted(index, 'votes', (count) => count + 2 * factor);
        });
        break;
    }
    return voteType;
  }
}
