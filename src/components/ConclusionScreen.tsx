import React from 'react';

const ConclusionScreen: React.FC = () => {
  return (
    <div className="conclusion-container">
      <h1 className="conclusion-title">🎓 Mission Accomplished!</h1>
      
      <div className="conclusion-text">
        <p>
          🎉 You have successfully completed the <strong>Sea Level Crisis</strong> learning journey 
          and mastered the power of linear mathematical modeling! You're now a certified ocean mathematician!
        </p>
        
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.2)', 
          borderRadius: '15px', 
          padding: '2rem', 
          margin: '2rem 0',
          textAlign: 'left'
        }}>
          <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>🧠 What You've Learned:</h3>
          <ul style={{ fontSize: '1.1rem', lineHeight: '2' }}>
            <li><strong>Linear Verification:</strong> How to check if data follows a linear pattern</li>
            <li><strong>Model Building:</strong> Creating equations from real-world data (y = mx + b)</li>
            <li><strong>Future Predictions:</strong> Using models to forecast future scenarios</li>
            <li><strong>Real-World Impact:</strong> Understanding how math applies to climate science</li>
          </ul>
        </div>

        <div style={{ 
          background: 'rgba(255, 255, 255, 0.2)', 
          borderRadius: '15px', 
          padding: '2rem', 
          margin: '2rem 0',
          textAlign: 'left'
        }}>
          <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>🌍 The Bigger Picture:</h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            Linear equations are fundamental tools used by climate scientists, urban planners, 
            and policymakers worldwide. Your ability to create and interpret these models 
            contributes to our collective understanding of environmental challenges and 
            helps inform critical decisions about our planet's future.
          </p>
        </div>

        <p style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '2rem' }}>
          Mathematical modeling isn't just about numbers—it's about understanding, 
          predicting, and potentially solving some of the world's most pressing challenges.
        </p>

        <div style={{ marginTop: '3rem' }}>
          <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>
            🌊 Keep exploring, keep learning, and keep making a difference! 🌊
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConclusionScreen;