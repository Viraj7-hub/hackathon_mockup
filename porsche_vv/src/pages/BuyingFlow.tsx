import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { AnimatedText } from '../components/core/AnimatedText';
import { MagneticButton } from '../components/core/MagneticButton';
import { Footer } from '../components/core/Footer';

interface ConfigData {
    model: string;
    color: { name: string; hex: string; price: number };
    wheel: { name: string; style: string; price: number };
    interior: { name: string; hex: string; price: number };
    package: { name: string; hp: number; torque: number; accel: string; topSpeed: number; price: number };
    totalPrice: number;
    id: string;
}

export function BuyingFlow() {
    const [config, setConfig] = useState<ConfigData | null>(null);
    const [step, setStep] = useState<'review' | 'confirmed'>('review');
    const navigate = useNavigate();

    useEffect(() => {
        const saved = localStorage.getItem('porsche-current-config');
        if (saved) setConfig(JSON.parse(saved));
    }, []);

    if (!config) {
        return (
            <main className="noise-overlay min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <AnimatedText text="NO CONFIGURATION FOUND" as="h1"
                        className="text-2xl font-black tracking-[-0.02em] mb-8" />
                    <MagneticButton
                        className="group relative px-10 py-4 border border-[var(--porsche-red)] bg-transparent overflow-hidden"
                        onClick={() => navigate('/configurator')} strength={0.2}>
                        <span className="absolute inset-0 bg-[var(--porsche-red)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                        <span className="relative z-10 text-[10px] font-semibold tracking-[0.3em] text-[var(--porsche-white)] uppercase"
                            style={{ fontFamily: 'var(--font-display)' }}>Build Your Porsche</span>
                    </MagneticButton>
                </div>
            </main>
        );
    }

    return (
        <main className="noise-overlay">
            <section className="relative min-h-screen pt-32 pb-20 bg-[var(--porsche-black)]">
                <div className="max-w-[700px] mx-auto px-6 md:px-12">
                    <motion.p className="text-[10px] tracking-[0.5em] text-[var(--porsche-red)] uppercase mb-3"
                        style={{ fontFamily: 'var(--font-display)' }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                        {step === 'review' ? 'Configuration Review' : 'Confirmed'}
                    </motion.p>

                    <AnimatedText
                        text={step === 'confirmed' ? 'YOUR PORSCHE AWAITS' : `YOUR ${config.model}`}
                        as="h1" className="text-[clamp(2rem,6vw,4rem)] font-black tracking-[-0.02em] mb-12" delay={0.4} />

                    {step === 'review' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                            {[
                                { label: 'Exterior', value: config.color.name, price: config.color.price },
                                { label: 'Wheels', value: config.wheel.name, price: config.wheel.price },
                                { label: 'Interior', value: config.interior.name, price: config.interior.price },
                                { label: 'Package', value: config.package.name, price: config.package.price },
                            ].map((item) => (
                                <div key={item.label} className="flex justify-between py-4 border-b border-[var(--porsche-steel)]/10">
                                    <div>
                                        <p className="text-[9px] tracking-[0.3em] text-[var(--porsche-silver)] uppercase">{item.label}</p>
                                        <p className="text-sm text-[var(--porsche-white)] font-medium mt-0.5">{item.value}</p>
                                    </div>
                                    <p className="text-sm text-[var(--porsche-silver)] self-end">
                                        {item.price > 0 ? `+€${item.price.toLocaleString()}` : 'Included'}
                                    </p>
                                </div>
                            ))}

                            <div className="mt-8 pt-6 border-t border-[var(--porsche-steel)]/15 flex justify-between items-center">
                                <span className="text-[10px] tracking-[0.3em] text-[var(--porsche-silver)] uppercase">Total</span>
                                <span className="text-2xl font-black" style={{ fontFamily: 'var(--font-display)' }}>
                                    €{config.totalPrice.toLocaleString()}
                                </span>
                            </div>

                            <div className="mt-10">
                                <MagneticButton
                                    className="w-full group relative py-4 border border-[var(--porsche-red)] bg-transparent overflow-hidden"
                                    onClick={() => setStep('confirmed')} strength={0.15}>
                                    <span className="absolute inset-0 bg-[var(--porsche-red)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                    <span className="relative z-10 text-[10px] font-semibold tracking-[0.3em] text-[var(--porsche-white)] uppercase"
                                        style={{ fontFamily: 'var(--font-display)' }}>Confirm Reservation</span>
                                </MagneticButton>
                            </div>
                        </motion.div>
                    )}

                    {step === 'confirmed' && (
                        <motion.div className="text-center"
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
                            <motion.div className="w-14 h-14 mx-auto mb-6 rounded-full bg-[var(--porsche-red)]/10 flex items-center justify-center"
                                animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--porsche-red)" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </motion.div>
                            <p className="text-sm text-[var(--porsche-silver)] leading-relaxed mb-2">
                                Your {config.model} in {config.color.name} has been reserved.
                            </p>
                            <p className="text-[10px] text-[var(--porsche-silver)]/50">
                                A Porsche specialist will reach out within 24 hours.
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default BuyingFlow;
