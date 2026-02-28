import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const models = [
    {
        name: '911 GT3 RS',
        tagline: 'Track Precision',
        image: '/assets/911-gt3-rs.jpg',
    },
    {
        name: '911 CARRERA T',
        tagline: 'Pure Driving',
        image: '/assets/911-carrera-t.jpg',
    },
    {
        name: 'CAYENNE TURBO GT',
        tagline: 'Performance SUV',
        image: '/assets/porsche-cayenne.jpg',
    },
];

export function ModelsPreview() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-10%' });
    const navigate = useNavigate();

    return (
        <section ref={ref} className="relative py-28 bg-[var(--porsche-carbon)]">
            <div className="max-w-[1200px] mx-auto px-6 md:px-10">
                <motion.p className="text-[9px] tracking-[0.4em] text-[var(--porsche-red)] uppercase mb-3"
                    style={{ fontFamily: 'var(--font-display)' }}
                    initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.1 }}>The Lineup</motion.p>

                <motion.h2 className="text-[clamp(1.6rem,4vw,3rem)] font-black tracking-[-0.01em] mb-14"
                    style={{ fontFamily: 'var(--font-display)' }}
                    initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}>
                    EVERY DETAIL, <span className="text-gradient-red">PERFECTED</span>
                </motion.h2>

                <div className="space-y-16">
                    {models.map((model, i) => (
                        <motion.div key={model.name}
                            className="relative aspect-[2.2/1] overflow-hidden group cursor-pointer"
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                            onClick={() => navigate('/models')}
                        >
                            <img src={model.image} alt={model.name}
                                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--porsche-black)]/80 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6">
                                <p className="text-[8px] tracking-[0.4em] text-[var(--porsche-red)] uppercase mb-1.5"
                                    style={{ fontFamily: 'var(--font-display)' }}>{model.tagline}</p>
                                <h3 className="text-[clamp(1.2rem,3vw,2.2rem)] font-black tracking-[-0.01em]"
                                    style={{ fontFamily: 'var(--font-display)' }}>{model.name}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ModelsPreview;
