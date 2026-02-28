import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 700);
        }, 2800);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[99999] bg-[#050505] flex items-center justify-center"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* Cinematic red glow */}
                    <motion.div className="absolute w-[500px] h-[500px] rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(213,0,28,0.12) 0%, transparent 65%)' }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.1 }}
                        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }} />

                    <motion.div className="relative z-10 flex flex-col items-center"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>

                        {/* Logo — large, iconic, commanding */}
                        <div className="w-[360px] h-[360px] overflow-hidden bg-[#050505] flex items-center justify-center">
                            <img src="/assets/porsche-logo.jpg" alt="Porsche"
                                className="w-[330px] h-auto object-contain"
                                style={{ mixBlendMode: 'lighten' }} />
                        </div>

                        {/* Subtle horizontal accent line */}
                        <motion.div className="w-24 h-[1px] bg-[var(--porsche-red)] mt-8"
                            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                            transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }} />

                        {/* Tagline */}
                        <motion.p className="text-[28px] tracking-[0.3em] text-[var(--porsche-white)]/80 mt-6 uppercase font-black"
                            style={{ fontFamily: 'var(--font-display)' }}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1.6 }}>
                            There is no substitute
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default IntroSequence;
