import { useState, useEffect } from 'react';
import { SCREENS } from '../constants/screens';

/**
 * QuizTimer Component
 * This component manages the countdown timer for a timed quiz.
 * @param {Object} props - The props object.
 * @param {Object} props.settings - The settings for the quiz.
 * @param {Array} props.questions - The list of questions for the quiz.
 * @param {Function} props.setQuizResults - Function to set the quiz results.
 * @param {Function} props.changeScreen - Function to change the active screen in the application.
 * 
 * @returns {JSX.Element}
 */
export const QuizTimer = ({settings, questions, setQuizResults, changeScreen}) => {
  const [timeRemaining, setTimeRemaining] = useState(
    settings.timedQuiz
      ? settings.timeInMinutes * 60 + settings.timeInSeconds
      : 0
  );

  // Start the timer when the quiz begins
  useEffect(() => {
    if (settings.timedQuiz && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      // Cleanup the timer when timeRemaining changes or when the component unmounts 
      return () => clearInterval(timer);
    } 
    else if (timeRemaining === 0) {
      setQuizResults(questions);
      changeScreen(SCREENS.QUIZ_RESULTS);
    }
  }, [timeRemaining, settings.timedQuiz, questions, setQuizResults, changeScreen]);

  // Convert timeRemaining to MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="row mt-3">
      {settings.timedQuiz && 
        (
          <div className="timer text-center">
            <h3>{formatTime(timeRemaining)}</h3>
          </div>
        )
      }
    </div>
  );
}