import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { AnimatedText } from '../components/core/AnimatedText';
import { Footer } from '../components/core/Footer';

const innovations = [
    {
        number: '01',
        title: 'ACTIVE AERODYNAMICS',
        stat: '860 kg',
        statLabel: 'Downforce',
        description: 'Multi-element wing and underbody diffuser deploy in real-time, adapting to speed and cornering forces. Every surface generates purpose.',
    },
    {
        number: '02',
        title: 'CARBON MONOCOQUE',
        stat: '1,340 kg',
        statLabel: 'Kerb Weight',
        description: 'Full carbon fibre chassis with aluminium subframes. Structural rigidity increased 18% while saving 200 kg over conventional construction.',
    },
    {
        number: '03',
        title: 'REAR-AXLE STEERING',
        stat: '2.5°',
        statLabel: 'Deflection',
        description: 'Counter-phase steering at low speed for agility. In-phase at high speed for stability. The rear wheels think before you do.',
    },
    {
        number: '04',
        title: 'TORQUE VECTORING',
        stat: '1,000×/s',
        statLabel: 'Adjustments',
        description: 'AI-driven differential distributes torque 1,000 times per second across all four wheels. Precision beyond human reaction time.',
    },
];

function TechCard({ item }: { item: typeof innovations[0] }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-8%' });

    return (
        <motion.div ref={ref}
            className="grid md:grid-cols-[1.2fr,0.8fr] gap-10 md:gap-16 py-16 border-b border-[var(--porsche-steel)]/10 last:border-0"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>

            {/* Left: number + title + description */}
            <div>
                <div className="flex items-baseline gap-4 mb-5">
                    <span className="text-[28px] font-black text-[var(--porsche-red)]/25"
                        style={{ fontFamily: 'var(--font-display)' }}>{item.number}</span>
                    <h3 className="text-[15px] font-bold tracking-[0.1em] text-[var(--porsche-white)]"
                        style={{ fontFamily: 'var(--font-display)' }}>{item.title}</h3>
                </div>
                <p className="text-[14px] text-[var(--porsche-white)]/55 leading-[1.8] max-w-[420px] pl-[48px]"
                    style={{ fontFamily: 'var(--font-body)' }}>
                    {item.description}
                </p>
            </div>

            {/* Right: stat block */}
            <div className="flex flex-col items-start md:items-end justify-center">
                <motion.div className="relative pl-5"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}>
                    {/* Red accent bar */}
                    <motion.div className="absolute left-0 top-0 w-[2px] h-0 bg-[var(--porsche-red)]"
                        animate={isInView ? { height: '100%' } : {}}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} />
                    <span className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-black text-[var(--porsche-white)] leading-none block"
                        style={{ fontFamily: 'var(--font-display)' }}>{item.stat}</span>
                    <p className="text-[10px] tracking-[0.25em] text-[var(--porsche-white)]/40 uppercase mt-2"
                        style={{ fontFamily: 'var(--font-display)' }}>{item.statLabel}</p>
                </motion.div>
            </div>
        </motion.div>
    );
}

export function Technology() {
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    /* Scroll-expanding divider */
    const parallaxRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ['start end', 'end start'] });
    const lineWidth = useTransform(scrollYProgress, [0, 0.5], ['0%', '100%']);

    return (
        <main className="noise-overlay">
            {/* ── Hero ── */}
            <section ref={heroRef} className="relative h-[55vh] flex items-end pb-16 bg-[var(--porsche-black)]">
                <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at 30% 120%, rgba(213,0,28,0.03) 0%, transparent 50%)',
                }} />
                <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 w-full">
                    <motion.p className="text-[10px] tracking-[0.4em] text-[var(--porsche-red)] uppercase mb-4"
                        style={{ fontFamily: 'var(--font-display)' }}
                        initial={{ opacity: 0 }} animate={isHeroInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5 }}>Engineering Excellence</motion.p>
                    <AnimatedText text="INTELLIGENCE, ENGINEERED" as="h1"
                        className="text-[clamp(2.2rem,6vw,5rem)] font-black tracking-[-0.02em]" delay={0.6} />
                    <motion.p className="text-[14px] text-[var(--porsche-white)]/55 mt-5 max-w-lg leading-[1.8]"
                        style={{ fontFamily: 'var(--font-body)' }}
                        initial={{ opacity: 0, y: 12 }} animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 1 }}>
                        Where physics meets computation. Every system exists for one purpose — to make the driver faster, safer, and more connected to the road.
                    </motion.p>
                </div>
            </section>

            {/* ── Scroll-expanding divider ── */}
            <div ref={parallaxRef} className="relative py-10 bg-[var(--porsche-black)]">
                <div className="max-w-[1200px] mx-auto px-6 md:px-10">
                    <motion.div className="h-[1px] bg-gradient-to-r from-[var(--porsche-red)] to-[var(--porsche-red)]/20"
                        style={{ width: lineWidth }} />
                </div>
            </div>

            {/* ── Innovation cards ── */}
            <section className="py-24 bg-[var(--porsche-carbon)]">
                <div className="max-w-[1100px] mx-auto px-6 md:px-10">
                    {innovations.map((item) => (
                        <TechCard key={item.number} item={item} />
                    ))}
                </div>
            </section>

            {/* ── Bottom manifesto ── */}
            <section className="py-32 bg-[var(--porsche-black)]">
                <div className="max-w-[1100px] mx-auto px-6 md:px-10">
                    <motion.h2 className="text-[clamp(1.6rem,4.5vw,3rem)] font-black tracking-[-0.01em] leading-[1.1]"
                        style={{ fontFamily: 'var(--font-display)' }}
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.7 }}>
                        EVERY COMPONENT <span className="text-gradient-red">SERVES A PURPOSE</span>
                    </motion.h2>
                    <motion.p className="text-[13px] text-[var(--porsche-white)]/40 mt-6 leading-[1.7] max-w-md"
                        style={{ fontFamily: 'var(--font-body)' }}
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                        viewport={{ once: true }} transition={{ delay: 0.3 }}>
                        Nothing decorative. Nothing unnecessary. Every gram, every angle, every algorithm — engineered for a single measurable outcome.
                    </motion.p>
                </div>
            </section>

            <Footer />
        </main>
    );
}

export default Technology;
