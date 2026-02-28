import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

interface AnimatedTextProps {
    text: string;
    className?: string;
    delay?: number;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
    splitBy?: 'char' | 'word';
    once?: boolean;
}

export function AnimatedText({
    text,
    className = '',
    delay = 0,
    as: Tag = 'h2',
    splitBy = 'word',
    once = true,
}: AnimatedTextProps) {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once, margin: '-10% 0px' });

    const items = splitBy === 'char' ? text.split('') : text.split(' ');

    return (
        <Tag
            ref={ref as React.RefObject<HTMLHeadingElement>}
            className={`overflow-hidden ${className}`}
            style={{ fontFamily: 'var(--font-display)' }}
        >
            {items.map((item, i) => (
                <motion.span
                    key={`${item}-${i}`}
                    className="inline-block"
                    initial={{ y: '110%', opacity: 0, rotateX: -80 }}
                    animate={
                        isInView
                            ? { y: '0%', opacity: 1, rotateX: 0 }
                            : { y: '110%', opacity: 0, rotateX: -80 }
                    }
                    transition={{
                        duration: 0.7,
                        delay: delay + i * (splitBy === 'char' ? 0.03 : 0.08),
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ perspective: '600px' }}
                >
                    {item}
                    {splitBy === 'word' && i < items.length - 1 ? '\u00A0' : ''}
                </motion.span>
            ))}
        </Tag>
    );
}

export default AnimatedText;
