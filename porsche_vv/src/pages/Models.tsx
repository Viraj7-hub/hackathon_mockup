import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { AnimatedText } from '../components/core/AnimatedText';
import { Footer } from '../components/core/Footer';

const models = [
    {
        name: '911 GT3 RS',
        tagline: 'Track Precision',
        description: 'Motorsport technology meets road legality. The most extreme naturally aspirated Porsche.',
        image: '/assets/911-gt3-rs.jpg',
        specs: {
            engine: '4.0L Flat-Six, Naturally Aspirated',
            power: '525 PS @ 8,500 RPM',
            torque: '465 Nm @ 6,300 RPM',
            accel: '3.2 s',
            topSpeed: '296 km/h',
            drivetrain: 'Rear-Wheel Drive',
            transmission: '7-Speed PDK',
            weight: '1,450 kg',
            highlights: [
                'DRS-inspired rear wing with hydraulic adjustment',
                'Centre-lock 20"/21" forged magnesium wheels',
                'Motorsport-derived suspension with ball-joint front axle',
            ],
        },
    },
    {
        name: '911 CARRERA T',
        tagline: 'Pure Driving',
        description: 'Lightweight construction, rear-wheel drive, and a manual gearbox. For the purist.',
        image: '/assets/911-carrera-t.jpg',
        specs: {
            engine: '3.0L Twin-Turbo Flat-Six',
            power: '385 PS @ 6,500 RPM',
            torque: '450 Nm @ 1,950 RPM',
            accel: '4.5 s',
            topSpeed: '291 km/h',
            drivetrain: 'Rear-Wheel Drive',
            transmission: '7-Speed Manual',
            weight: '1,418 kg',
            highlights: [
                'Lightweight glass & reduced insulation',
                'Sport Chrono available as standard',
                'Short-throw manual gearbox with auto-blip',
            ],
        },
    },
    {
        name: '718 CAYMAN GT4 RS',
        tagline: 'Mid-Engine Perfection',
        description: 'The most extreme mid-engine Porsche. 500 PS flat-six, screaming to 9,000 RPM.',
        image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1200&q=80',
        specs: {
            engine: '4.0L Flat-Six, Naturally Aspirated',
            power: '500 PS @ 8,400 RPM',
            torque: '450 Nm @ 6,750 RPM',
            accel: '3.4 s',
            topSpeed: '315 km/h',
            drivetrain: 'Rear-Wheel Drive',
            transmission: '7-Speed PDK',
            weight: '1,415 kg',
            highlights: [
                '911 GT3-derived engine in mid-engine layout',
                'NACA air ducts for direct engine intake',
                'PDK with ultra-short ratios and 8,400 RPM shift points',
            ],
        },
    },
    {
        name: 'TAYCAN TURBO S (ELECTRIC)',
        tagline: 'Soul, Electrified',
        description: '761 PS of instant electric thrust. Performance, redefined.',
        image: '/assets/porsche-taycan.jpg',
        specs: {
            engine: 'Dual Permanent Magnet Synchronous Motors',
            power: '761 PS (Overboost)',
            torque: '1,050 Nm (Combined)',
            accel: '2.8 s',
            topSpeed: '260 km/h',
            drivetrain: 'All-Wheel Drive',
            transmission: '2-Speed Automatic (Rear)',
            weight: '2,295 kg',
            highlights: [
                '800V architecture with 270 kW DC fast charging',
                '93.4 kWh Performance Battery Plus',
                'Porsche Torque Vectoring Plus with rear-axle steering',
            ],
        },
    },
    {
        name: 'CAYENNE TURBO GT',
        tagline: 'Performance SUV',
        description: 'The fastest SUV at the Nürburgring. 659 PS of twin-turbo V8 precision.',
        image: '/assets/porsche-cayenne.jpg',
        specs: {
            engine: '4.0L Twin-Turbo V8',
            power: '659 PS @ 6,000 RPM',
            torque: '850 Nm @ 2,000 RPM',
            accel: '3.3 s',
            topSpeed: '300 km/h',
            drivetrain: 'All-Wheel Drive',
            transmission: '8-Speed Tiptronic S',
            weight: '2,220 kg',
            highlights: [
                'Nürburgring Nordschleife SUV record holder',
                'Titanium exhaust with GT-specific tuning',
                'Adaptive air suspension with PASM sport calibration',
            ],
        },
    },
];

type SpecRow = { label: string; value: string };

