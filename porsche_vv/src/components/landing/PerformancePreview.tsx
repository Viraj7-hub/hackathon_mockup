import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export function PerformancePreview() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-15%' });

    return (
        <section ref={ref} className="relative py-36 bg-[var(--porsche-black)]">
            <div className="max-w-[900px] mx-auto px-6 md:px-10 text-center">
                <motion.p className="text-[10px] tracking-[0.4em] text-[var(--porsche-red)] uppercase mb-6"
                    style={{ fontFamily: 'var(--font-display)' }}
                    initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}>
                    Performance Lab
                </motion.p>

                <motion.h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black tracking-[-0.02em] leading-[0.9]"
                    style={{ fontFamily: 'var(--font-display)' }}
                    initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.15 }}>
                    510 <span className="text-[var(--porsche-red)]">PS</span>
                </motion.h2>

                <motion.p className="text-[14px] text-[var(--porsche-white)]/55 mt-5 max-w-md mx-auto leading-[1.7]"
                    style={{ fontFamily: 'var(--font-body)' }}
                    initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 }}>
                    Naturally aspirated. 9,000 RPM redline. Zero turbochargers, zero compromise.
                    This is what a motorsport-derived flat-six sounds like at full throttle.
                </motion.p>
            </div>
        </section>
    );
}

export default PerformancePreview;
