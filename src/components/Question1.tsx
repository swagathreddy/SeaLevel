import React, { useState } from 'react';
import InteractiveGraph from './InteractiveGraph';

interface Question1Props {
  onComplete: () => void;
}

const Question1: React.FC<Question1Props> = ({ onComplete }) => {
  const [slope1, setSlope1] = useState('');
  const [slope2, setSlope2] = useState('');
  const [isLinear, setIsLinear] = useState<boolean | null>(null);
  const [slope1Correct, setSlope1Correct] = useState(false);
  const [slope2Correct, setSlope2Correct] = useState(false);
  const [showLinearQuestion, setShowLinearQuestion] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [linearAnswerFeedback, setLinearAnswerFeedback] = useState<string>('');

  const dataPoints = [
    { x: 0, y: 0 },
    { x: 10, y: 3 },
    { x: 20, y: 6 }
  ];

  const handleSlope1Change = (value: string) => {
    setSlope1(value);
    const correct = value === '0.3';
    setSlope1Correct(correct);
    checkBothSlopes(correct, slope2Correct);
  };

  const handleSlope2Change = (value: string) => {
    setSlope2(value);
    const correct = value === '0.3';
    setSlope2Correct(correct);
    checkBothSlopes(slope1Correct, correct);
  };

  const checkBothSlopes = (s1: boolean, s2: boolean) => {
    if (s1 && s2) {
      setTimeout(() => setShowLinearQuestion(true), 500);
    }
  };

  const handleLinearAnswer = (answer: boolean) => {
    setIsLinear(answer);
    if (answer === true) {
      setLinearAnswerFeedback('');
      setShowSuccess(true);
    } else {
      setLinearAnswerFeedback('✗ Incorrect. The slopes are constant, which is the definition of a linear relationship.');
    }
  };

  return (
    <div className="question-container">
      <h2 className="question-title">Question 1: Verify the Linearity</h2>
      
      <p className="question-text">
        🌊 Scientists have collected the following data about sea level rise. Let's dive into the mathematics 
        and verify if the relationship is linear by checking if the slope (rate of change) is constant between different points.
      </p>

      <div className="data-table">
        <h4 style={{ marginBottom: '1rem', color: '#1e293b' }}>Collected Data:</h4>
        <div className="data-row">
          <span><strong>Year 2000 (x=0):</strong></span>
          <span>Sea Level Rise = 0 cm</span>
        </div>
        <div className="data-row">
          <span><strong>Year 2010 (x=10):</strong></span>
          <span>Sea Level Rise = 3 cm</span>
        </div>
        <div className="data-row">
          <span><strong>Year 2020 (x=20):</strong></span>
          <span>Sea Level Rise = 6 cm</span>
        </div>
      </div>

      <InteractiveGraph 
        dataPoints={dataPoints}
        title="Sea Level Rise Data Points"
      />

      {/* --- SLOPE 1 CALCULATION --- */}
      <div className="slope-section">
        <h4 style={{ color: '#0369a1', marginBottom: '1rem' }}>Step 1: Calculate the First Slope</h4>
        <p>Calculate the slope between the points (0,0) and (10,3).</p>
        <div className="input-group">
          <label>Slope 1 = </label>
          <input
            type="text"
            className={`input-field ${slope1 ? (slope1Correct ? 'correct' : 'incorrect') : ''}`}
            value={slope1}
            onChange={(e) => handleSlope1Change(e.target.value)}
            placeholder="Enter slope value"
          />
          {slope1 && (
            <div className={`feedback ${slope1Correct ? 'correct' : 'incorrect'}`}>
              {slope1Correct ? '✓ Correct!' : '✗ Try again (hint: (3-0)/(10-0))'}
            </div>
          )}
        </div>
      </div>

      {/* --- SLOPE 2 CALCULATION --- */}
      <div className="slope-section">
        <h4 style={{ color: '#0369a1', marginBottom: '1rem' }}>Step 2: Calculate the Second Slope</h4>
        <p>Now, calculate the slope between the points (10,3) and (20,6).</p>
        <div className="input-group">
          <label>Slope 2 = </label>
          <input
            type="text"
            className={`input-field ${slope2 ? (slope2Correct ? 'correct' : 'incorrect') : ''}`}
            value={slope2}
            onChange={(e) => handleSlope2Change(e.target.value)}
            placeholder="Enter slope value"
          />
          {slope2 && (
            <div className={`feedback ${slope2Correct ? 'correct' : 'incorrect'}`}>
              {slope2Correct ? '✓ Correct!' : '✗ Try again (hint: (6-3)/(20-10))'}
            </div>
          )}
        </div>
      </div>

      {/* --- ANALYSIS QUESTION --- */}
      {showLinearQuestion && !showSuccess && (
        <div className="prediction-section">
          <h4 style={{ color: '#d97706', marginBottom: '1rem' }}>Step 3: Analyze the Results</h4>
          <p>Both slopes equal 0.3, which means the rate of change is constant.</p>
          <p><strong>Is the data linear?</strong></p>
          <div className="button-group">
            <button 
              className="btn btn-success"
              onClick={() => handleLinearAnswer(true)}
            >
              Yes
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => handleLinearAnswer(false)}
            >
              No
            </button>
          </div>
          {linearAnswerFeedback && (
            <div className="feedback incorrect" style={{ marginTop: '1rem', textAlign: 'center' }}>
              {linearAnswerFeedback}
            </div>
          )}
        </div>
      )}

      {/* --- SUCCESS MESSAGE --- */}
      {showSuccess && (
        <div className="success-message">
          <h3>🎉 Correct!</h3>
          <p>The data is linear because the slope is constant (m = 0.3) between all points. 
          This means sea level rises at a steady rate of 0.3 cm per year.</p>
          {/* Added style to this button for spacing */}
          <button className="btn btn-primary" onClick={onComplete} style={{ marginTop: '1.5rem' }}>
            Next Question →
          </button>
        </div>
      )}
    </div>
  );
};

export default Question1;