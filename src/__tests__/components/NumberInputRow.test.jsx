import { describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NumberInputRow } from '../../components/NumberInputRow';

/**
 * Test rendering the NumberInputRow component.
 * 
 * @returns {void}
 */
describe('NumberInputRow Component', () => {
  test('Renders number input row with correct label and value', () => {
    const formLabel = 'Test Label';
    const idName = 'another-test-id';
    const min = 0;
    const max = 100;
    const value = 32;

    render(<NumberInputRow formLabel={formLabel} idName={idName} min={min} max={max} defaultValue={value} />);

    screen.getByRole('spinbutton', { id: idName, min: min.toString(), max: max.toString(), defaultValue: value.toString() });
    screen.getByLabelText(formLabel);
  });
});