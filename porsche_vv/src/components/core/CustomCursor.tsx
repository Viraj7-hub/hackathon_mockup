import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const mousePos = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Only show custom cursor on desktop
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        document.documentElement.classList.add('custom-cursor');
        setIsVisible(true);

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[data-cursor="pointer"]')
            ) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[data-cursor="pointer"]')
            ) {
                setIsHovering(false);
            }
        };

        // Smooth ring following with lerp
        let animationId: number;
        const animate = () => {
            const lerp = 0.15;
            ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
            ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

            if (ringRef.current) {
                const size = isHovering ? 30 : 20;
                ringRef.current.style.transform = `translate(${ringPos.current.x - size}px, ${ringPos.current.y - size}px)`;
            }

            animationId = requestAnimationFrame(animate);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);
        animationId = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(animationId);
            document.documentElement.classList.remove('custom-cursor');
        };
    }, [isHovering]);

    if (!isVisible) return null;

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <motion.div
                ref={ringRef}
                className={`cursor-ring ${isHovering ? 'expanded' : ''}`}
                animate={{
                    width: isHovering ? 60 : 40,
                    height: isHovering ? 60 : 40,
                }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
        </>
    );
}

export default CustomCursor;
