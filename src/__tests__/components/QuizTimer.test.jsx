import { describe, test, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { QuizTimer } from '../../components/QuizTimer';

const setupSettings = {
  mathFactType: 'addition',
  practiceNumber: 1,
  minNumber: 0,
  maxNumber: 100,
  numberOfQuestions: 20,
  timedQuiz: true,
  timeInMinutes: 1,
  timeInSeconds: 30
};

const dummyQuestions = [
  { leftOperand: 1, rightOperand: 0, mathOperation: '+', correctAnswer: 1, answerSelected: null, isCorrect: null },
  { leftOperand: 1, rightOperand: 1, mathOperation: '+', correctAnswer: 2, answerSelected: null, isCorrect: null },
  { leftOperand: 1, rightOperand: 2, mathOperation: '+', correctAnswer: 3, answerSelected: null, isCorrect: null }
];

afterEach(() => {
  cleanup();
});

/**
 * Test rendering the QuizTimer component.
 * 
 * @returns {void}
 */
describe('QuizTimer Component', () => {
  test('Renders timer with correct initial time', () => {
    render(
      <QuizTimer
        settings={setupSettings}
        questions={dummyQuestions}
        setQuizResults={() => {}}
        changeScreen={() => {}}
      />
    );

    const timer = screen.getByText('01:30');
    expect(timer).not.toBeNull();
  });

  test('Does not render timer if timedQuiz is false', () => {
    render(
      <QuizTimer
        settings={{ ...setupSettings, timedQuiz: false }}
        questions={dummyQuestions}
        setQuizResults={() => {}}
        changeScreen={() => {}}
      />
    );
    // If the timer is not rendered, queryByText returns null
    expect(screen.queryByText('01:30')).toBeNull();
  });
});