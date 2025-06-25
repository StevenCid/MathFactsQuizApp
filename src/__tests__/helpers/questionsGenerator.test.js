import { describe, expect, test } from 'vitest';
import { 
  shuffle, 
  additionGenerator, 
  subtractionGenerator, 
  multiplicationGenerator, 
  divisionGenerator,
  questionsGenerator } from '../../helpers/questionsGenerator';
import { MFT } from '../../constants/mathFactTypes';

/**
 * Test the shuffle function to ensure it randomizes an array.
 * 
 * @returns {void}
 */
describe('shuffle function', () => {
  test('Should shuffle an array', () => {
    const originalArr = [1, 2, 3, 4, 5];
    const shuffledArr = [...originalArr];
    shuffle(shuffledArr);
    expect(shuffledArr).not.toEqual(originalArr);
  });

  test('Should have no effect on an empty array', () => {
    const arr = [];
    shuffle(arr);
    expect(arr).toEqual([]);
  });

  test('Should handle single element arrays', () => {
    const arr = [1];
    shuffle(arr);
    expect(arr).toEqual([1]);
  });
});

/**
 * Setup function to create a settings object for testing.
 * @param {string} mathFactType - The type of math fact to generate questions, defined in MFT constant. 
 * @param {Object} overrides - Optional overrides for the settings object. 
 * 
 * @returns {Object} - Settings object for testing.
 */
const setupSettings = (mathFactType=MFT.ADDITION.label, overrides) => {
  return {
    mathFactType,
    practiceNumber: 1,
    minNumber: 0,
    maxNumber: 10,
    numberOfQuestions: 5,
    ...overrides
  };
};

/**
 * Test additionGenerator function to ensure it generates correct addition questions.
 * 
 * @returns {void}
 */
describe('additionGenerator function', () => {
  test('Should generate correct addition questions', () => {
    const settings = setupSettings(MFT.ADDITION.label);
    const questions = additionGenerator(settings.practiceNumber, settings.minNumber, settings.maxNumber, settings.numberOfQuestions);
    
    expect(questions.length).toBe(settings.numberOfQuestions);
    questions.forEach(question => {
      expect(question.leftOperand + question.rightOperand).toBe(question.correctAnswer);
      expect(question.mathOperation).toBe('+');
    });
  });

  test('Should handle minNumber and maxNumber correctly', () => {
    const settings = setupSettings(MFT.ADDITION.label);
    const questions = additionGenerator(settings.practiceNumber, settings.minNumber, settings.maxNumber, settings.numberOfQuestions);
    
    questions.forEach(question => {
      expect(question.leftOperand).toBeGreaterThanOrEqual(settings.minNumber);
      expect(question.leftOperand).toBeLessThanOrEqual(settings.maxNumber);
      expect(question.rightOperand).toBeGreaterThanOrEqual(settings.minNumber);
      expect(question.rightOperand).toBeLessThanOrEqual(settings.maxNumber);
    });
  });

  test('Should handle practiceNumber correctly', () => {
    const settings = setupSettings(MFT.ADDITION.label, { practiceNumber: 2 });
    const questions = additionGenerator(settings.practiceNumber, settings.minNumber, settings.maxNumber, settings.numberOfQuestions);
    
    questions.forEach(question => {
      expect(question.leftOperand).toBe(settings.practiceNumber);
    });
  });
});

/**
 * Test subtractionGenerator function to ensure it generates correct subtraction questions.
 * 
 * @returns {void}
 */
