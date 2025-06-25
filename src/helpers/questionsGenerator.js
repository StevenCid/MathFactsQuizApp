/**
 * Uses the Fisher-Yates algorithm to shuffle an array in place.
 * @see https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 * @param {Array} array
 * 
 * @returns {void} 
 */
export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Generates an array of addition questions based on the provided parameters.
 * @param {number} practiceNumber - The number to practice with.
 * @param {number} minNumber - The minimum number that can be used in the questions.
 * @param {number} maxNumber - The maximum number that can be used in the questions.
 * @param {number} numberOfQuestions - The number of questions to generate.
 * 
 * @returns {Array} additionQuestions - An array of addition question objects.
 */
export const additionGenerator = (practiceNumber, minNumber, maxNumber, numberOfQuestions) => {
  const additionQuestions = [];
  const leftOperand = practiceNumber;
  const lowerBound = minNumber;
  
  for (let i = 0; i < numberOfQuestions; i++) {
    let rightOperand = minNumber;
    let correctAnswer = leftOperand + rightOperand;

    additionQuestions.push({
      leftOperand,
      rightOperand,
      mathOperation: '+',
      correctAnswer,
      answerSelected: null,
      isCorrect: null,
    });

    minNumber = (minNumber < maxNumber) ? minNumber + 1 : lowerBound;
  }
  return additionQuestions;
}

/**
 * Generates an array of subtraction questions based on the provided parameters.
 * The logic is set to avoid negative results by ensuring the left operand is always greater than or equal to the right operand.
 * @param {number} practiceNumber - The number to practice with.
 * @param {number} minNumber - The minimum number that can be used in the questions.
 * @param {number} maxNumber - The maximum number that can be used in the questions.
 * @param {number} numberOfQuestions - The number of questions to generate.
 * 
 * @returns {Array} subtractionQuestions - An array of subtraction question objects.
 */
export const subtractionGenerator = (practiceNumber, minNumber, maxNumber, numberOfQuestions) => {
  const subtractionQuestions = [];
  const rightOperand = practiceNumber;
  const lowerBound = minNumber;

  for (let i = 0; i < numberOfQuestions; i++) {
    let leftOperand = (minNumber < practiceNumber) ? practiceNumber + minNumber : minNumber;
    let correctAnswer = leftOperand - rightOperand;

    subtractionQuestions.push({
      leftOperand,
      rightOperand,
      mathOperation: '-',
      correctAnswer,
      answerSelected: null,
      isCorrect: null,
    });

    minNumber = (minNumber < maxNumber) ? minNumber + 1 : lowerBound;
  }
  return subtractionQuestions;
}

/**
 * Generates an array of multiplication questions based on the provided parameters.
 * @param {number} practiceNumber - The number to practice with.
 * @param {number} minNumber - The minimum number that can be used in the questions.
 * @param {number} maxNumber - The maximum number that can be used in the questions.
 * @param {number} numberOfQuestions - The number of questions to generate.
 * 
 * @returns {Array} multiplicationQuestions - An array of multiplication question objects.
 */
export const multiplicationGenerator = (practiceNumber, minNumber, maxNumber, numberOfQuestions) => {
  const multiplicationQuestions = [];
  const leftOperand = practiceNumber;
  const lowerBound = minNumber;
  
  for (let i = 0; i < numberOfQuestions; i++) {
    let rightOperand = minNumber;
    let correctAnswer = leftOperand * rightOperand;

    multiplicationQuestions.push({
      leftOperand,
      rightOperand,
      mathOperation: '×',
      correctAnswer,
      answerSelected: null,
      isCorrect: null,
    });

    minNumber = (minNumber < maxNumber) ? minNumber + 1 : lowerBound;
  }
  return multiplicationQuestions;
}

/**
 * Generates an array of division questions based on the provided parameters.
 * The logic is set to ensure the following condtions are prevented:
 * The right operand is never zero to avoid division by zero errors.
 * The left operand is a multiple of the right operand to avoid fractions.
 * @param {number} practiceNumber - The number to practice with.
 * @param {number} minNumber - The minimum number that can be used in the questions.
 * @param {number} maxNumber - The maximum number that can be used in the questions.
 * @param {number} numberOfQuestions - The number of questions to generate.
 * 
 * @returns {Array} divisionQuestions - An array of division question objects.
 */
export const divisionGenerator = (practiceNumber, minNumber, maxNumber, numberOfQuestions) => {
  const divisionQuestions = [];
  const lowerBound = minNumber;
  const upperBound = maxNumber;
  let leftOperand = practiceNumber;
  let rightOperand = minNumber;

  for (let i = 0; i < numberOfQuestions; i++) {
    let correctAnswer;
    
    if (minNumber === 0) {
      leftOperand = 0;
      rightOperand = practiceNumber;
      correctAnswer = leftOperand / rightOperand;
    }
    else {
      rightOperand = practiceNumber;
      leftOperand = minNumber * rightOperand;
      correctAnswer = leftOperand / rightOperand;
    }

    divisionQuestions.push({
      leftOperand,
      rightOperand,
      mathOperation: `÷`,
      correctAnswer,
      answerSelected: null,
      isCorrect: null,
    });

    minNumber = (minNumber < upperBound) ? minNumber + 1 : lowerBound;
  }
  return divisionQuestions;
}

/**
 * Conditionally generate the questions based on the settings provided.
 * @param {Object} settings - The settings object containing parameters for generating questions.
 * 
 * @returns {Array} questions - An array of question objects based on the settings provided.
 */
export const questionsGenerator = (settings) => {
  const { mathFactType, practiceNumber, minNumber, maxNumber, numberOfQuestions } = settings;
  let questions = [];

  switch (mathFactType) {
    case 'addition':
      questions = additionGenerator(practiceNumber, minNumber, maxNumber, numberOfQuestions);
      break;
    case 'subtraction':
      questions = subtractionGenerator(practiceNumber, minNumber, maxNumber, numberOfQuestions);
      break;
    case 'multiplication':
      questions = multiplicationGenerator(practiceNumber, minNumber, maxNumber, numberOfQuestions);
      break;
    case 'division':
      questions = divisionGenerator(practiceNumber, minNumber, maxNumber, numberOfQuestions);
      break;
    default:
      throw new Error('Invalid math fact type');
  }

  // Shuffle the questions array
  shuffle(questions);

  return questions;
}
