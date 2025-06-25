import { describe, test, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { QuizResults } from '../../components/QuizResults';

const quizResults = [
  {
    leftOperand: 1,
    rightOperand: 2,
    mathOperation: '+',
    correctAnswer: 3,
    answerSelected: 3,
    isCorrect: true,
  },
  {
    leftOperand: 4,
    rightOperand: 2,
    mathOperation: '-',
    correctAnswer: 2,
    answerSelected: 5,
    isCorrect: false,
  },
  {
    leftOperand: 2,
    rightOperand: 3,
    mathOperation: '+',
    correctAnswer: 5,
    answerSelected: 5,
    isCorrect: true,
  },
];

afterEach(() => {
  cleanup();
});

/**
 * Test rendering the QuizResults component.
 * 
 * @returns {void}
 */
describe('QuizResults Component', () => {
  test('Renders total score correctly', () => {
    render(<QuizResults quizResults={quizResults} />);
    expect(screen.getByText('Total Score: 2/3')).not.toBeNull();
  });

  test('Renders a list item for each question', () => {
    render(<QuizResults quizResults={quizResults} />);
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(3);
  });
});