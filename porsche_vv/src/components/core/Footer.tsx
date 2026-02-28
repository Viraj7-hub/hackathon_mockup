import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="relative py-12 bg-[var(--porsche-black)] border-t border-[var(--porsche-steel)]/8">
            <div className="max-w-[1200px] mx-auto px-6 md:px-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-2.5">
                        <div className="w-[18px] h-[18px] overflow-hidden bg-[var(--porsche-black)] flex items-center justify-center">
                            <img src="/assets/porsche-logo.jpg" alt="Porsche"
                                className="w-[16px] h-auto object-contain"
                                style={{ mixBlendMode: 'lighten', opacity: 0.5 }} />
                        </div>
                        <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--porsche-silver)]/60"
                            style={{ fontFamily: 'var(--font-display)' }}>PORSCHE</span>
                    </div>
                    <div className="flex gap-6">
                        {[
                            { to: '/models', label: 'Models' },
                            { to: '/configurator', label: 'Configure' },
                            { to: '/performance', label: 'Performance' },
                            { to: '/technology', label: 'Technology' },
                        ].map((link) => (
                            <Link key={link.to} to={link.to}
                                className="text-[10px] text-[var(--porsche-silver)]/50 hover:text-[var(--porsche-white)] transition-colors duration-300"
                                style={{ fontFamily: 'var(--font-display)' }}>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
                <motion.div className="pt-5 border-t border-[var(--porsche-steel)]/8 flex items-center justify-between"
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    <span className="text-[8px] tracking-[0.25em] text-[var(--porsche-silver)]/30 uppercase">
                        © 2026 Dr. Ing. h.c. F. Porsche AG
                    </span>
                    <span className="text-[8px] tracking-[0.25em] text-[var(--porsche-silver)]/20 uppercase">
                        There is no substitute.
                    </span>
                </motion.div>
            </div>
        </footer>
    );
}

export default Footer;
