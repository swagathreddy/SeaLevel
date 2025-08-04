import React, { useState } from 'react';
import InteractiveGraph from './InteractiveGraph';
import Video from "../Images/Video.mp4"

interface Question4Props {
  onComplete: () => void;
}

const Question4: React.FC<Question4Props> = ({ onComplete }) => {
  const [seaRise2050, setSeaRise2050] = useState('');
  const [houseSubmerged, setHouseSubmerged] = useState<boolean | null>(null);
  const [seaRiseCorrect, setSeaRiseCorrect] = useState(false);
  const [showHouseQuestion, setShowHouseQuestion] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [houseAnswerFeedback, setHouseAnswerFeedback] = useState<string>('');

  const dataPoints = [
    { x: 0, y: 0 },
    { x: 10, y: 200 },
    { x: 20, y: 400 }
  ];

  const fasterEquation = (x: number) => 20 * x;

  const handleSeaRiseChange = (value: string) => {
    setSeaRise2050(value);
    const correct = value === '1000';
    setSeaRiseCorrect(correct);
    if (correct) {
      setTimeout(() => setShowHouseQuestion(true), 500);
    }
  };

  const handleHouseAnswer = (answer: boolean) => {
    setHouseSubmerged(answer);
    if (answer === true) {
      setHouseAnswerFeedback('');
      setShowSuccess(true);
    } else {
      setHouseAnswerFeedback('✗ Not quite. The sea level rise (1000 cm) is greater than the house altitude (800 cm). So, it will be submerged.');
    }
  };

  return (
    <div className="question-container">
      {/* ... (The first part of the component remains the same) ... */}
      <h2 className="question-title">Question 4: A Real-World Consequence</h2>
      
      <p className="question-text">
        🏠 Let's apply our linear modeling skills to a more dramatic scenario that shows the real impact 
        of accelerated sea level rise. This is where mathematics meets real-world consequences!
      </p>

      <div className="warning-section">
        <h4 style={{ color: '#dc2626', marginBottom: '1rem' }}>Scenario:</h4>
        <p>
          Imagine you buy a house in <strong>Rameswaram</strong>, a coastal town in India, 
          which is at an altitude of <strong>8 meters (800 cm)</strong> above current sea level.
        </p>
        <p>
          Due to accelerated climate change and local factors, sea level rise in this region 
          follows a much faster linear equation:
        </p>
      </div>

      <div className="equation-display">
        $y = 20x$
      </div>

      <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '2rem' }}>
        where y = sea level rise in cm, and x = years since 2000
      </p>

      <InteractiveGraph 
        dataPoints={dataPoints}
        lineEquation={fasterEquation}
        showPredictionLine={true}
        title="Accelerated Sea Level Rise Scenario"
      />

      <div className="prediction-section">
        <h4 style={{ color: '#d97706', marginBottom: '1rem' }}>Critical Calculation:</h4>
        <p>Using the equation <strong>$y = 20x$</strong>, calculate the sea level rise by 2050 (x = 50).</p>
        
        <div className="input-group">
          <label>Sea level rise by 2050: </label>
          <input
            type="text"
            className={`input-field ${seaRise2050 ? (seaRiseCorrect ? 'correct' : 'incorrect') : ''}`}
            value={seaRise2050}
            onChange={(e) => handleSeaRiseChange(e.target.value)}
            placeholder="Enter value"
          />
          <span>cm</span>
          {seaRise2050 && (
            <div className={`feedback ${seaRiseCorrect ? 'correct' : 'incorrect'}`}>
              {seaRiseCorrect ? '✓ Correct!' : '✗ Try again (20 × 50 = ?)'}
            </div>
          )}
        </div>
      </div>

      {showHouseQuestion && !showSuccess && (
        <div className="warning-section">
          <h4 style={{ color: '#dc2626', marginBottom: '1rem' }}>Critical Decision:</h4>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', margin: '1rem 0' }}>
            <p><strong>Key Facts:</strong></p>
            <ul>
              <li>Your house altitude: <strong>800 cm</strong> above current sea level</li>
              <li>Your calculated sea level rise by 2050: <strong>{seaRise2050} cm</strong></li>
            </ul>
          </div>
          <p><strong>Will your house be submerged by 2050?</strong></p>
          <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
            (Hint: Compare the sea level rise with the house altitude)
          </p>
          <div className="button-group">
            <button 
              className="btn btn-success"
              onClick={() => handleHouseAnswer(true)}
            >
              Yes, it will be submerged
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => handleHouseAnswer(false)}
            >
              No, it will be safe
            </button>
          </div>
          {houseAnswerFeedback && (
            <div className="feedback incorrect" style={{ marginTop: '1rem', textAlign: 'center' }}>
              {houseAnswerFeedback}
            </div>
          )}
        </div>
      )}

      {showSuccess && (
        <div className="success-message">
          <h3>🎯 Mission Accomplished!</h3>
          <div style={{ textAlign: 'left', maxWidth: '600px', margin: '1.5rem auto', padding: '0 1rem' }}>
            <p><strong>Your Analysis:</strong></p>
            <ul>
              <li>Sea level rise by 2050: <strong>1000 cm (10 meters)</strong></li>
              <li>House altitude: <strong>800 cm (8 meters)</strong></li>
              <li>Result: House will be <strong>2 meters underwater</strong></li>
            </ul>
            <p style={{ marginTop: '1.5rem', fontStyle: 'italic' }}>
              This scenario demonstrates how mathematical modeling helps us understand and 
              prepare for the serious consequences of climate change.
            </p>
          </div>
          
          {/* --- VIDEO SECTION --- */}
          {/* The horizontal padding (third value) has been removed from the style below */}
          <div className="video-section" style={{ margin: '2rem auto', maxWidth: '600px' }}>
            <h4 style={{ textAlign: 'center', marginBottom: '1rem' }}>Visualizing the Consequences</h4>
            <p style={{ textAlign: 'center', marginBottom: '1rem', color: '#475569', padding: '0 1rem' }}>
              Sea levels in the Indian Ocean are rising at an alarming rate of 3.3 mm per year. The video below offers a glimpse into what the future could look like along India’s coast over the next century.
            </p>
            <video
              key="coastal-video"
              width="100%"
              loop
              autoPlay
              muted
              controls
              style={{ borderRadius: '12px', objectFit: 'cover', display: 'block' }}
            >
              <source src={Video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          {/* --- END OF VIDEO SECTION --- */}
          
          <button className="btn btn-primary" onClick={onComplete} style={{marginTop: '1.5rem'}}>
            View Conclusion →
          </button>
        </div>
      )}
    </div>
  );
};

export default Question4;