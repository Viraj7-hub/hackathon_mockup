import { useState, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { SmoothScroll } from './components/core/SmoothScroll';
import { CustomCursor } from './components/core/CustomCursor';
import { Navbar } from './components/core/Navbar';
import { PageTransition } from './components/core/PageTransition';
import { IntroSequence } from './components/core/IntroSequence';
import { AudioManager } from './components/core/AudioManager';
import { Landing } from './pages/Landing';
import { Models } from './pages/Models';
import { PerformanceLab } from './pages/PerformanceLab';
import { Technology } from './pages/Technology';
import { Configurator } from './pages/Configurator';
import { BuyingFlow } from './pages/BuyingFlow';

export function App() {
    const location = useLocation();
    const [introComplete, setIntroComplete] = useState(false);
    const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

    return (
        <AudioManager>
            {!introComplete && <IntroSequence onComplete={handleIntroComplete} />}
            <SmoothScroll>
                <CustomCursor />
                <Navbar />
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
                        <Route path="/models" element={<PageTransition><Models /></PageTransition>} />
                        <Route path="/configurator" element={<PageTransition><Configurator /></PageTransition>} />
                        <Route path="/performance" element={<PageTransition><PerformanceLab /></PageTransition>} />
                        <Route path="/technology" element={<PageTransition><Technology /></PageTransition>} />
                        <Route path="/buying" element={<PageTransition><BuyingFlow /></PageTransition>} />
                    </Routes>
                </AnimatePresence>
            </SmoothScroll>
        </AudioManager>
    );
}

export default App;