function SpecGrid({ specs }: { specs: typeof models[0]['specs'] }) {
    const rows: SpecRow[] = [
        { label: 'Engine', value: specs.engine },
        { label: 'Power', value: specs.power },
        { label: 'Torque', value: specs.torque },
        { label: '0–100 km/h', value: specs.accel },
        { label: 'Top Speed', value: specs.topSpeed },
        { label: 'Drivetrain', value: specs.drivetrain },
        { label: 'Transmission', value: specs.transmission },
        { label: 'Kerb Weight', value: specs.weight },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
        >
            <div className="pt-8 pb-4">
                {/* Spec table */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 mb-8">
                    {rows.map((row) => (
                        <div key={row.label}>
                            <p className="text-[9px] tracking-[0.3em] text-[var(--porsche-white)]/30 uppercase mb-1.5"
                                style={{ fontFamily: 'var(--font-display)' }}>{row.label}</p>
                            <p className="text-[13px] font-medium text-[var(--porsche-white)]/85 leading-snug">{row.value}</p>
                        </div>
                    ))}
                </div>

                {/* Highlights */}
                <div className="border-t border-[var(--porsche-steel)]/10 pt-6">
                    <p className="text-[9px] tracking-[0.3em] text-[var(--porsche-red)] uppercase mb-4"
                        style={{ fontFamily: 'var(--font-display)' }}>Key Highlights</p>
                    <div className="space-y-3">
                        {specs.highlights.map((h, i) => (
                            <motion.div key={i} className="flex items-start gap-3"
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + i * 0.08 }}>
                                <div className="w-[3px] h-[3px] rounded-full bg-[var(--porsche-red)] mt-[7px] flex-shrink-0" />
                                <p className="text-[13px] text-[var(--porsche-white)]/55 leading-[1.6]">{h}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function ModelSection({ model }: { model: typeof models[0] }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-12%' });
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section ref={ref} className="relative bg-[var(--porsche-black)]">
            {/* Image hero — clickable */}
            <div className="relative min-h-[65vh] flex items-center cursor-pointer group"
                onClick={() => setIsExpanded(!isExpanded)}>
                <div className="absolute inset-0">
                    <motion.img src={model.image} alt={model.name}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.08 }} animate={isInView ? { scale: 1 } : {}}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} />
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--porsche-black)]/90 via-[var(--porsche-black)]/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--porsche-black)] via-transparent to-transparent" />
                </div>

                <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 w-full py-16">
                    <motion.p className="text-[9px] tracking-[0.4em] text-[var(--porsche-red)] uppercase mb-3"
                        style={{ fontFamily: 'var(--font-display)' }}
                        initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}>{model.tagline}</motion.p>

                    <AnimatedText text={model.name} as="h2"
                        className="text-[clamp(2rem,5.5vw,4.5rem)] font-black tracking-[-0.02em]" delay={0.4} />

                    <motion.p className="mt-3 text-[var(--porsche-white)]/60 text-[14px] max-w-sm leading-[1.7]"
                        style={{ fontFamily: 'var(--font-body)' }}
                        initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.7 }}>{model.description}</motion.p>

                    {/* View specs indicator */}
                    <motion.div className="mt-6 flex items-center gap-2"
                        initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.9 }}>
                        <span className="text-[10px] tracking-[0.25em] text-[var(--porsche-white)]/40 uppercase group-hover:text-[var(--porsche-white)]/70 transition-colors duration-300"
                            style={{ fontFamily: 'var(--font-display)' }}>
                            {isExpanded ? 'Hide Specs' : 'View Specs'}
                        </span>
                        <motion.span className="text-[var(--porsche-red)] text-sm"
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}>↓</motion.span>
                    </motion.div>
                </div>
            </div>

            {/* Expandable spec panel */}
            <AnimatePresence>
                {isExpanded && (
                    <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10">
                        <SpecGrid specs={model.specs} />
                    </div>
                )}
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[var(--porsche-red)]/40 via-transparent to-transparent" />
        </section>
    );
}

export function Models() {
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    return (
        <main className="noise-overlay">
            <section ref={heroRef} className="relative h-[45vh] flex items-end pb-12 bg-[var(--porsche-black)]">
                <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 w-full">
                    <motion.p className="text-[9px] tracking-[0.4em] text-[var(--porsche-red)] uppercase mb-2"
                        style={{ fontFamily: 'var(--font-display)' }}
                        initial={{ opacity: 0 }} animate={isHeroInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5 }}>The Range</motion.p>
                    <AnimatedText text="EVERY MODEL, ICONIC" as="h1"
                        className="text-[clamp(2rem,6vw,5rem)] font-black tracking-[-0.02em]" delay={0.6} />
                    <motion.p className="text-[13px] text-[var(--porsche-white)]/40 mt-3"
                        style={{ fontFamily: 'var(--font-body)' }}
                        initial={{ opacity: 0 }} animate={isHeroInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.9 }}>
                        Select a model to explore detailed specifications.
                    </motion.p>
                </div>
            </section>

            {models.map((model) => <ModelSection key={model.name} model={model} />)}
            <Footer />
        </main>
    );
}

export default Models;
