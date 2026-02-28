import { HeroSection } from '../components/landing/HeroSection';
import { ScrollNarrative } from '../components/landing/ScrollNarrative';
import { SpeedTransition } from '../components/landing/SpeedTransition';
import { ModelsPreview } from '../components/landing/ModelsPreview';
import { Footer } from '../components/core/Footer';

export function Landing() {
    return (
        <main className="noise-overlay">
            <HeroSection />
            <ScrollNarrative />
            <SpeedTransition />
            <ModelsPreview />
            <Footer />
        </main>
    );
}

export default Landing;
