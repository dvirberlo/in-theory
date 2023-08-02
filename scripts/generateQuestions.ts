import { writeFile } from 'fs/promises';

import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { JSDOM } from 'jsdom';
import { Image, Question } from '../src/app/models/questionModel';
import { clearLineAndWrite } from './shared';

const questionCollectionName = 'questions';
const infoCollectionName = 'info';
const fireInit = () => {
  console.log('initializing firebase...');
  process.env.GOOGLE_APPLICATION_CREDENTIALS =
    'C:\\Users\\Dvir\\Documents\\dvirberlo\\account\\in-theory-72f45-d7f70ac84a1d.json';
  const app = initializeApp();
  const db = getFirestore(app);
  return db;
};

const main = async () => {
  const startTime = Date.now();

  // Note: this script assume the questions collection is empty
  const db = fireInit();
  const qCollection = db.collection(questionCollectionName);

  let counter = 0;
  let totalResults: number | undefined;
  console.log('generating questions...');
  try {
    while (totalResults === undefined || counter < totalResults) {
      const data = await QuestionFetcher.getData(
        QuestionFetcher.reqInit(counter)
      );
      const questions = data?.Results;
      if (questions === undefined) throw new Error('could not get questions');

      totalResults ??= data?.TotalResults;
      if (totalResults === undefined)
        throw new Error('could not get totalResults');

      // for (const qRes of questions) {
      //   const question = await QuestionExtractor.extractQuestion(qRes, counter);
      //   await qCollection.add(question);
      //   counter++;
      //   clearLineAndWrite(
      //     `generated and uploaded ${counter}/${totalResults} questions (${Math.round(
      //       (counter / totalResults) * 100
      //     )}%)`
      //   );
      // }
      await Promise.all(
        questions.map(async (qRes) => {
          const question = await QuestionExtractor.extractQuestion(
            qRes,
            counter
          );
          await qCollection.add(question);
          counter++;
          clearLineAndWrite(
            `generated and uploaded #${counter} of ${totalResults!} questions (~${Math.round(
              (counter / totalResults!) * 100
            )}%)`
          );
        })
      );
    }
    clearLineAndWrite(
      `generated and uploaded ${counter}/${totalResults} questions (${Math.round(
        (counter / totalResults) * 100
      )}%)\n`
    );
    const endTime = Date.now();
    console.log(
      `finished generating questions in ${Math.round(
        (endTime - startTime) / 1000
      )} seconds`
    );
  } catch (cause) {
    throw new Error(`could not get question ${counter}}`, { cause });
  }
};

const mainInfo = async () => {
  const db = fireInit();
  const qCollection = db.collection(questionCollectionName);

  const iCollection = db.collection(infoCollectionName);
  await iCollection
    .doc('0')
    .update({ lastUpdate: Date.now(), totalQuestions: 1802 });
};

const mainVotes = async () => {
  const db = fireInit();
  const qCollection = db.collection(questionCollectionName);

  await Promise.all(
    (
      await qCollection.listDocuments()
    ).map(async (doc) => {
      console.log('updating doc', doc.id);
      await doc.update({
        explanations: [],
        votes: 0,
        upVotes: [],
        downVotes: [],
      });
      console.log('doc updated', doc.id);
    })
  );
};

module QuestionFetcher {
  export type ServerResponse = {
    Results: ServerResult[];
    TotalResults: number;
  };
  export type ServerResult = {
    Data: {
      title2: string;
      description4: {
        DescriptionHtmlString: string;
        DescriptionBlankTextString: string;
      };
      category: string;
      totalresults: number;
    };
    Description: string | null;
    UrlName: string | null;
  };

  export const reqInit = (from = 0) => ({
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: `{"DynamicTemplateID":"7055a989-b7dc-47af-a1bb-a8194858a432","QueryFilters":{"skip":{"Query":"0"}},"From":"${from}"}`,
    method: 'POST',
  });

  export const getData = async (
    init?: RequestInit | undefined
  ): Promise<ServerResponse> => {
    const res = await fetch(
      'https://www.gov.il/he/api/DataGovProxy/GetDGResults',
      init
    );
    const data = await res.json();
    return data as ServerResponse;
  };
}

module QuestionExtractor {
  export async function extractQuestion(
    serverResult: QuestionFetcher.ServerResult,
    id: number
  ): Promise<Question> {
    const questionHtml = serverResult.Data.description4?.DescriptionHtmlString;
    if (questionHtml === undefined)
      throw new Error('could not get questionHtml');
    const dom = new JSDOM(questionHtml);
    const { wrongAnswers, correctAnswer } = extractAnswers(dom);
    const images = await extractImages(dom, id);
    const carTypes = extractCarTypes(dom);
    const title = serverResult.Data.title2
      .slice(serverResult.Data.title2.indexOf('.') + 1)
      .trim();
    const questionData: Question = {
      id,
      title,
      wrongAnswers,
      correctAnswer,
      images,
      carTypes,
      category: serverResult.Data.category,
    };
    return questionData;
  }

  function extractAnswers(dom: JSDOM): {
    wrongAnswers: string[];
    correctAnswer: string;
  } {
    const answersElements = dom.window.document.querySelectorAll('ul li span');
    let correctAnswer: string | undefined;
    const wrongAnswers: string[] = [];
    answersElements.forEach((elem, index) => {
      const answer = elem.textContent?.trim();
      if (answer === undefined) throw new Error('could not get answer');
      if (elem.id.startsWith('correct')) correctAnswer = answer;
      else wrongAnswers.push(answer);
    });
    if (correctAnswer === undefined)
      throw new Error('could not get correct answer');
    return { wrongAnswers, correctAnswer };
  }

  const defaultImageExtension = 'png';
  async function extractImages(dom: JSDOM, qId: number): Promise<Image[]> {
    const imagesElements = dom.window.document.querySelectorAll('img');
    const images: Image[] = [];
    const sources: string[] = [];
    imagesElements.forEach((elem, index) => {
      const src = elem.src;
      if (!src) return;
      const alt = elem.alt;
      const id = `${qId}_${index}_${
        src.slice(src.lastIndexOf('.')) || defaultImageExtension
      }`;
      images.push({ id, alt });
      sources.push(src);
    });
    return (
      await Promise.all(
        images.map((image, index) => downloadImage(image, sources[index]))
      )
    ).filter((image) => image !== undefined) as Image[];
  }

  const imagesDir = './public/images/questions';
  async function downloadImage(
    image: Image,
    src: string
  ): Promise<Image | undefined> {
    let res: Response | undefined;
    try {
      res = await fetch(src);
    } catch (cause) {
      return undefined;
    }
    try {
      const { id, alt } = image;
      const buffer = await res.arrayBuffer();
      const imageBuffer = Buffer.from(buffer);
      await writeFile(`${imagesDir}/${id}`, imageBuffer);
      return { id, alt };
    } catch (cause) {
      throw new Error(`could not download image ${image.id} from ${src}`, {
        cause,
      });
    }
  }

  function extractCarTypes(dom: JSDOM): string[] {
    const potentialTypesElements =
      dom.window.document.querySelectorAll('div span');
    let types: string[] | undefined;
    potentialTypesElements.forEach((elem, index) => {
      const content = elem.textContent?.trim();
      if (content === undefined || !content.includes('|')) return;
      types = content
        .split('|')
        .map((type) => type.replace(/[^a-zA-Z0-9]/g, '').trim())
        .filter((type) => type.length > 0);
    });
    if (types === undefined) throw new Error('could not get types');
    return types;
  }
}

main();
