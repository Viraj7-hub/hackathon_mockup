import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const lines = [
    { text: 'Performance is engineered.', opacity: 0.35 },
    { text: 'Precision at 9,000 RPM.', opacity: 0.5 },
    { text: 'There is no substitute.', opacity: 1 },
];

export function ScrollNarrative() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-15%' });

    return (
        <section ref={ref} className="relative py-36 bg-[var(--porsche-black)]">
            <div className="max-w-[1000px] mx-auto px-6 md:px-10">
                <div className="space-y-6">
                    {lines.map((line, i) => (
                        <motion.h2 key={i}
                            className="text-[clamp(1.5rem,3.5vw,2.8rem)] font-black tracking-[-0.01em] text-[var(--porsche-white)]"
                            style={{ fontFamily: 'var(--font-display)' }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: line.opacity, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}>
                            {line.text}
                        </motion.h2>
                    ))}
                </div>
                <motion.p className="text-[13px] text-[var(--porsche-white)]/35 mt-10 max-w-sm leading-[1.7]"
                    style={{ fontFamily: 'var(--font-body)' }}
                    initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}>
                    Since 1948, Porsche has built machines that challenge the limits of physics and emotion.
                </motion.p>
            </div>
        </section>
    );
}

export default ScrollNarrative;
