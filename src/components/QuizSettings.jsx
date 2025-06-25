import { MFT } from '../constants/mathFactTypes';
import { SCREENS } from '../constants/screens';
import { Fieldset } from './Fieldset';
import { RadioButton } from './RadioButton';
import { NumberInputRow } from './NumberInputRow';
import { NumberInputColumn } from './NumberInputColumn';

/**
 * QuizSettings Component
 * This component renders the settings the user can set for their quiz.
 * @param {Object} props - The props object for the QuizSettings component.
 * @param {Object} props.settings - The current settings for the quiz.
 * @param {Function} props.setSettings - Function to update the quiz settings.
 * @param {Function} props.changeScreen - Function to change the active screen in the application.
 * 
 * @returns {JSX.Element}
 */
export const QuizSettings = ({settings, setSettings, changeScreen}) => {
  /**
   * Check if the radio button is selected based on the current settings.
   * @param {string} str - The value of the radio button.
   * 
   * @returns {boolean} true if the radio button is selected, false otherwise.
   */
  const radioButtonSelected = (str) => str === settings.mathFactType;

  /**
   * Handle form submission for quiz settings.
   * This function collects the form data, validates it, and updates the settings state.
   * @param {Object} e - The event object from the form submission.
   *  
   * @returns {void}
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const submittedSettings = {
      mathFactType: formData.get('math-fact-type') || MFT.ADDITION, // Default to addition if not selected
      practiceNumber: Math.abs(parseInt(formData.get('practice-number')), 10) || 1, // Default to 1 if NaN
      minNumber: Math.abs(parseInt(formData.get('min-number'), 10)) || 0, // Default to 0 if NaN
      maxNumber: Math.abs(parseInt(formData.get('max-number'), 10)) || 1, // Default to 1 if NaN
      numberOfQuestions: parseInt(formData.get('number-of-questions'), 10) || 1, // Default to 1 if NaN),
      timedQuiz: encodeURIComponent(formData.get('timed-quiz')) === 'on',
      timeInMinutes: isNaN(parseInt(formData.get('time-in-minutes'))) ? 0 : Math.abs(parseInt(formData.get('time-in-minutes'))),
      timeInSeconds: isNaN(parseInt(formData.get('time-in-seconds'))) ? 0 : Math.abs(parseInt(formData.get('time-in-seconds')))
    };

    if (submittedSettings.minNumber > submittedSettings.maxNumber) {
      alert('The Minimum number cannot be greater than the Maximum number.');
      return;
    }

    if (submittedSettings.timedQuiz) {
      if (submittedSettings.timeInMinutes === 0 && submittedSettings.timeInSeconds < 1) {
        alert('Please enter a valid time for the quiz.');
        return;
      }
    }

    setSettings({
      ...settings,
      ...submittedSettings
    });

    changeScreen(SCREENS.QUIZ);
  }

  return (
    <form id="quiz-settings" name="quiz-settings" onSubmit={handleSubmit}>
      <Fieldset legendLabel="Choose math fact">
        <div className="btn-group col-md-8" role="group" aria-label="Math fact radio toggle button group">
          {
            Object.values(MFT).map((factType) => (
              <RadioButton 
                key={factType.label}
                label={factType.label} 
                operator={factType.operator} 
                checked={radioButtonSelected(factType.label)} 
              />
            ))
          }
        </div>
      </Fieldset>
      <NumberInputRow formLabel="Number to practice" idName="practice-number" min={1} max={100} defaultValue={settings.practiceNumber} />
      <Fieldset legendLabel="Choose number range">
        <NumberInputColumn formLabel="Minimum" idName="min-number" min={0} max={100} defaultValue={settings.minNumber} />
        <NumberInputColumn formLabel="Maximum" idName="max-number" min={1} max={100} defaultValue={settings.maxNumber} />
      </Fieldset>
      <NumberInputRow formLabel="Number of questions" idName="number-of-questions" min={1} max={100} defaultValue={settings.numberOfQuestions} />
      <div className="row mb-3">
        <label className="form-check-label col-md-4" htmlFor="timed-quiz">Take a timed quiz</label>
        <div className="col-md-8">
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="timed-quiz" name="timed-quiz" defaultChecked={settings.timedQuiz}
              onChange={
                (e) => { 
                  setSettings({
                    ...settings,
                    timedQuiz: e.target.checked
                  });
                }
              }
            />
          </div>
        </div>
      </div>
      {
        settings.timedQuiz ? 
        (
          <Fieldset legendLabel="Choose Time">
            <NumberInputColumn formLabel="Minutes" idName="time-in-minutes" min={0} max={60} defaultValue={settings.timeInMinutes} />
            <NumberInputColumn formLabel="Seconds" idName="time-in-seconds" min={0} max={59} defaultValue={settings.timeInSeconds} />
          </Fieldset>
        ) 
        : null
      }
      <div className="row mb-3">
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary">Start Quiz</button>
        </div>
      </div>
    </form>
  );
}