describe('subtractionGenerator function', () => {
  test('Should generate correct subtraction questions', () => {
    const settings = setupSettings(MFT.SUBTRACTION.label);
    const questions = subtractionGenerator(settings.practiceNumber, settings.minNumber, settings.maxNumber, settings.numberOfQuestions);
    
    expect(questions.length).toBe(settings.numberOfQuestions);
    questions.forEach(question => {
      expect(question.leftOperand - question.rightOperand).toBe(question.correctAnswer);
      expect(question.mathOperation).toBe('-');
    });
  });

  test('Should handle minNumber and maxNumber correctly', () => {
    const settings = setupSettings(MFT.SUBTRACTION.label);
    const questions = subtractionGenerator(settings.practiceNumber, settings.minNumber, settings.maxNumber, settings.numberOfQuestions);
    
    questions.forEach(question => {
      expect(question.leftOperand).toBeGreaterThanOrEqual(settings.minNumber);
      expect(question.leftOperand).toBeLessThanOrEqual(settings.maxNumber);
      expect(question.rightOperand).toBeGreaterThanOrEqual(settings.minNumber);
      expect(question.rightOperand).toBeLessThanOrEqual(settings.maxNumber);
    });
  });

  test('Should handle practiceNumber correctly', () => {
    const settings = setupSettings(MFT.SUBTRACTION.label, { practiceNumber: 5 });
    const questions = subtractionGenerator(settings.practiceNumber, settings.minNumber, settings.maxNumber, settings.numberOfQuestions);
    
    questions.forEach(question => {
      if (question.leftOperand > question.rightOperand) {
        expect(question.rightOperand).toBe(settings.practiceNumber);
      }
      else {
        expect(question.leftOperand).toBe(settings.practiceNumber);
      }
    });
  });
});

/**
 * Test multiplicationGenerator function to ensure it generates correct multiplication questions.
 * 
 * @returns {void}
 */
describe('multiplicationGenerator function', () => {
  test('Should generate correct multiplication questions', () => {
    const settings = setupSettings(MFT.MULTIPLICATION.label);
    const questions = multiplicationGenerator(settings.practiceNumber, settings.minNumber, settings.maxNumber, settings.numberOfQuestions);
    
    expect(questions.length).toBe(settings.numberOfQuestions);
    questions.forEach(question => {
      expect(question.leftOperand * question.rightOperand).toBe(question.correctAnswer);
      expect(question.mathOperation).toBe('×');
    });
  });

  test('Should handle minNumber and maxNumber correctly', () => {
    const settings = setupSettings(MFT.MULTIPLICATION.label);
    const questions = multiplicationGenerator(settings.practiceNumber, settings.minNumber, settings.maxNumber, settings.numberOfQuestions);
    
    questions.forEach(question => {
      expect(question.leftOperand).toBeGreaterThanOrEqual(settings.minNumber);
      expect(question.leftOperand).toBeLessThanOrEqual(settings.maxNumber);
      expect(question.rightOperand).toBeGreaterThanOrEqual(settings.minNumber);
      expect(question.rightOperand).toBeLessThanOrEqual(settings.maxNumber);
    });
  });

  test('Should handle practiceNumber correctly', () => {
    const settings = setupSettings(MFT.MULTIPLICATION.label, { practiceNumber: 3 });
    const questions = multiplicationGenerator(settings.practiceNumber, settings.minNumber, settings.maxNumber, settings.numberOfQuestions);
    
    questions.forEach(question => {
      expect(question.leftOperand).toBe(settings.practiceNumber);
    });
  });
});

/**
 * Test divisionGenerator function to ensure it generates correct division questions.
 * 
 * @returns {void}
 */
describe('divisionGenerator function', () => {
  test('Should generate correct division questions', () => {
    const settings = setupSettings(MFT.DIVISION.label);
    const questions = divisionGenerator(settings.practiceNumber, settings.minNumber, settings.maxNumber, settings.numberOfQuestions);
    
    expect(questions.length).toBe(settings.numberOfQuestions);
    questions.forEach(question => {
      expect(question.leftOperand / question.rightOperand).toBe(question.correctAnswer);
      expect(question.mathOperation).toBe('÷');
    });
  });

  test('Should handle minNumber and maxNumber correctly', () => {
    const settings = setupSettings(MFT.DIVISION.label);
    const questions = divisionGenerator(settings.practiceNumber, settings.minNumber, settings.maxNumber, settings.numberOfQuestions);
    
    questions.forEach(question => {
      expect(question.leftOperand).toBeGreaterThanOrEqual(settings.minNumber);
      expect(question.leftOperand).toBeLessThanOrEqual(settings.maxNumber);
      expect(question.rightOperand).toBeGreaterThanOrEqual(settings.minNumber);
      expect(question.rightOperand).toBeLessThanOrEqual(settings.maxNumber);
    });
  });

  test('Should handle practiceNumber correctly', () => {
    const settings = setupSettings(MFT.DIVISION.label, { practiceNumber: 4 });
    const questions = divisionGenerator(settings.practiceNumber, settings.minNumber, settings.maxNumber, settings.numberOfQuestions);
    
    questions.forEach(question => {
      if (settings.minNumber === 0) {
        expect(question.rightOperand).toBe(settings.practiceNumber);
      }
      else {
        expect(question.leftOperand).toBe(settings.practiceNumber * question.rightOperand);
      }
    });
  });
});

