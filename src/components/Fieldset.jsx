/**
 * Fieldset component
 * Wraps html form elements in a fieldset with a legend.
 * @param {Object} props - The props object for the Fieldset component.
 * @param {string} props.legendLabel - The label for the legend of the fieldset.
 * @param {JSX.Element} props.children - The child elements to be wrapped inside the fieldset. 
 * 
 * @returns {JSX.Element}
 */
export const Fieldset = ({ legendLabel, children }) => {
  return (
    <fieldset className="row mb-3">
      <legend className="col-form-label col-md-4">{legendLabel}</legend>
      {children}
    </fieldset>
  );
}