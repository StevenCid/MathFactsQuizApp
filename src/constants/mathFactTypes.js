/**
 * Provides structure for a math fact object with a label and operator.
 * @param {string} label - The label for the math fact type.
 * @param {string} operator - The operator symbol for the math fact type.
 * 
 * @returns {Object} An object representing the math fact type with label and operator.
 */
export const mathFact = (label, operator) => {
  return Object.freeze({
    "label": label,
    "operator": operator
  });
};

// Math Fact Types
export const MFT = Object.freeze({
  ADDITION: mathFact("addition", "+"),
  SUBTRACTION: mathFact("subtraction", "-"),
  MULTIPLICATION: mathFact("multiplication", "×"),
  DIVISION: mathFact("division", "÷"),
});