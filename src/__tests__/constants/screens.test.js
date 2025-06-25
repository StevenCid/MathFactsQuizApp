import { describe, expect, test } from 'vitest';
import { SCREENS } from '../../constants/screens';

/**
 * Test SCREENS Enum contains the correct key/value pairs.
 * 
 * @returns {void}
 */
test('SCREENS Enum contain correct key/value pairs', () => {
  expect(SCREENS).toEqual({
    QUIZ_SETTINGS: 'QuizSettings',
    QUIZ: 'Quiz',
    QUIZ_RESULTS: 'QuizResults',
  });
});

/**
 * Test that SCREENS is frozen (Object.freeze()).
 * Properties cannot be changed, added, or deleted.
 * 
 * @returns {void}
 */
describe('SCREENS properties cannot be changed', () => {
  test('Verify that the object is frozen', () => {
    expect(Object.isFrozen(SCREENS)).toBe(true);
  });
  
  test('Attempt to change an existing property', () => {
    expect(() => {
      'use strict';
      SCREENS.QUIZ = 'ChangedQuiz';
    }).toThrow(TypeError);
  });

  test('Attempt to add a new property', () => {
    expect(() => {
      'use strict';
      SCREENS.NEWSCREEN = 'NewScreen';
    }
    ).toThrow(TypeError);
  });

  test('Attempt to delete a property', () => {
    expect(() => {
      'use strict';
      delete SCREENS.QUIZ_SETTINGS;
    }).toThrow(TypeError);
  });
});