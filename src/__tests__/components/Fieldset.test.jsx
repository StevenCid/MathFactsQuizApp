import { describe, test, afterEach } from 'vitest';
import { render, screen, within, cleanup } from '@testing-library/react';
import { Fieldset } from '../../components/Fieldset';

afterEach(() => {
  cleanup();
});

/**
 * Test rendering the Fieldset component.
 * 
 * @returns {void}
 */
describe('Fieldset Component', () => {
  test('Renders fieldset with correct legend and children', () => {
    const legendLabel = 'Test Legend';
    const children = <div>Child Content</div>;

    render(<Fieldset legendLabel={legendLabel}>{children}</Fieldset>);

    const fieldset = screen.getByRole('group');
    within(fieldset).getByText(legendLabel);
    within(fieldset).getByText('Child Content');
  });

  test('Renders fieldset with no children', () => {
    const legendLabel = 'Empty Fieldset';

    render(<Fieldset legendLabel={legendLabel} />);

    const fieldset = screen.getByRole('group');
    within(fieldset).getByText(legendLabel);
  });
});