import {
  DocumentData,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  SetOptions,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore';
import { FireCheck, FromFire, ToFire } from './firestoreTypesTools';

export type Image = {
  id: string;
  alt?: string;
};

export type Question = {
  id: number;
  title: string;
  wrongAnswers: string[];
  correctAnswer: string;
  images: Image[];
  carTypes: string[];
  category: string;
  explanations?: Explanation[];
};

export type Explanation = {
  author: string;
  text: string;
  date: number;
  upVotes: string[];
  downVotes: string[];
  votes: number;
};

export type ShuffledAnswers = {
  answers: string[];
  correctAnswerIndex: number;
};

export class QuestionModel implements Question {
  constructor(
    public docId: string,
    public id: number,
    public title: string,
    public wrongAnswers: string[],
    public correctAnswer: string,
    public images: Image[],
    public carTypes: string[],
    public category: string,
    public explanations?: Explanation[],
  ) {}
  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions | undefined,
  ): QuestionModel {
    throw new Error('Method not implemented.');
  }

  static fromFire: FromFire<QuestionModel> = function (
    snapshot,
    options,
  ): QuestionModel {
    const data = snapshot.data(options);
    const check = new FireCheck<Question>(data);
    return new QuestionModel(
      snapshot.id,

      check.num('id'),
      check.str('title'),
      check.strArr('wrongAnswers'),
      check.str('correctAnswer'),
      check.objArr<Image>('images', (check) => ({
        id: check.str('id'),
        alt: check.str('alt'),
      })),
      check.strArr('carTypes'),
      check.str('category'),

      data.explanations === undefined
        ? undefined
        : check.objArr<Explanation>('explanations', (check) => ({
            author: check.str('author'),
            text: check.str('text'),
            date: check.num('date'),
            upVotes: check.strArr('upVotes'),
            downVotes: check.strArr('downVotes'),
            votes: check.num('votes'),
          })),
    );
  };
  toFire: ToFire<typeof this> = function (
    modelObject:
      | WithFieldValue<QuestionModel>
      | PartialWithFieldValue<QuestionModel>,
    options?: SetOptions,
  ): DocumentData {
    return modelObject ?? {};
  };

  shuffleAnswers(): ShuffledAnswers {
    const allAnswers = [...this.wrongAnswers, this.correctAnswer];
    const answers = allAnswers.sort(() => Math.random() - 0.5);
    const correctAnswerIndex = answers.findIndex(
      (answer) => answer === this.correctAnswer,
    );

    return {
      answers,
      correctAnswerIndex,
    };
  }
}

// export type VotesArrayKeys = KeysWithArrayValues<Explanation, string>;
export type VotesArrayKeys = 'upVotes' | 'downVotes';

export type QuestionCheck = 'correct' | 'wrong';
