import React, { useState } from 'react';
import InteractiveGraph from './InteractiveGraph';

interface Question2Props {
  onComplete: () => void;
}

const Question2: React.FC<Question2Props> = ({ onComplete }) => {
  const [slope, setSlope] = useState('');
  const [intercept, setIntercept] = useState('');
  const [slopeCorrect, setSlopeCorrect] = useState(false);
  const [interceptCorrect, setInterceptCorrect] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const dataPoints = [
    { x: 0, y: 0 },
    { x: 10, y: 3 },
    { x: 20, y: 6 }
  ];

  const linearEquation = (x: number) => 0.3 * x;

  const handleSlopeChange = (value: string) => {
    setSlope(value);
    const correct = value === '0.3';
    setSlopeCorrect(correct);
    checkEquation(correct, interceptCorrect);
  };

  const handleInterceptChange = (value: string) => {
    setIntercept(value);
    const correct = value === '0';
    setInterceptCorrect(correct);
    checkEquation(slopeCorrect, correct);
  };

  const checkEquation = (sCorrect: boolean, iCorrect: boolean) => {
    if (sCorrect && iCorrect) {
      setTimeout(() => setShowSuccess(true), 500);
    }
  };

  return (
    <div className="question-container">
      <h2 className="question-title">Question 2: Build the Predictive Model</h2>
      
      <p className="question-text">
        Now that we've confirmed the relationship is linear, let's build the predictive model in the form y = mx + b.
      </p>

      <p className="question-text">
        Use the slope you calculated previously for 'm'. To find the y-intercept 'b', look at the data to find the value of 'y' when 'x' is 0.
      </p>

      <InteractiveGraph 
        dataPoints={dataPoints}
        lineEquation={linearEquation}
        showPredictionLine={slopeCorrect && interceptCorrect}
        title="Building the Linear Model"
      />

      <div className="slope-section">
        <h4 style={{ color: '#0369a1', marginBottom: '1rem' }}>Enter the Complete Equation:</h4>
        
        <div className="input-group" style={{ 
          justifyContent: 'center', 
          fontSize: '1.5rem', 
          fontFamily: 'Courier New, monospace',
          background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
          color: '#1e293b',
          padding: '2rem',
          borderRadius: '12px',
          flexWrap: 'wrap',
          border: '2px solid #cbd5e1',
          boxShadow: '0 4px 15px rgba(0, 119, 190, 0.1)'
        }}>
          <span>y = </span>
          <input
            type="text"
            className={`input-field ${slope ? (slopeCorrect ? 'correct' : 'incorrect') : ''}`}
            value={slope}
            onChange={(e) => handleSlopeChange(e.target.value)}
            placeholder="m"
            style={{ 
              width: '80px', 
              textAlign: 'center', 
              fontSize: '1.3rem',
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#1e293b',
              fontWeight: '600'
            }}
          />
          <span>x + </span>
          <input
            type="text"
            className={`input-field ${intercept ? (interceptCorrect ? 'correct' : 'incorrect') : ''}`}
            value={intercept}
            onChange={(e) => handleInterceptChange(e.target.value)}
            placeholder="b"
            style={{ 
              width: '80px', 
              textAlign: 'center', 
              fontSize: '1.3rem',
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#1e293b',
              fontWeight: '600'
            }}
          />
        </div>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          {slope && (
            <div className={`feedback ${slopeCorrect ? 'correct' : 'incorrect'}`}>
              Slope (m): {slopeCorrect ? '✓ Correct!' : '✗ Should be 0.3'}
            </div>
          )}
          {intercept && (
            <div className={`feedback ${interceptCorrect ? 'correct' : 'incorrect'}`}>
              Y-intercept (b): {interceptCorrect ? '✓ Correct!' : '✗ Should be 0'}
            </div>
          )}
        </div>
      </div>

      {showSuccess && (
        <div className="success-message">
          <h3>🎉 Model Complete!</h3>
          <div className="equation-display">
            y = 0.3x
          </div>
          <p>
            Our predictive model is <strong>y = 0.3x</strong>, where:
          </p>
          <ul style={{ textAlign: 'left', maxWidth: '500px', margin: '1rem auto' }}>
            <li><strong>y</strong> = sea level rise in centimeters</li>
            <li><strong>x</strong> = years since 2000</li>
            <li><strong>0.3</strong> = rate of 0.3 cm rise per year</li>
          </ul>
          <button className="btn btn-primary" onClick={onComplete}>
            Next Question →
          </button>
        </div>
      )}
    </div>
  );
};

export default Question2;