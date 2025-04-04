
import React from 'react';

/**
 * Ultra-lightweight loading skeleton for critical path rendering
 * Uses minimal inline styles to avoid CSS loading and reduce FCP
 */
const CriticalLoadingSkeleton: React.FC = () => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '15vh',
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(to bottom, #f9f9f9, #ffffff)'
      }}
      role="progressbar"
      aria-busy="true"
      aria-label="Loading content"
    >
      <div style={{ display: 'flex', gap: '6px' }}>
        <div 
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#6A38BC',
            animation: 'pulse 0.8s ease-in-out infinite alternate'
          }}
        />
        <div 
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#6A38BC',
            animation: 'pulse 0.8s ease-in-out infinite alternate 0.3s'
          }}
        />
        <div 
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#6A38BC',
            animation: 'pulse 0.8s ease-in-out infinite alternate 0.5s'
          }}
        />
      </div>
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(0.8); opacity: 0.5; }
            100% { transform: scale(1.2); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default CriticalLoadingSkeleton;
