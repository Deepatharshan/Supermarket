import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import LoadingScreen from './components/LoadingScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    console.log('App: Loading complete, showing dashboard');
    setIsLoading(false);
  };

  // Reset loading state when component mounts (for testing)
  useEffect(() => {
    console.log('App mounted, starting with loading screen');
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      {!isLoading && <Dashboard />}
    </>
  );
}
