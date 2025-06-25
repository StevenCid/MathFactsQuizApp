import { describe, expect, test } from 'vitest';
import { mathFact, MFT } from '../../constants/mathFactTypes';

/**
 * Test mathFact factory function returns correct object structure.
 * 
 * @returns {void}
 */
test('mathFact factory returns correct object structure', () => {
  const result = mathFact('test', '*');
  expect(result).toEqual({ label: 'test', operator: '*' });
});

/**
 * Test MFT is an object with correct properties.
 * 
 * @returns {void}
 */
describe('MFT contains correct math fact types and is deeply frozen', () => {
  test('MFT contains correct math fact types', () => {
    expect(MFT).toEqual({
      ADDITION: { label: 'addition', operator: '+' },
      SUBTRACTION: { label: 'subtraction', operator: '-' },
      MULTIPLICATION: { label: 'multiplication', operator: '×' },
      DIVISION: { label: 'division', operator: '÷' },
    });
  });

  test('MFT is frozen', () => {
    expect(Object.isFrozen(MFT)).toBe(true);
  });

  test('Each math fact type is frozen', () => {
    Object.values(MFT).forEach(type => {
      expect(Object.isFrozen(type)).toBe(true);
    });
  });
});

/**
 * Test that MFT properties cannot be changed, added, or deleted.
 * 
 * @returns {void}
 */
describe('MFT properties cannot be changed', () => {
  test('Attempt to change an existing property', () => {
    expect(() => {
      'use strict';
      MFT.ADDITION.label = 'ChangedAddition';
    }).toThrow(TypeError);
  });

  test('Attempt to add a new property', () => {
    expect(() => {
      'use strict';
      MFT.NEWTYPE = { label: 'new', operator: '%' };
    }).toThrow(TypeError);
  });

  test('Attempt to delete a property', () => {
    expect(() => {
      'use strict';
      delete MFT.SUBTRACTION;
    }).toThrow(TypeError);
  });
});
