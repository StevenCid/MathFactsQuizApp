import { describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RadioButton } from '../../components/RadioButton';

/**
 * Test rendering the RadioButton component.
 * 
 * @returns {void}
 */
describe('RadioButton Component', () => {
  test('Renders checked radio button with correct label and operator', () => {
    const label = 'addition';
    const operator = '+';
    const checked = true;

    render(<RadioButton label={label} operator={operator} checked={checked} />);

    screen.getByRole('radio', { value: /addition/i });
    screen.getByLabelText('+');
    screen.getByRole('radio', { checked: true });
  });
});