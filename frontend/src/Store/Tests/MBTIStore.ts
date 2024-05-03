 //@ts-nocheck
 import { create } from 'zustand';
import { questions } from '@/Components/Features/Tests/mbti/questions';
import { devtools } from 'zustand/middleware';

interface Answer {
  [questionId: number]: number;
}

interface MBTIStore {
  answers: Answer;
  currentQuestion: number;
  type: string;
  showResult: boolean;
  handleAnswer: (questionId: number, level: number) => void;
  checkResult: () => void;
}

export const useMBTIStore = create<MBTIStore>(devtools((set) => ({
  answers: {},
  currentQuestion: 0,
  type: '',
  showResult: false,
  handleAnswer: (questionId, level) =>
    set((state) => {
      const { answers, currentQuestion } = state;
      const newAnswers = { ...answers, [questionId]: level };
      const nextQuestion = currentQuestion + 1;
      const showResult = nextQuestion >= questions.length;

      return {
        answers: newAnswers,
        currentQuestion: showResult ? currentQuestion : nextQuestion,
        showResult,
      };
    }),
  checkResult: () =>
    set((state) => {
      const { answers } = state;
      let counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

      questions.forEach((question) => {
        const answerValue = answers[question.id];
        if (answerValue !== undefined) {
          const category = question.category;
          const impact = answerValue === 3 ? 1 : answerValue === 2 ? 0.5 : answerValue === -1 ? -0.5 : answerValue === -2 ? -1 : 0;
          counts[category] += impact;
        }
      });

      const extraversion = counts['E'] - counts['I'] >= 0 ? 'E' : 'I';
      const sensing = counts['S'] - counts['N'] >= 0 ? 'S' : 'N';
      const thinking = counts['T'] - counts['F'] >= 0 ? 'T' : 'F';
      const judging = counts['J'] - counts['P'] >= 0 ? 'J' : 'P';

      const personalityType = extraversion + sensing + thinking + judging;

      return { type: personalityType };
    }),
})));


//  import { create } from 'zustand';
// import { questions } from '@/Components/Features/Tests/mbti/questions';
// import { devtools } from 'zustand/middleware';

// interface Answer {
//   [questionId: number]: number;
// }

//  export const useMBTIStore = create<MBTIStore>(devtools((set) => ({
//   answers: {},
//   currentQuestion: 0,
//   type: '',
//   showResult: false,
//   handleAnswer: (questionId, level) =>
//     set((state) => {
//       const newAnswers = { ...state.answers, [questionId]: level };
//       const nextQuestion = state.currentQuestion + 1;
//       const showResult = nextQuestion >= questions.length;

//       return {
//         answers: newAnswers,
//         currentQuestion: showResult ? state.currentQuestion : nextQuestion,
//         showResult,
//       };
//     }),
//   checkResult: () =>
//   set((state) => {
//     let counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

//     questions.forEach((question) => {
//       const answerValue = state.answers[question.id];
//       if (answerValue !== undefined) {
//         const category = question.category;
//         const impact = answerValue === 3 ? 1 : answerValue === 2 ? 0.5 : answerValue === -1 ? -0.5 : answerValue === -2 ? -1 : 0;
//         counts[category] += impact;
//       }
//     });

//     const extraversion = counts['E'] - counts['I'] >= 0 ? 'E' : 'I';
//     const sensing = counts['S'] - counts['N'] >= 0 ? 'S' : 'N';
//     const thinking = counts['T'] - counts['F'] >= 0 ? 'T' : 'F';
//     const judging = counts['J'] - counts['P'] >= 0 ? 'J' : 'P';

//     const personalityType = extraversion + sensing + thinking + judging;

//     // Важно установить showResult в true, чтобы отобразить результаты
//     return { type: personalityType, showResult: true };
//   }),

// })));
