import { describe, test, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';

afterEach(() => {
  cleanup();
});

/**
 * Test rendering the App component and its transitions.
 * 
 * @returns {void}
 */
describe('App Component', () => {
  test('Renders Quiz Settings screen by default', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Math Facts Quiz App/i })).not.toBeNull();
    expect(screen.getByRole('heading', { name: /Quiz Settings/i })).not.toBeNull();
    expect(screen.getByLabelText(/Number to practice/i)).not.toBeNull();
  });

  test('Transitions to Quiz screen when settings are submitted', () => {
    render(<App />);
    // Fill out required fields if needed, then submit
    fireEvent.click(screen.getByRole('button', { name: /Start Quiz/i }));
    expect(screen.getByRole('heading', { level: 2, name: /Quiz|Timed Quiz/i })).not.toBeNull();
    expect(screen.getByRole('spinbutton')).not.toBeNull();
  });

  test('Transitions to Quiz Results screen after quiz is completed', () => {
    render(<App />);
    // Start quiz
    fireEvent.click(screen.getByRole('button', { name: /Start Quiz/i }));
    // Answer all questions (simulate 20 for default)
    for (let i = 0; i < 20; i++) {
      const input = screen.getByRole('spinbutton');
      fireEvent.change(input, { target: { value: 0 } });
      fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
    }
    expect(screen.getByRole('heading', { name: /Quiz Results/i })).not.toBeNull();
    expect(screen.getByText(/Total Score:/i)).not.toBeNull();
  });

  test('Transitions back to Quiz Settings when "Quiz Again?" is clicked', () => {
    render(<App />);
    // Start quiz
    fireEvent.click(screen.getByRole('button', { name: /Start Quiz/i }));
    // Complete quiz
    for (let i = 0; i < 20; i++) {
      const input = screen.getByRole('spinbutton');
      fireEvent.change(input, { target: { value: 0 } });
      fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
    }
    // Click "Quiz Again?"
    fireEvent.click(screen.getByRole('button', { name: /Quiz Again\?/i }));
    expect(screen.getByRole('heading', { name: /Quiz Settings/i })).not.toBeNull();
  });
});