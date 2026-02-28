import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { AnimatedText } from '../components/core/AnimatedText';
import { Footer } from '../components/core/Footer';

/* ── Animated counter ── */
function Counter({ end, suffix = '', duration = 2.2 }: { end: number; suffix?: string; duration?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref as any, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const start = performance.now();
        const animate = (now: number) => {
            const elapsed = (now - start) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isInView, end, duration]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ── Power bar ── */
function PowerBar({ label, value, max, unit, note, delay }: { label: string; value: number; max: number; unit: string; note: string; delay: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-10%' });
    const pct = (value / max) * 100;

    return (
        <motion.div ref={ref} className="py-5 border-b border-[var(--porsche-steel)]/10 last:border-0"
            initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex justify-between items-baseline mb-1.5">
                <span className="text-[11px] tracking-[0.2em] text-[var(--porsche-white)]/80 uppercase font-medium"
                    style={{ fontFamily: 'var(--font-display)' }}>{label}</span>
                <span className="text-[20px] font-black text-[var(--porsche-white)]"
                    style={{ fontFamily: 'var(--font-display)' }}>
                    {value.toLocaleString()} <span className="text-[12px] text-[var(--porsche-red)] font-bold">{unit}</span>
                </span>
            </div>
            <div className="h-[3px] bg-[var(--porsche-steel)]/15 overflow-hidden rounded-full mb-2">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-[var(--porsche-red)] to-[var(--porsche-red)]/50"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${pct}%` } : {}}
                    transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }} />
            </div>
            <p className="text-[12px] text-[var(--porsche-silver)]/60 leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}>{note}</p>
        </motion.div>
    );
}

const metrics = [
    { label: 'Power', value: 510, max: 600, unit: 'PS', note: 'Naturally aspirated flat-six. No turbochargers, no compromise.' },
    { label: 'Torque', value: 470, max: 600, unit: 'Nm', note: 'Peak torque at 6,250 RPM — designed for high-rev delivery.' },
    { label: 'Top Speed', value: 318, max: 350, unit: 'km/h', note: 'Aerodynamic efficiency meets raw straight-line performance.' },
    { label: 'Redline', value: 9000, max: 10000, unit: 'RPM', note: 'The flat-six screams to 9,000 RPM — pure motorsport engineering.' },
];

export function PerformanceLab() {
    const heroRef = useRef<HTMLDivElement>(null);
    const isHeroInView = useInView(heroRef, { once: true });

    /* Scroll-driven acceleration */
    const accelRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: accelRef, offset: ['start end', 'end start'] });
    const accelValue = useTransform(scrollYProgress, [0.2, 0.7], [0, 3.2]);
    const [displayAccel, setDisplayAccel] = useState('0.0');

    useEffect(() => {
        const unsub = accelValue.on('change', (v) => setDisplayAccel(v.toFixed(1)));
        return unsub;
    }, [accelValue]);

    return (
        <main className="noise-overlay">
            {/* ── Hero ── */}
            <section ref={heroRef} className="relative h-[55vh] flex items-end pb-16 bg-[var(--porsche-black)]">
                <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at 50% 140%, rgba(213,0,28,0.05) 0%, transparent 55%)',
                }} />
                <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 w-full">
                    <motion.p className="text-[10px] tracking-[0.4em] text-[var(--porsche-red)] uppercase mb-4"
                        style={{ fontFamily: 'var(--font-display)' }}
                        initial={{ opacity: 0 }} animate={isHeroInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5 }}>Performance Lab</motion.p>
                    <AnimatedText text="BUILT TO DOMINATE" as="h1"
                        className="text-[clamp(2.5rem,6.5vw,5.5rem)] font-black tracking-[-0.02em]" delay={0.6} />
                    <motion.p className="text-[14px] text-[var(--porsche-white)]/60 mt-5 max-w-md leading-[1.7]"
                        style={{ fontFamily: 'var(--font-body)' }}
                        initial={{ opacity: 0, y: 12 }} animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 1 }}>
                        Every number tells a story of engineering obsession. Every measurement, validated on track.
                    </motion.p>
                </div>
            </section>

            {/* ── Giant stat + secondary counters ── */}
            <section className="py-32 bg-[var(--porsche-carbon)]">
                <div className="max-w-[1000px] mx-auto px-6 md:px-10">
                    <div className="grid md:grid-cols-[1fr,auto] gap-12 items-end mb-24">
                        <div>
                            <motion.p className="text-[10px] tracking-[0.4em] text-[var(--porsche-red)] uppercase mb-3"
                                style={{ fontFamily: 'var(--font-display)' }}
                                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                                Naturally Aspirated Flat-Six
                            </motion.p>
                            <motion.h2 className="text-[clamp(4rem,11vw,8rem)] font-black leading-[0.85] tracking-[-0.03em]"
                                style={{ fontFamily: 'var(--font-display)' }}
                                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                                <Counter end={510} /> <span className="text-[var(--porsche-red)]">PS</span>
                            </motion.h2>
                            <motion.p className="text-[14px] text-[var(--porsche-white)]/50 mt-4 max-w-sm leading-[1.7]"
                                style={{ fontFamily: 'var(--font-body)' }}
                                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                                transition={{ delay: 0.4 }}>
                                Derived from the 911 GT3 Cup race car. Every revolution is felt, not filtered.
                            </motion.p>
                        </div>

                        <motion.div className="flex gap-12 pb-3"
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            transition={{ delay: 0.5 }}>
                            {[
                                { val: '470', unit: 'Nm', label: 'Peak Torque' },
                                { val: '9,000', unit: 'RPM', label: 'Redline' },
                            ].map((s) => (
                                <div key={s.label}>
                                    <span className="text-[24px] font-black text-[var(--porsche-white)]" style={{ fontFamily: 'var(--font-display)' }}>{s.val}</span>
                                    <span className="text-[11px] text-[var(--porsche-red)] font-bold ml-1">{s.unit}</span>
                                    <p className="text-[9px] tracking-[0.25em] text-[var(--porsche-white)]/35 uppercase mt-1.5"
                                        style={{ fontFamily: 'var(--font-display)' }}>{s.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── Power bars with descriptions ── */}
                    <div>
                        {metrics.map((m, i) => (
                            <PowerBar key={m.label} {...m} delay={i * 0.08} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Scroll-driven acceleration ── */}
            <section ref={accelRef} className="relative h-[120vh] bg-[var(--porsche-black)]">
                <div className="sticky top-0 h-screen flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-[10px] tracking-[0.4em] text-[var(--porsche-red)] uppercase mb-5"
                            style={{ fontFamily: 'var(--font-display)' }}>0–100 km/h</p>
                        <div className="text-[clamp(5rem,16vw,11rem)] font-black leading-[0.85] tracking-[-0.04em]"
                            style={{ fontFamily: 'var(--font-display)' }}>
                            {displayAccel}<span className="text-[clamp(1.5rem,3.5vw,2.5rem)] text-[var(--porsche-red)] ml-2">s</span>
                        </div>
                        <motion.div className="w-16 h-[1px] mx-auto mt-7"
                            style={{ background: 'linear-gradient(90deg, transparent, var(--porsche-red), transparent)' }} />
                        <p className="text-[11px] tracking-[0.2em] text-[var(--porsche-white)]/30 uppercase mt-4"
                            style={{ fontFamily: 'var(--font-display)' }}>Scroll to accelerate</p>
                        <p className="text-[13px] text-[var(--porsche-white)]/40 mt-3 max-w-xs mx-auto leading-relaxed"
                            style={{ fontFamily: 'var(--font-body)' }}>
                            Launch control engaged. Rear tyres break traction at 1.4g.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

export default PerformanceLab;
