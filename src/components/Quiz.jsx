import { useState, useRef, useEffect } from "react";
import { SCREENS } from "../constants/screens";
import { questionsGenerator } from "../helpers/questionsGenerator";
import { QuizTimer } from "./QuizTimer";

/**
 * Quiz Component
 * This component renders the quiz interface, allowing users to answer math questions based on the provided settings.
 * @param {Object} props - The props object for the Quiz component.
 * @param {Object} props.settings - The settings for the quiz.
 * @param {Function} props.setQuizResults - Function to set the quiz results after completion.
 * @param {Function} props.changeScreen - Function to change the active screen in the application. 
 * 
 * @returns {JSX.Element}
 */
export const Quiz = ({ settings, setQuizResults, changeScreen }) => {
  const [questions] = useState(() => questionsGenerator(settings));
  const [questionsIndex, setQuestionsIndex] = useState(0);
  const [answerValue, setAnswerValue] = useState('');
  const answerRef = useRef(null);

  // Ensure the input field is focused on each re-render to optimize keyboard interaction
  useEffect(() => {
    if (answerRef.current) {
      answerRef.current.focus();
    }
  }, [questionsIndex]);

  const leftOperand = questions[questionsIndex].leftOperand;
  const rightOperand = questions[questionsIndex].rightOperand;
  const mathOperation = questions[questionsIndex].mathOperation;

  /**
   * Update the current question index and record the user's selected answer and correctness.
   * This function is called when the user submits their answer.
   * Advances to the next question or changes to the results screen if quiz is complete.
   * @param {Object} e - The event object from the form submission.
   * 
   * @returns {void} 
   */
  const checkAnswer = (e) => {
    e.preventDefault();
    const answer = parseInt(answerValue, 10);
    questions[questionsIndex].answerSelected = answer;
    questions[questionsIndex].isCorrect = answer === questions[questionsIndex].correctAnswer;

    setAnswerValue(''); // Clear the input

    if (questionsIndex < questions.length - 1) {
      setQuestionsIndex(questionsIndex + 1);
    } else {
      setQuizResults(questions);
      changeScreen(SCREENS.QUIZ_RESULTS);
    }
  };

  return (
    <>
      {
        settings.timedQuiz ? 
        (
          <QuizTimer settings={settings} questions={questions} setQuizResults={setQuizResults} changeScreen={changeScreen} />
        ) 
        : null
      }
      <form id="quiz" className="my-3" name="quiz" onSubmit={checkAnswer}>
        <div className="row justify-content-center">
          <label htmlFor="answer" className="col-auto col-form-label text-end pe-0">
            <span aria-label={`Question Number ${questionsIndex + 1}`}>{`${questionsIndex + 1}.`}</span>
            <span className="operand left">{leftOperand}</span>
            {mathOperation}
            <span className="operand right">{rightOperand}</span>=
          </label>
          <div className="col-auto">
            <input
              type="number"
              className="form-control"
              id="answer"
              name="answer"
              min={0}
              autoFocus
              ref={answerRef}
              value={answerValue}
              onChange={e => setAnswerValue(e.target.value)}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary" aria-label="Check Answer">
              &#x2713;
            </button>
          </div>
        </div>
      </form>
    </>
  );
};