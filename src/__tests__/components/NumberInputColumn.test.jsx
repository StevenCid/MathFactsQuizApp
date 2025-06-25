import { describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NumberInputColumn } from '../../components/NumberInputColumn';

/**
 * Test rendering the NumberInputColumn component.
 * 
 * @returns {void}
 */
describe('NumberInputColumn Component', () => {
  test('Renders number input column with correct label and value', () => {
    const formLabel = 'Test Label';
    const idName = 'test-id';
    const min = 0;
    const max = 100;
    const value = 42;

    render(<NumberInputColumn formLabel={formLabel} idName={idName} min={min} max={max} defaultvalue={value} />);

    screen.getByRole('spinbutton', { id: idName, min: min.toString(), max: max.toString(), defaultValue: value.toString() });
    screen.getByLabelText(formLabel);

  });
});