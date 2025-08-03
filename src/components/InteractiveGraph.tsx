import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';

interface DataPoint {
  x: number;
  y: number;
  year?: number;
}

interface InteractiveGraphProps {
  dataPoints: DataPoint[];
  lineEquation?: (x: number) => number;
  predictionPoint?: DataPoint;
  title?: string;
  showPredictionLine?: boolean;
}

const InteractiveGraph: React.FC<InteractiveGraphProps> = ({
  dataPoints,
  lineEquation,
  predictionPoint,
  title = "Sea Level Rise Over Time",
  showPredictionLine = false
}) => {
  // Generate additional points for smooth line if equation is provided
  const generateLinePoints = () => {
    if (!lineEquation) return dataPoints;
    
    const points = [];
    const maxX = Math.max(...dataPoints.map(p => p.x), predictionPoint?.x || 0);
    
    for (let x = 0; x <= maxX + 5; x += 2) {
      points.push({
        x,
        y: lineEquation(x),
        year: 2000 + x
      });
    }
    
    return points;
  };

  const linePoints = showPredictionLine ? generateLinePoints() : dataPoints;

  const formatTooltip = (value: number, name: string, props: any) => {
    if (name === 'y') {
      return [`${value} cm`, 'Sea Level Rise'];
    }
    return [value, name];
  };

  const formatLabel = (value: number) => {
    return `Year ${2000 + value} (x=${value})`;
  };

  return (
    <div className="chart-container">
      <h3 style={{ 
        textAlign: 'center', 
        color: '#003366', 
        marginBottom: '1rem',
        background: 'linear-gradient(135deg, #0077be, #003366)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontWeight: '600'
      }}>
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={window.innerWidth < 768 ? 250 : 300}>
        <LineChart data={linePoints} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#b8e6ea" opacity={0.6} />
          <XAxis 
            dataKey="x" 
            stroke="#2c5282"
            fontSize={window.innerWidth < 768 ? 10 : 12}
            label={{ 
              value: 'Years since 2000', 
              position: 'insideBottom', 
              offset: -10,
              style: { textAnchor: 'middle', fontSize: window.innerWidth < 768 ? '10px' : '12px' }
            }}
          />
          <YAxis 
            stroke="#2c5282"
            fontSize={window.innerWidth < 768 ? 10 : 12}
            label={{ 
              value: 'Sea Level Rise (cm)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: window.innerWidth < 768 ? '10px' : '12px' }
            }}
          />
          <Tooltip 
            formatter={formatTooltip}
            labelFormatter={formatLabel}
            contentStyle={{
              backgroundColor: 'rgba(248, 250, 252, 0.95)',
              border: '2px solid #b8e6ea',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0, 119, 190, 0.2)',
              fontSize: window.innerWidth < 768 ? '12px' : '14px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="y" 
            stroke="#0077be" 
            strokeWidth={window.innerWidth < 768 ? 2 : 3}
            dot={{ fill: '#0077be', strokeWidth: 2, r: window.innerWidth < 768 ? 4 : 6 }}
            activeDot={{ r: window.innerWidth < 768 ? 6 : 8, fill: '#003366', stroke: '#78dbe2', strokeWidth: 2 }}
          />
          {predictionPoint && (
            <ReferenceDot 
              x={predictionPoint.x} 
              y={predictionPoint.y} 
              r={window.innerWidth < 768 ? 6 : 8} 
              fill="#ef4444" 
              stroke="#dc2626"
              strokeWidth={2}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '2rem', 
        marginTop: '1rem',
        fontSize: window.innerWidth < 768 ? '0.8rem' : '0.9rem',
        color: '#2c5282',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '20px', height: '3px', background: '#0077be', borderRadius: '2px' }}></div>
          <span>Data Points</span>
        </div>
        {predictionPoint && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              background: '#ef4444', 
              borderRadius: '50%',
              boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)'
            }}></div>
            <span>Prediction</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveGraph;