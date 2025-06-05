import React from 'react';
import './LoadingSpinner.css';

interface SpinnerProps {
  size?: number;
  color?: string;
}

const LoadingSpinner: React.FC<SpinnerProps> = ({ size = 60, color = '#1DB954' }) => {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    border: `${size / 7.5}px solid #f3f3f3`,
    borderTop: `${size / 7.5}px solid ${color}`,
  };

  return (
    <div className="spinner-wrapper">
        <div className="spinner" style={style} />
    </div>
  );
};

export default LoadingSpinner;
