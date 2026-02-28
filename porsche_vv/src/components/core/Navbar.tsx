import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { MagneticButton } from './MagneticButton';

const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/models', label: 'MODELS' },
    { path: '/configurator', label: 'CONFIGURE' },
    { path: '/performance', label: 'PERFORMANCE' },
    { path: '/technology', label: 'TECHNOLOGY' },
];

export function Navbar() {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setIsMobileOpen(false); }, [location]);

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${isScrolled ? 'glass py-4' : 'bg-transparent py-6'
                    }`}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="relative z-10">
                        <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                            <div className="w-[40px] h-[40px] overflow-hidden bg-[var(--porsche-black)] flex items-center justify-center rounded-sm">
                                <img src="/assets/porsche-logo.jpg" alt="Porsche"
                                    className="w-[38px] h-auto object-contain"
                                    style={{ mixBlendMode: 'lighten' }} />
                            </div>
                            <span className="text-[14px] font-bold tracking-[0.25em] text-[var(--porsche-white)]"
                                style={{ fontFamily: 'var(--font-display)' }}>PORSCHE</span>
                        </motion.div>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link key={link.path} to={link.path}>
                                <span className={`text-[12px] font-medium tracking-[0.2em] transition-colors duration-300 ${location.pathname === link.path
                                    ? 'text-[var(--porsche-red)]'
                                    : 'text-[var(--porsche-silver)] hover:text-[var(--porsche-white)]'
                                    }`} style={{ fontFamily: 'var(--font-display)' }}>
                                    {link.label}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile toggle */}
                    <MagneticButton
                        className="lg:hidden relative z-10 w-8 h-8 flex flex-col items-center justify-center gap-1"
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                    >
                        <motion.span className="block w-4 h-[1px] bg-[var(--porsche-white)]"
                            animate={{ rotate: isMobileOpen ? 45 : 0, y: isMobileOpen ? 2.5 : 0 }} />
                        <motion.span className="block w-4 h-[1px] bg-[var(--porsche-white)]"
                            animate={{ opacity: isMobileOpen ? 0 : 1 }} />
                        <motion.span className="block w-4 h-[1px] bg-[var(--porsche-white)]"
                            animate={{ rotate: isMobileOpen ? -45 : 0, y: isMobileOpen ? -2.5 : 0 }} />
                    </MagneticButton>
                </div>
            </motion.nav>

            {/* Mobile overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div className="fixed inset-0 z-[999] bg-[var(--porsche-black)]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-7"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {navLinks.map((link, i) => (
                            <motion.div key={link.path}
                                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                transition={{ delay: i * 0.05 }}>
                                <Link to={link.path}>
                                    <span className={`text-lg font-bold tracking-[0.12em] ${location.pathname === link.path ? 'text-[var(--porsche-red)]' : 'text-[var(--porsche-white)]'
                                        }`} style={{ fontFamily: 'var(--font-display)' }}>{link.label}</span>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Navbar;
