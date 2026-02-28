import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export function TechPreview() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-15%' });

    return (
        <section ref={ref} className="relative py-36 bg-[var(--porsche-carbon)]">
            <div className="max-w-[900px] mx-auto px-6 md:px-10 text-center">
                <motion.h2 className="text-[clamp(1.6rem,4.5vw,3.5rem)] font-black tracking-[-0.01em] leading-[1.05]"
                    style={{ fontFamily: 'var(--font-display)' }}
                    initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}>
                    BEYOND <span className="text-gradient-red">ENGINEERING</span>
                </motion.h2>

                <motion.p className="text-[14px] text-[var(--porsche-white)]/55 mt-5 max-w-lg mx-auto leading-[1.7]"
                    style={{ fontFamily: 'var(--font-body)' }}
                    initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 }}>
                    Active aerodynamics, carbon monocoque construction, and AI-driven torque vectoring —
                    each system engineered to make the driver faster and more connected to the road.
                </motion.p>
            </div>
        </section>
    );
}

export default TechPreview;
