import React, { useState } from 'react';
import InteractiveGraph from './InteractiveGraph';

interface Question3Props {
  onComplete: () => void;
}

const Question3: React.FC<Question3Props> = ({ onComplete }) => {
  const [prediction2050, setPrediction2050] = useState('');
  const [yearValue, setYearValue] = useState('');
  const [yearResult, setYearResult] = useState('');
  const [prediction2050Correct, setPrediction2050Correct] = useState(false);
  const [yearValueCorrect, setYearValueCorrect] = useState(false);
  const [yearResultCorrect, setYearResultCorrect] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Original data points for context on the graph
  const dataPoints = [
    { x: 0, y: 0 },
    { x: 10, y: 3 },
    { x: 20, y: 6 },
  ];

  const linearEquation = (x: number) => 0.3 * x;

  const handle2050Change = (value: string) => {
    setPrediction2050(value);
    const correct = value === '15';
    setPrediction2050Correct(correct);
    checkAllAnswers(correct, yearValueCorrect, yearResultCorrect);
  };

  const handleYearValueChange = (value: string) => {
    setYearValue(value);
    const correct = value === '40';
    setYearValueCorrect(correct);
    checkAllAnswers(prediction2050Correct, correct, yearResultCorrect);
  };

  const handleYearResultChange = (value: string) => {
    setYearResult(value);
    const correct = value === '2040';
    setYearResultCorrect(correct);
    checkAllAnswers(prediction2050Correct, yearValueCorrect, correct);
  };

  const checkAllAnswers = (p2050: boolean, yValue: boolean, yResult: boolean) => {
    if (p2050 && yValue && yResult) {
      setTimeout(() => setShowSuccess(true), 500);
    }
  };

  return (
    <div className="question-container">
      <h2 className="question-title">Question 3: Predict Future Rise</h2>
      
      <p className="question-text">
        🔮 Now let's use our linear model to make predictions about future sea level rise and 
        determine when specific levels will be reached. Time to become a climate prediction scientist!
      </p>

      <div className="equation-display">
        $y = 0.3x$
      </div>

      <InteractiveGraph 
        dataPoints={dataPoints}
        lineEquation={linearEquation}
        showPredictionLine={true}
        title="Predicting Future Sea Level Rise"
      />

      {/* --- PART A --- */}
      <div className="prediction-section">
        <h4 style={{ color: '#d97706', marginBottom: '1rem' }}>Part A: Future Prediction</h4>
        <p>Calculate the predicted sea level rise in <strong>2050</strong> (remember: x = years since 2000).</p>
        
        <div className="input-group">
          <label>Predicted sea level rise in 2050: </label>
          <input
            type="text"
            className={`input-field ${prediction2050 ? (prediction2050Correct ? 'correct' : 'incorrect') : ''}`}
            value={prediction2050}
            onChange={(e) => handle2050Change(e.target.value)}
            placeholder="Enter value"
          />
          <span>cm</span>
          {prediction2050 && (
            <div className={`feedback ${prediction2050Correct ? 'correct' : 'incorrect'}`}>
              {prediction2050Correct ? '✓ Correct!' : '✗ Try again (0.3 × 50 = ?)'}
            </div>
          )}
        </div>
      </div>

      {/* --- PART B --- */}
      <div className="prediction-section">
        <h4 style={{ color: '#d97706', marginBottom: '1rem' }}>Part B: Reverse Prediction</h4>
        <p>Determine when the sea level will have risen by <strong>12 cm</strong>.</p>

        <div className="input-group">
          <label>Value of x when y = 12: </label>
          <input
            type="text"
            className={`input-field ${yearValue ? (yearValueCorrect ? 'correct' : 'incorrect') : ''}`}
            value={yearValue}
            onChange={(e) => handleYearValueChange(e.target.value)}
            placeholder="x value"
          />
          {yearValue && (
            <div className={`feedback ${yearValueCorrect ? 'correct' : 'incorrect'}`}>
              {yearValueCorrect ? '✓ Correct!' : '✗ Try again (12 ÷ 0.3 = ?)'}
            </div>
          )}
        </div>

        <div className="input-group">
          <label>Corresponding year (2000 + x): </label>
          <input
            type="text"
            className={`input-field ${yearResult ? (yearResultCorrect ? 'correct' : 'incorrect') : ''}`}
            value={yearResult}
            onChange={(e) => handleYearResultChange(e.target.value)}
            placeholder="Year"
          />
          {yearResult && (
            <div className={`feedback ${yearResultCorrect ? 'correct' : 'incorrect'}`}>
              {yearResultCorrect ? '✓ Correct!' : '✗ Try again (2000 + 40 = ?)'}
            </div>
          )}
        </div>
      </div>

      {showSuccess && (
        <div className="success-message">
          <h3>🎉 Excellent Predictions!</h3>
          <div style={{ textAlign: 'left', maxWidth: '600px', margin: '1rem auto' }}>
            <p><strong>Summary of your predictions:</strong></p>
            <ul>
              <li>By 2050, sea level will rise by <strong>15 cm</strong></li>
              <li>Sea level will reach 12 cm rise in the year <strong>2040</strong></li>
            </ul>
            <p>These predictions help scientists and policymakers understand the timeline and impact of climate change.</p>
          </div>
          <button className="btn btn-primary" onClick={onComplete}>
            Final Question →
          </button>
        </div>
      )}
    </div>
  );
};

export default Question3;