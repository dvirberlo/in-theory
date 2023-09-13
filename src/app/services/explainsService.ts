import { getAuth } from 'firebase/auth';
import {
  DocumentData,
  DocumentReference,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firestore.config';
import { VoteType } from '../models/explainsModel';
import { Explanation, QuestionModel } from '../models/questionModel';
import { dbInfoService } from './dbInfoService';

class ExplainsService {
  protected readonly collection = collection(db, 'questions');

  async addExplanation(question: QuestionModel, text: string): Promise<void> {
    const user = getAuth().currentUser;
    if (user === null) return;
    const newExplanation: Explanation = {
      author: user.uid,
      text,
      date: Date.now(),
      upVotes: [],
      downVotes: [],
      votes: 0,
    };
    const qDoc = doc(this.collection, question.docId);
    if (
      question?.explanations?.length ==
      (await dbInfoService.getDBInfo()).maxExplanations
    ) {
      await updateDoc(
        qDoc,
        'explanations',
        arrayRemove(question.explanations[0]),
      );
    }
    await updateDoc(qDoc, 'explanations', arrayUnion(newExplanation));
  }

  async voteExplanation(
    question: QuestionModel,
    voteType: VoteType,
  ): Promise<boolean> {
    console.log('voteExplanation', question, voteType);
    try {
      const user = getAuth().currentUser;
      if (user === null) return false;

      const { index, option } = voteType;

      const explanation = question?.explanations?.[index];
      if (explanation === undefined) return false;

      const qDoc = doc(this.collection, question.docId);

      switch (option) {
        case 'cancel':
          await this.cancelVoteReq(question, qDoc);
          break;
        case 'vote':
          await this.voteReq(question, qDoc);
          break;
        case 'switch':
          // Unfortunately, the rules do not allow to switch votes with one request
          await this.cancelVoteReq(question, qDoc);
          await this.voteReq(question, qDoc);
          break;
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  protected async cancelVoteReq(
    question: QuestionModel,
    qDoc: DocumentReference<DocumentData>,
  ) {
    await updateDoc(qDoc, 'explanations', question.explanations);
  }
  protected async voteReq(
    question: QuestionModel,
    qDoc: DocumentReference<DocumentData>,
  ) {
    await updateDoc(qDoc, 'explanations', question.explanations);
  }
}

export const explainsService = new ExplainsService();
