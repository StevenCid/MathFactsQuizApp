/**
 * NumberInputColumn Component
 * This component renders a row with a label and an input field.
 * @param {Object} props - The props object for the NumberInputColumn component.
 * @param {string} props.formLabel - The label for the input field.
 * @param {string} props.idName - The id and name for the input field.
 * @param {number} props.min - The minimum value for the input field.
 * @param {number} props.max - The maximum value for the input field.
 * @param {number} props.defaultValue - The default value for the input field.
 *  
 * @returns {JSX.Element} 
 */
export const NumberInputColumn = ({ formLabel, idName, min, max, defaultValue }) => {
  return (
    <div className="col-md-4">
      <label htmlFor={idName} className="col-form-label">{formLabel}</label>
      <input type="number" className="form-control" id={idName} name={idName} min={min} max={max} defaultValue={defaultValue} />
    </div>
  );
}