import React, { useState } from 'react';
import Question1 from './components/Question1';
import Question2 from './components/Question2';
import Question3 from './components/Question3';
import Question4 from './components/Question4';
import ConclusionScreen from './components/ConclusionScreen';
import './App.css';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const handleNextQuestion = () => {
    setCurrentQuestion(prev => prev + 1);
  };

  const renderCurrentQuestion = () => {
    switch (currentQuestion) {
      case 1:
        return <Question1 onComplete={handleNextQuestion} />;
      case 2:
        return <Question2 onComplete={handleNextQuestion} />;
      case 3:
        return <Question3 onComplete={handleNextQuestion} />;
      case 4:
        return <Question4 onComplete={handleNextQuestion} />;
      case 5:
        return <ConclusionScreen />;
      default:
        return <Question1 onComplete={handleNextQuestion} />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sea Level Crisis: The Linear Model</h1>
        <div className="progress-bar">
          <div className="progress-indicator">
            Question {Math.min(currentQuestion, 4)} of 4
          </div>
          <div className="progress-fill" style={{ width: `${(Math.min(currentQuestion, 4) / 4) * 100}%` }}></div>
        </div>
      </header>
      <main className="app-main">
        {renderCurrentQuestion()}
      </main>
    </div>
  );
}

export default App;