/**
 * Test questionsGenerator function to ensure it generates questions based on settings.
 * 
 * @returns {void}
 */
describe('questionsGenerator function', () => {
  test('Should generate addition questions when mathFactType is addition', () => {
    const settings = setupSettings(MFT.ADDITION.label);
    const questions = questionsGenerator(settings);
    
    expect(questions.length).toBe(settings.numberOfQuestions);
    questions.forEach(question => {
      expect(question.mathOperation).toBe('+');
      expect(question.leftOperand + question.rightOperand).toBe(question.correctAnswer);
    });
  });

  test('Should generate subtraction questions when mathFactType is subtraction', () => {
    const settings = setupSettings(MFT.SUBTRACTION.label);
    const questions = questionsGenerator(settings);
    
    expect(questions.length).toBe(settings.numberOfQuestions);
    questions.forEach(question => {
      expect(question.mathOperation).toBe('-');
      expect(question.leftOperand - question.rightOperand).toBe(question.correctAnswer);
    });
  });

  test('Should generate multiplication questions when mathFactType is multiplication', () => {
    const settings = setupSettings(MFT.MULTIPLICATION.label);
    const questions = questionsGenerator(settings);
    
    expect(questions.length).toBe(settings.numberOfQuestions);
    questions.forEach(question => {
      expect(question.mathOperation).toBe('×');
      expect(question.leftOperand * question.rightOperand).toBe(question.correctAnswer);
    });
  });

  test('Should generate division questions when mathFactType is division', () => {
    const settings = setupSettings(MFT.DIVISION.label);
    const questions = questionsGenerator(settings);
    
    expect(questions.length).toBe(settings.numberOfQuestions);
    questions.forEach(question => {
      expect(question.mathOperation).toBe('÷');
      if (settings.minNumber === 0) {
        expect(question.leftOperand / question.rightOperand).toBe(question.correctAnswer);
      }
      else {
        expect(question.leftOperand / question.rightOperand).toBeCloseTo(question.correctAnswer, 5);
      }
    });
  });

  test('Should throw an error for unsupported mathFactType', () => {
    const settings = setupSettings('unsupported');

    expect(() => questionsGenerator(settings)).toThrow('Invalid math fact type');
  });

  test('Should handle edge cases with minNumber and maxNumber as 0', () => {
    const settings = setupSettings(MFT.ADDITION.label, { minNumber: 0, maxNumber: 0 });
    const questions = questionsGenerator(settings);
    
    expect(questions.length).toBe(settings.numberOfQuestions);
    questions.forEach(question => {
      expect(question.leftOperand).toBe(settings.practiceNumber);
      expect(question.rightOperand).toBe(0);
      expect(question.correctAnswer).toBe(settings.practiceNumber);
    });
  });

  test('Should handle edge cases with practiceNumber as 0', () => {
    const settings = setupSettings(MFT.ADDITION.label, { practiceNumber: 0 });
    const questions = questionsGenerator(settings);
    
    expect(questions.length).toBe(settings.numberOfQuestions);
    questions.forEach(question => {
      expect(question.leftOperand).toBe(0);
      expect(question.rightOperand).toBeGreaterThanOrEqual(settings.minNumber);
      expect(question.rightOperand).toBeLessThanOrEqual(settings.maxNumber);
      expect(question.correctAnswer).toBe(question.rightOperand);
    });
  });

  test('Should handle edge cases with numberOfQuestions as 0', () => {
    const settings = setupSettings(MFT.ADDITION.label, { numberOfQuestions: 0 });
    const questions = questionsGenerator(settings);
    
    expect(questions.length).toBe(0);
  });
});