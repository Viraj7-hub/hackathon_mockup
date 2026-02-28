import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export function SpeedTransition() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-20%' });

    return (
        <section ref={ref} className="relative h-[30vh] overflow-hidden bg-[var(--porsche-carbon)] flex items-center justify-center">
            {/* Minimal speed streaks */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div key={i} className="absolute h-[1px]"
                        style={{
                            top: `${20 + i * 15}%`,
                            left: 0,
                            width: `${25 + Math.random() * 25}%`,
                            background: i === 2
                                ? 'linear-gradient(90deg, transparent, var(--porsche-red), transparent)'
                                : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                        }}
                        initial={{ x: '-100%', opacity: 0 }}
                        animate={isInView ? { x: '400%', opacity: 0.5 } : {}}
                        transition={{ duration: 2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    />
                ))}
            </div>

            <div className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse at center, transparent 0%, var(--porsche-carbon) 70%)' }} />

            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[var(--porsche-black)] to-transparent z-20" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--porsche-carbon)] to-transparent z-20" />
        </section>
    );
}

export default SpeedTransition;
