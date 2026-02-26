export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const constitutionQuiz: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Which Article of the Constitution guarantees the "Right to Education"?',
    options: ['Article 14', 'Article 21A', 'Article 19', 'Article 51A'],
    correctAnswer: 1,
    explanation: 'Article 21A states that the State shall provide free and compulsory education to all children of the age of six to fourteen years.'
  },
  {
    id: 'q2',
    question: '"Equality before Law" is mentioned in which Article?',
    options: ['Article 21', 'Article 51A', 'Article 14', 'Article 19'],
    correctAnswer: 2,
    explanation: 'Article 14 ensures that every person is equal before the law and has equal protection of the laws.'
  },
  {
    id: 'q3',
    question: 'Which of these is a Fundamental Duty?',
    options: ['Right to vote', 'Respecting the National Flag', 'Right to work', 'Right to property'],
    correctAnswer: 1,
    explanation: 'Article 51A lists respecting the National Flag and National Anthem as a fundamental duty of every citizen.'
  }
];
