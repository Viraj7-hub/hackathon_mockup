import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
    children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
    const location = useLocation();

    return (
        <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            {/* Cinematic wipe overlay */}
            <motion.div
                className="fixed inset-0 z-[9999] bg-[var(--porsche-red)] pointer-events-none"
                initial={{ scaleX: 1, originX: 0 }}
                animate={{ scaleX: 0, originX: 1 }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            />
            <motion.div
                className="fixed inset-0 z-[9998] bg-[var(--porsche-black)] pointer-events-none"
                initial={{ scaleX: 1, originX: 0 }}
                animate={{ scaleX: 0, originX: 1 }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            />
            {children}
        </motion.div>
    );
}

export default PageTransition;
