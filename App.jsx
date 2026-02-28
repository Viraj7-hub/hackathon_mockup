import React, { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen.jsx';
import MainPage from './MainPage.jsx';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Timer 1: Start the fade-out animation at 5 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 5000);

    // Timer 2: Completely remove the splash screen at 6 seconds
    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 6000);

    // Cleanup timers to prevent memory leaks
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div className="App">
      {/* Show splash screen with the fading state passed as a prop */}
      {showSplash && <SplashScreen isFading={isFading} />}

      {/* Your Home Page content */}
      <MainPage />
    </div>
  );
}

export default App;