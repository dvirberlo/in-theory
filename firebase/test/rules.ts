import { initializeTestEnvironment } from '@firebase/rules-unit-testing';
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { readFile } from 'fs/promises';

type Question = {
  title: string;
  correctAnswer: string;
  wrongAnswers: string[];
  explanations: {
    author: string;
    text: string;
    date: number;
    upVotes: string[];
    downVotes: string[];
    votes: number;
  }[];
};

const main = async () => {
  const rules = await readFile('./firebase/firestore.rules', 'utf8');
  const firebase = JSON.parse(await readFile('./.firebaserc', 'utf8'));
  const testEnv = await initializeTestEnvironment({
    projectId: firebase.projects.default,
    firestore: { rules },
    hub: {
      host: 'localhost',
      port: 4400,
    },
  });
  const guest = testEnv.unauthenticatedContext().firestore();
  const userUid = 'testUser';
  const user = testEnv.authenticatedContext(userUid).firestore();

  //   const infoDoc = await getDoc(doc(collection(guest, "info"), "0"));
  // const infoDoc = await guest.collection("info").doc("0").get();
  //   console.log(infoDoc.exists(), infoDoc.data(), infoDoc.ref.path, infoDoc.id);

  const qDoc = doc(collection(user, 'questions'), 'hjnlUTVb1sTUaDHRIsgj');
  //   await setDoc(qDoc, {
  //     id: 1482,
  //     title:
  //       "מהי המהירות המרבית המותרת לרכב נוסעים פרטי בדרך עירונית (אם אין תמרור המורה אחרת)?",
  //     explanations: [
  //       {
  //         date: Date.now(),
  //         author: "123",
  //         upVotes: [],
  //         text: "hello world",
  //         votes: 0,
  //         downVotes: [],
  //       },
  //     ],
  //   });
  let question = (await getDoc(qDoc)).data() as Question;
  console.log(question);

  await updateDoc(
    qDoc,
    // "title",
    // `update: ${new Date()}`
    'explanations',
    // arrayRemove(question.explanations[0])
    // arrayUnion({
    //     date: Date.now(),
    //     author: userUid,
    //     upVotes: [],
    //     text: "hello world",
    //     votes: 0,
    //     downVotes: [],
    //   })
    [
      ...question.explanations.slice(0, -1),
      {
        ...question.explanations.at(-1)!,
        text: 'update: ' + new Date(),
        date: Date.now(),
      },
    ],
  );
  //   await addDoc(collection(user, "questions"), question);

  question = (await getDoc(qDoc)).data() as Question;
  console.log(question);
};

const test = async () => {
  const rules = await readFile('./firebase/firestore.rules', 'utf8');
  const firebase = JSON.parse(await readFile('./.firebaserc', 'utf8'));
  const testEnv = await initializeTestEnvironment({
    projectId: firebase.projects.default,
    firestore: { rules },
    hub: {
      host: 'localhost',
      port: 4400,
    },
  });
  const guest = testEnv.unauthenticatedContext().firestore();
  const userUid = 'testUser';
  const user = testEnv.authenticatedContext(userUid).firestore();

  const qDoc = doc(collection(user, 'questions'), 'hjnlUTVb1sTUaDHRIsgj');

  // await setDoc(qDoc, {
  //   id: 1482,
  //   title:
  //     'מהי המהירות המרבית המותרת לרכב נוסעים פרטי בדרך עירונית (אם אין תמרור המורה אחרת)?',
  //   explanations: [
  //     {
  //       date: Date.now(),
  //       author: '123',
  //       upVotes: [],
  //       text: 'hello world',
  //       votes: 0,
  //       downVotes: [],
  //     },
  //   ],
  // });
  // return;

  const question = (await getDoc(qDoc)).data() as Question;
  const originalExplanations = question.explanations;

  const updatedExplanations = structuredClone(originalExplanations);
  const index = 0,
    factor = 1,
    // factor = -1,
    voteArr = 'upVotes';
  // updatedExplanations[index][voteArr].push(userUid);
  updatedExplanations[index][voteArr] = [];
  updatedExplanations[index].votes += factor;

  console.log(originalExplanations);
  console.log(updatedExplanations);

  await updateDoc(
    qDoc,
    'explanations',
    updatedExplanations,
    // {
    //   // ...question,
    //   explanations: updatedExplanations,
    //   // [`explanations.${index}.${voteArr}`]: arrayUnion(userUid),
    //   // [`explanations.${index}.votes`]: updatedExplanations[0].votes,
    // }
  );
};

// main();
test();
