import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [stage, setStage] = useState('initial'); // initial, logo, fadeout

  useEffect(() => {
    console.log('Loading screen mounted');
    
    // Show logo after delay
    const showLogo = setTimeout(() => {
      console.log('Showing logo');
      setStage('logo');
    }, 800);

    // Start fade out
    const startFadeOut = setTimeout(() => {
      console.log('Starting fade out');
      setStage('fadeout');
    }, 3000);

    // Complete loading
    const completeLoading = setTimeout(() => {
      console.log('Loading complete');
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(showLogo);
      clearTimeout(startFadeOut);
      clearTimeout(completeLoading);
    };
  }, [onComplete]);

  const loadingStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
    opacity: stage === 'fadeout' ? 0 : 1,
    transition: 'opacity 1s ease-out'
  };

  const contentStyle = {
    textAlign: 'center',
    opacity: stage === 'initial' ? 0 : 1,
    transform: stage === 'initial' ? 'scale(0.5)' : 'scale(1)',
    transition: 'all 1.2s ease-out'
  };

  return (
    <div style={loadingStyle}>
      <div style={contentStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
          <div style={{ 
            fontSize: '5rem', 
            animation: 'logoFloat 3s ease-in-out infinite',
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))'
          }}>
            🏪
          </div>
          <h1 style={{ 
            color: '#ffffff',
            fontSize: '3rem',
            fontWeight: '200',
            letterSpacing: '4px',
            margin: '0',
            animation: 'logoGlow 3s ease-in-out infinite alternate',
            textTransform: 'uppercase'
          }}>
            SuperMarket
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
