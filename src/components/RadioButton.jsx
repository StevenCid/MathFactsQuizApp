/**
 * RadioButton Component
 * This component renders a radio button with a label and an operator symbol.
 * @param {Object} props - The props object for the RadioButton component.
 * @param {string} props.label - The label for the radio button.
 * @param {string} props.operator - The operator symbol for the radio button.
 * @param {boolean} props.checked - Whether the radio button is checked by default. 
 * 
 * @returns {JSX.Element} 
 */
export const RadioButton = ({ label, operator, checked }) => {
  return (
    <>
      <input type="radio" className="btn-check" name="math-fact-type" id={label} value={label} autoComplete="off" defaultChecked={checked} aria-label={label} />
      <label className="btn btn-outline-primary text-white" htmlFor={label}>{operator}</label>
    </>
  );
}