import { useState } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { MFT } from './constants/mathFactTypes';
import { SCREENS } from './constants/screens';
import { QuizSettings } from './components/QuizSettings';
import { Quiz } from './components/Quiz';
import { QuizResults } from './components/QuizResults';

/**
 * App Component
 * This is the main component for the Math Facts Quiz application.
 * 
 * @returns {JSX.Element}
 */
function App() {
  // Initial quiz settings
  // These settings can be modified by the user in the QuizSettings component
  const initSettings = {
    mathFactType: MFT.ADDITION.label,
    practiceNumber: 1,
    minNumber: 0,
    maxNumber: 100,
    numberOfQuestions: 20,
    timedQuiz: false,
    timeInMinutes: 1,
    timeInSeconds: 0
  };

  const [settings, setSettings] = useState(initSettings);
  const [activeScreen, setActiveScreen] = useState(SCREENS.QUIZ_SETTINGS);
  const [quizResults, setQuizResults] = useState([]);

  /**
   * Get the component to render based on the active screen.
   * @param {string} activeScreen - The current active screen.
   * 
   * @returns {JSX.Element} The content of the screen based on the active screen.
   */
  const getScreenComponent = (activeScreen) => {
    switch (activeScreen) {
      case SCREENS.QUIZ_SETTINGS:
        return (
          <QuizSettings
            settings={settings}
            setSettings={setSettings}
            changeScreen={changeScreen}
          />
        );
      case SCREENS.QUIZ:
        return (
          <Quiz
            settings={settings}
            setQuizResults={setQuizResults}
            changeScreen={changeScreen}
          />
        );
      case SCREENS.QUIZ_RESULTS:
        return (
          <QuizResults
            quizResults={quizResults}
          />
        );
      default:
        return null;
    }
  };

  /**
   * Change the state of the active screen.
   * @param {string} screen - The screen to change to, expects one of the SCREENS defined in the SCREENS constant.
   * 
   * @returns {void} 
   */
  const changeScreen = (screen) => {
    setActiveScreen(screen);
  };

  return (
    <div id="math-facts-quiz">
      <div className="inner-container">
        <h1 className="text-center my-3">Math Facts Quiz App</h1>
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1">
            <div className="card text-bg-dark border-light">
              <div className="card-header border-light">
                <h2>
                  {activeScreen === SCREENS.QUIZ_SETTINGS && "Quiz Settings"}
                  {activeScreen === SCREENS.QUIZ && (settings.timedQuiz ? "Timed Quiz" : "Quiz")}
                  {activeScreen === SCREENS.QUIZ_RESULTS && "Quiz Results"}
                </h2>
              </div>
              <div className="card-body">
                {getScreenComponent(activeScreen)}
              </div>
              {activeScreen === SCREENS.QUIZ_RESULTS && 
                (
                  <div className="card-footer border-light">
                    <button
                      className="btn btn-primary my-3"
                      onClick={() => changeScreen(SCREENS.QUIZ_SETTINGS)}
                    >
                      Quiz Again?
                    </button>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
