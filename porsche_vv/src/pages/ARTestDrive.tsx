import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import { AnimatedText } from '../components/core/AnimatedText';
import { MagneticButton } from '../components/core/MagneticButton';
import { Footer } from '../components/core/Footer';

export function ARTestDrive() {
    const [cameraActive, setCameraActive] = useState(false);
    const [speed, setSpeed] = useState(0);
    const [rpm, setRPM] = useState(800);
    const videoRef = useRef<HTMLVideoElement>(null);
    const animRef = useRef<number>(0);
    const heroRef = useRef(null);
    const isInView = useInView(heroRef, { once: true });

    const startCamera = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment', width: 1280, height: 720 },
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
                setCameraActive(true);
            }
        } catch {
            setCameraActive(false);
        }
    }, []);

    useEffect(() => {
        if (!cameraActive) return;
        let t = 0;
        const animate = () => {
            t += 0.016;
            const s = Math.abs(Math.sin(t * 0.3)) * 280;
            const r = 800 + s * 25;
            setSpeed(Math.round(s));
            setRPM(Math.round(r));
            animRef.current = requestAnimationFrame(animate);
        };
        animRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animRef.current);
    }, [cameraActive]);

    useEffect(() => {
        return () => {
            if (videoRef.current?.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach((t) => t.stop());
            }
        };
    }, []);

    const currentGear = Math.min(7, Math.max(1, Math.ceil(speed / 40)));

    return (
        <main className="noise-overlay">
            <section ref={heroRef} className="relative h-[50vh] flex items-end pb-16 bg-[var(--porsche-black)]">
                <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at 50% 120%, rgba(213,0,28,0.08) 0%, transparent 60%)',
                }} />
                <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
                    <motion.div className="inline-block px-3 py-1 mb-4 border border-[var(--porsche-red)]/40 bg-[var(--porsche-red)]/10"
                        initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}>
                        <span className="text-[9px] tracking-[0.4em] text-[var(--porsche-red)] uppercase"
                            style={{ fontFamily: 'var(--font-display)' }}>Concept Experience</span>
                    </motion.div>
                    <AnimatedText text="AR TEST DRIVE" as="h1"
                        className="text-[clamp(2.5rem,8vw,7rem)] font-black tracking-[-0.02em]" delay={0.5} />
                    <motion.p className="mt-4 text-[var(--porsche-silver)] text-lg max-w-xl"
                        initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 1 }}>
                        Experience the thrill of a Porsche through augmented reality.
                    </motion.p>
                </div>
            </section>

            <section className="relative py-12 bg-[var(--porsche-carbon)]">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                    <div className="relative aspect-video overflow-hidden glass-light">
                        {cameraActive ? (
                            <>
                                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                                <div className="absolute inset-0 z-10 pointer-events-none">
                                    <div className="absolute top-6 left-6 glass p-4">
                                        <p className="text-[8px] tracking-[0.3em] text-[var(--porsche-silver)] uppercase">Speed</p>
                                        <p className="text-3xl font-black" style={{ fontFamily: 'var(--font-display)' }}>
                                            {speed} <span className="text-xs text-[var(--porsche-red)]">KM/H</span>
                                        </p>
                                    </div>
                                    <div className="absolute top-6 right-6 glass p-4">
                                        <p className="text-[8px] tracking-[0.3em] text-[var(--porsche-silver)] uppercase">RPM</p>
                                        <p className="text-3xl font-black" style={{ fontFamily: 'var(--font-display)' }}>
                                            {rpm.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass px-6 py-3 flex gap-4">
                                        {[1, 2, 3, 4, 5, 6, 7].map((g) => (
                                            <span key={g} className={`text-sm font-bold ${g === currentGear ? 'text-[var(--porsche-red)]' : 'text-[var(--porsche-steel)]'
                                                }`} style={{ fontFamily: 'var(--font-display)' }}>{g}</span>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center">
                                <motion.div className="w-24 h-24 mb-8 rounded-full border-2 border-[var(--porsche-red)]/30 flex items-center justify-center"
                                    animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--porsche-red)" strokeWidth="1.5">
                                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                        <circle cx="12" cy="13" r="4" />
                                    </svg>
                                </motion.div>
                                <p className="text-[var(--porsche-silver)] text-sm mb-6">Enable camera to begin the AR experience</p>
                                <MagneticButton
                                    className="group relative px-8 py-3.5 border border-[var(--porsche-red)] bg-transparent overflow-hidden"
                                    onClick={startCamera} strength={0.2}>
                                    <span className="absolute inset-0 bg-[var(--porsche-red)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                    <span className="relative z-10 text-[11px] font-semibold tracking-[0.3em] text-[var(--porsche-white)] uppercase"
                                        style={{ fontFamily: 'var(--font-display)' }}>Activate Camera</span>
                                </MagneticButton>
                            </div>
                        )}
                    </div>
                    <motion.p className="mt-6 text-center text-[10px] tracking-[0.2em] text-[var(--porsche-silver)]/50 uppercase"
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        This is a concept demonstration — not a production AR feature
                    </motion.p>
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default ARTestDrive;
