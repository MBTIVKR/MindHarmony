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
//@ts-ignore
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

      let extraversionCount = 0;
      let sensingCount = 0;
      let thinkingCount = 0;
      let judgingCount = 0;

      Object.values(answers).forEach((level) => {
        switch (level) {
          case 3:
            extraversionCount++;
            sensingCount++;
            thinkingCount++;
            judgingCount++;
            break;
          case 2:
            extraversionCount += 0.5;
            sensingCount += 0.5;
            thinkingCount += 0.5;
            judgingCount += 0.5;
            break;
          case -1:
            extraversionCount -= 0.5;
            sensingCount -= 0.5;
            thinkingCount -= 0.5;
            judgingCount -= 0.5;
            break;
          case -2:
            extraversionCount--;
            sensingCount--;
            thinkingCount--;
            judgingCount--;
            break;
          default:
            break;
        }
      });

      const totalQuestions = questions.length;
      const extraversion = extraversionCount >= totalQuestions / 2 ? 'E' : 'I';
      const sensing = sensingCount >= totalQuestions / 2 ? 'S' : 'N';
      const thinking = thinkingCount >= totalQuestions / 2 ? 'T' : 'F';
      const judging = judgingCount >= totalQuestions / 2 ? 'J' : 'P';

      const personalityType = extraversion + sensing + thinking + judging;

      return { type: personalityType };
    }),
})));
