import { describe, test, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { QuizSettings } from '../../components/QuizSettings';

const defaultSettings = {
  mathFactType: 'addition',
  practiceNumber: 1,
  minNumber: 0,
  maxNumber: 10,
  numberOfQuestions: 5,
  timedQuiz: false,
  timeInMinutes: 0,
  timeInSeconds: 0,
};

afterEach(() => {
  cleanup();
});

/**
 * Test rendering the QuizSettings component.
 * 
 * @returns {void}
 */
describe('QuizSettings Component', () => {
  test('Renders math fact radio buttons and input fields', () => {
    render(
      <QuizSettings
        settings={defaultSettings}
        setSettings={() => {}}
        changeScreen={() => {}}
      />
    );
    
    // Math fact radio buttons
    expect(screen.getByLabelText(/addition/i)).not.toBeNull();
    expect(screen.getByLabelText(/subtraction/i)).not.toBeNull();
    expect(screen.getByLabelText(/multiplication/i)).not.toBeNull();
    expect(screen.getByLabelText(/division/i)).not.toBeNull();

    // Number input fields
    expect(screen.getByLabelText(/Number to practice/i)).not.toBeNull();
    expect(screen.getByLabelText(/Minimum/i)).not.toBeNull();
    expect(screen.getByLabelText(/Maximum/i)).not.toBeNull();
    expect(screen.getByLabelText(/Number of questions/i)).not.toBeNull();
  });

  test('Renders timed quiz fields when timedQuiz is true', () => {
    render(
      <QuizSettings
        settings={{ ...defaultSettings, timedQuiz: true, timeInMinutes: 2, timeInSeconds: 15 }}
        setSettings={() => {}}
        changeScreen={() => {}}
      />
    );
    expect(screen.getByLabelText(/Minutes/i)).not.toBeNull();
    expect(screen.getByLabelText(/Seconds/i)).not.toBeNull();
  });

  test('Calls setSettings and changeScreen on valid form submit', () => {
    const setSettings = vi.fn();
    const changeScreen = vi.fn();

    render(
      <QuizSettings
        settings={defaultSettings}
        setSettings={setSettings}
        changeScreen={changeScreen}
      />
    );

    // Fill out form and submit
    fireEvent.change(screen.getByLabelText(/Number to practice/i), { target: { value: 3 } });
    fireEvent.change(screen.getByLabelText(/Minimum/i), { target: { value: 2 } });
    fireEvent.change(screen.getByLabelText(/Maximum/i), { target: { value: 5 } });
    fireEvent.change(screen.getByLabelText(/Number of questions/i), { target: { value: 4 } });

    fireEvent.click(screen.getByRole('button', { name: /Start Quiz/i }));

    expect(setSettings).toHaveBeenCalled();
    expect(changeScreen).toHaveBeenCalled();
  });
});