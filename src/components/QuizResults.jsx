/**
 * QuizResults Component
 * This component displays the results of a quiz, showing the total score and details of each question answered.
 * @param {Object} props - The props object.
 * @param {Array} quizResults - An array of objects representing the results of the quiz.
 *   
 * @returns {JSX.Element}
 */
export const QuizResults = ({ quizResults }) => {
  const totalCorrect = quizResults.reduce((acc, question) => acc + (question.isCorrect ? 1 : 0), 0);

  return (
    <>
      <h3 className="mb-3" aria-label={`Total Score: ${totalCorrect} out of ${quizResults.length}`}>Total Score: {totalCorrect}/{quizResults.length}</h3>
      <ul className="list-group">
        {quizResults.map((question, index) => (
          <li key={index} className="list-group-item text-bg-dark border-light">
            <strong>{`${index + 1}.`}</strong>
            {
              question.isCorrect ? 
              (
                <span className="quiz-question ps-3 correct-answer" aria-label={`You answered this question correctly: ${question.leftOperand} ${question.mathOperation} ${question.rightOperand} = ${question.correctAnswer}`}>{`${question.leftOperand} ${question.mathOperation} ${question.rightOperand} = ${question.correctAnswer}`}</span>
              ) 
              : 
              (
                <>
                  <span className="quiz-question ps-3" aria-label={`Correct Answer: ${question.leftOperand} ${question.mathOperation} ${question.rightOperand} = ${question.correctAnswer}`}>{`${question.leftOperand} ${question.mathOperation} ${question.rightOperand} = ${question.correctAnswer}`}</span>
                  <span className="quiz-question-answered ps-3 incorrect-answer" aria-label={`You answered this question incorrectly:: ${question.answerSelected}`}>Your Answer: {question.answerSelected}</span>
                </>
              )
            }
          </li>
        ))}
      </ul>
    </>
  );
};