import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { MagneticButton } from '../core/MagneticButton';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (videoRef.current) videoRef.current.playbackRate = 0.8;
    }, []);

    return (
        <section className="relative w-full h-screen overflow-hidden">
            <video ref={videoRef} className="video-bg" autoPlay muted loop playsInline preload="auto"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%230a0a0a' width='1920' height='1080'/%3E%3C/svg%3E">
                <source src="https://cdn.coverr.co/videos/coverr-car-driving-at-night-through-city-1573/1080p.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay" />

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
                <div className="overflow-hidden">
                    <motion.h1
                        className="text-[clamp(3rem,11vw,9rem)] font-black leading-[0.88] tracking-[0.04em] text-center"
                        style={{ fontFamily: 'var(--font-display)' }}
                        initial={{ y: '110%' }} animate={{ y: '0%' }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        PORSCHE
                    </motion.h1>
                </div>

                <motion.div className="w-10 h-[1px] bg-[var(--porsche-red)] mt-6"
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }} />

                <motion.p
                    className="text-[10px] tracking-[0.4em] text-[var(--porsche-silver)]/70 mt-5 uppercase"
                    style={{ fontFamily: 'var(--font-display)' }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                >
                    Engineered for the Soul
                </motion.p>

                <motion.div className="mt-10"
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.8 }}>
                    <MagneticButton
                        className="group relative px-8 py-3 border border-[var(--porsche-red)]/80 bg-transparent overflow-hidden"
                        onClick={() => navigate('/models')} strength={0.15}
                    >
                        <span className="absolute inset-0 bg-[var(--porsche-red)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                        <span className="relative z-10 text-[9px] font-medium tracking-[0.25em] text-[var(--porsche-white)] uppercase"
                            style={{ fontFamily: 'var(--font-display)' }}>
                            Feel the Performance
                        </span>
                    </MagneticButton>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
                initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 2.2 }}>
                <motion.div className="w-[1px] h-8 bg-gradient-to-b from-[var(--porsche-red)] to-transparent"
                    animate={{ scaleY: [0, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
                    style={{ transformOrigin: 'top' }} />
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--porsche-black)] to-transparent z-[5]" />
        </section>
    );
}

export default HeroSection;
