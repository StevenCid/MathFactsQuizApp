import { describe, test, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { Quiz } from '../../components/Quiz';

const defaultSettings = {
  mathFactType: 'addition',
  practiceNumber: 1,
  minNumber: 0,
  maxNumber: 10,
  numberOfQuestions: 3,
  timedQuiz: false,
  timeInMinutes: 0,
  timeInSeconds: 0,
};

afterEach(() => {
  cleanup();
});

/**
 * Test rendering the Quiz component.
 * 
 * @returns {void}
 */
describe('Quiz Component', () => {
  test('Renders the first question and input', () => {
    render(
      <Quiz
        settings={defaultSettings}
        setQuizResults={() => {}}
        changeScreen={() => {}}
      />
    );

    const input = screen.getByRole('spinbutton');
    expect(input).not.toBeNull();
    expect(input.id).toBe('answer');

    const button = screen.getByRole('button', { name: /Check Answer/i });
    expect(button).not.toBeNull();
  });

  test('Advances to next question on correct answer', async () => {
    render(
      <Quiz
        settings={defaultSettings}
        setQuizResults={() => {}}
        changeScreen={() => {}}
      />
    );

    // Answer the first question
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: 1 } });
    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));

    // Wait for the label for the second question to appear
    await waitFor(() => {
      expect(screen.getByLabelText(/2\./i)).not.toBeNull();
    });
  });

  test('Calls setQuizResults and changeScreen after last question', () => {
    const setQuizResults = vi.fn();
    const changeScreen = vi.fn();

    render(
      <Quiz
        settings={defaultSettings}
        setQuizResults={setQuizResults}
        changeScreen={changeScreen}
      />
    );

    // Answer all questions in order
    let input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: 2 } });
    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));

    input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: 4 } });
    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));

    input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: 5 } });
    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));

    expect(setQuizResults).toHaveBeenCalled();
    expect(changeScreen).toHaveBeenCalled();
  });

  test('Renders QuizTimer if timedQuiz is true', () => {
    render(
      <Quiz
        settings={{ ...defaultSettings, timedQuiz: true, timeInMinutes: 0, timeInSeconds: 10 }}
        setQuizResults={() => {}}
        changeScreen={() => {}}
      />
    );
    expect(screen.getByText('00:10')).not.toBeNull();
  });
});