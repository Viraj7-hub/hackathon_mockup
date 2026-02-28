import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { AnimatedText } from '../components/core/AnimatedText';
import { MagneticButton } from '../components/core/MagneticButton';
import { Footer } from '../components/core/Footer';

interface SavedConfig {
    model: string;
    color: { name: string; hex: string };
    wheel: { name: string };
    interior: { name: string };
    package: { name: string; hp: number };
    totalPrice: number;
    id: string;
}

const ownershipSteps = [
    { title: 'Configure', desc: 'Design your perfect Porsche', icon: '⚙️' },
    { title: 'Reserve', desc: 'Secure your build slot', icon: '🔒' },
    { title: 'Production', desc: 'Crafted in Stuttgart', icon: '🏭' },
    { title: 'Delivery', desc: 'Your Porsche arrives', icon: '🏁' },
];

const suggestions = [
    { title: '911 GT3 RS', desc: 'Track-bred. Road-legal. Uncompromising.', cta: 'Explore' },
    { title: 'Taycan Turbo S (Electric)', desc: 'The soul, electrified. 761 PS of instant torque.', cta: 'Discover' },
    { title: 'Porsche Driving Experience', desc: 'Master your machine at the Porsche Experience Center.', cta: 'Learn More' },
];

export function Experience() {
    const [configs, setConfigs] = useState<SavedConfig[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('porsche-configs') || '[]');
        setConfigs(saved);
    }, []);

    return (
        <main className="noise-overlay">
            {/* Hero */}
            <section className="relative h-[55vh] flex items-end pb-16 bg-[var(--porsche-black)]">
                <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at 30% 70%, rgba(213,0,28,0.06) 0%, transparent 60%)',
                }} />
                <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
                    <motion.div className="flex items-center gap-4 mb-4"
                        initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}>
                        <div className="w-12 h-[1px] bg-[var(--porsche-red)]" />
                        <span className="text-[10px] tracking-[0.5em] text-[var(--porsche-red)] uppercase"
                            style={{ fontFamily: 'var(--font-display)' }}>Your Porsche Journey</span>
                    </motion.div>
                    <AnimatedText text="YOUR EXPERIENCE" as="h1"
                        className="text-[clamp(2.5rem,8vw,7rem)] font-black tracking-[-0.02em]" delay={0.5} />
                </div>
            </section>

            {/* Saved Designs */}
            <section className="py-20 bg-[var(--porsche-carbon)]">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <motion.h2 className="text-[10px] tracking-[0.5em] text-[var(--porsche-red)] uppercase mb-8"
                        style={{ fontFamily: 'var(--font-display)' }}
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        Your Saved Designs
                    </motion.h2>
                    {configs.length > 0 ? (
                        <div className="grid md:grid-cols-3 gap-6">
                            {configs.map((cfg, i) => (
                                <motion.div key={cfg.id} className="glass-light p-6 group hover:border-[var(--porsche-red)]/20 transition-all duration-500"
                                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                                    <div className="w-12 h-12 rounded-full mb-4" style={{
                                        background: `radial-gradient(circle, ${cfg.color.hex} 30%, transparent 70%)`,
                                    }} />
                                    <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>{cfg.model}</h3>
                                    <p className="text-xs text-[var(--porsche-silver)]">{cfg.color.name} · {cfg.wheel.name} · {cfg.package.name}</p>
                                    <p className="text-sm font-bold mt-3 text-[var(--porsche-white)]"
                                        style={{ fontFamily: 'var(--font-display)' }}>€{cfg.totalPrice.toLocaleString()}</p>
                                    <MagneticButton
                                        className="mt-4 w-full group/btn relative py-2.5 border border-[var(--porsche-steel)]/30 bg-transparent overflow-hidden"
                                        onClick={() => {
                                            localStorage.setItem('porsche-current-config', JSON.stringify(cfg));
                                            navigate('/buying');
                                        }} strength={0.15}>
                                        <span className="relative z-10 text-[10px] font-semibold tracking-[0.2em] text-[var(--porsche-chrome)] uppercase"
                                            style={{ fontFamily: 'var(--font-display)' }}>Resume</span>
                                    </MagneticButton>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div className="glass-light p-12 text-center"
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                            <p className="text-[var(--porsche-silver)] mb-6">No saved designs yet. Begin your journey.</p>
                            <MagneticButton
                                className="group relative px-8 py-3.5 border border-[var(--porsche-red)] bg-transparent overflow-hidden"
                                onClick={() => navigate('/configurator')} strength={0.2}>
                                <span className="absolute inset-0 bg-[var(--porsche-red)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                <span className="relative z-10 text-[11px] font-semibold tracking-[0.3em] text-[var(--porsche-white)] uppercase"
                                    style={{ fontFamily: 'var(--font-display)' }}>Build Your Porsche</span>
                            </MagneticButton>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Ownership Timeline */}
            <section className="py-20 bg-[var(--porsche-black)]">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <AnimatedText text="THE OWNERSHIP JOURNEY" as="h2"
                        className="text-[clamp(1.5rem,4vw,3rem)] font-black tracking-[-0.02em] mb-16" />
                    <div className="grid md:grid-cols-4 gap-0">
                        {ownershipSteps.map((step, i) => (
                            <motion.div key={step.title}
                                className="relative p-8 border-r border-[var(--porsche-steel)]/10 last:border-r-0"
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                                <span className="text-3xl mb-4 block">{step.icon}</span>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[9px] text-[var(--porsche-red)] font-bold"
                                        style={{ fontFamily: 'var(--font-display)' }}>0{i + 1}</span>
                                    <div className="w-4 h-[1px] bg-[var(--porsche-red)]" />
                                </div>
                                <h3 className="text-sm font-bold tracking-[0.1em] mb-2"
                                    style={{ fontFamily: 'var(--font-display)' }}>{step.title.toUpperCase()}</h3>
                                <p className="text-xs text-[var(--porsche-silver)]">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Suggestions */}
            <section className="py-20 bg-[var(--porsche-carbon)]">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <AnimatedText text="RECOMMENDED FOR YOU" as="h2"
                        className="text-[clamp(1.5rem,4vw,3rem)] font-black tracking-[-0.02em] mb-12" />
                    <div className="grid md:grid-cols-3 gap-6">
                        {suggestions.map((s, i) => (
                            <motion.div key={s.title}
                                className="glass-light p-8 group hover:border-[var(--porsche-red)]/20 transition-all duration-500"
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                                <h3 className="text-lg font-bold tracking-[0.1em] mb-3"
                                    style={{ fontFamily: 'var(--font-display)' }}>{s.title}</h3>
                                <p className="text-sm text-[var(--porsche-silver)] leading-relaxed mb-6">{s.desc}</p>
                                <span className="text-[10px] tracking-[0.3em] text-[var(--porsche-red)] uppercase cursor-pointer hover:underline"
                                    style={{ fontFamily: 'var(--font-display)' }}>{s.cta} →</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

export default Experience;
