import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { AnimatedText } from '../components/core/AnimatedText';
import { MagneticButton } from '../components/core/MagneticButton';
import { Footer } from '../components/core/Footer';
import { useAudio } from '../components/core/AudioManager';

/* ===== Model Data ===== */
const models = [
    {
        id: '911-gt3-rs',
        name: '911 GT3 RS',
        tagline: 'Track Precision',
        image: '/assets/911-gt3-rs.jpg',
        basePrice: 229900,
        specs: { hp: 525, accel: '3.2', topSpeed: 296 },
        sketchfab: 'https://sketchfab.com/models/e738eae819c34d19a31dd066c45e0f3d/embed?autostart=1&ui_hint=0&ui_theme=dark&dnt=1',
    },
    {
        id: '911-carrera-t',
        name: '911 CARRERA T',
        tagline: 'Pure Driving',
        image: '/assets/911-carrera-t.jpg',
        basePrice: 118900,
        specs: { hp: 385, accel: '4.5', topSpeed: 291 },
        sketchfab: 'https://sketchfab.com/models/877b1bc1739f4a2bb65d62fd7ffd9f75/embed?autostart=1&ui_hint=0&ui_theme=dark&dnt=1',
    },
    {
        id: 'cayenne-turbo-gt',
        name: 'CAYENNE TURBO GT',
        tagline: 'Performance SUV',
        image: '/assets/porsche-cayenne.jpg',
        basePrice: 198900,
        specs: { hp: 659, accel: '3.3', topSpeed: 300 },
        sketchfab: 'https://sketchfab.com/models/74fbea5a4dfc4197839fdd2bf654369a/embed?autostart=1&ui_hint=0&ui_theme=dark&dnt=1',
    },
    {
        id: 'taycan-turbo-s',
        name: 'TAYCAN TURBO S (ELECTRIC)',
        tagline: 'Soul, Electrified',
        image: '/assets/porsche-taycan.jpg',
        basePrice: 187400,
        specs: { hp: 761, accel: '2.8', topSpeed: 260 },
        sketchfab: 'https://sketchfab.com/models/c3502f68ca0240228db9c301e3ac9394/embed?autostart=1&ui_hint=0&ui_theme=dark&dnt=1',
    },
    {
        id: '718-cayman-gt4-rs',
        name: '718 CAYMAN GT4 RS',
        tagline: 'Mid-Engine Perfection',
        image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1200&q=80',
        basePrice: 143900,
        specs: { hp: 500, accel: '3.4', topSpeed: 315 },
        sketchfab: 'https://sketchfab.com/models/b1d87619f6174f10be47423fcd4de444/embed?autostart=1&ui_hint=0&ui_theme=dark&dnt=1',
    },
];

/* ===== Configuration Options ===== */
const exteriorColors = [
    { name: 'Guards Red', hex: '#C40000', price: 0 },
    { name: 'GT Silver Metallic', hex: '#8C8C8C', price: 1200 },
    { name: 'Jet Black Metallic', hex: '#1a1a1a', price: 800 },
    { name: 'Racing Yellow', hex: '#FFD100', price: 1500 },
    { name: 'Chalk', hex: '#D4D0C8', price: 1000 },
    { name: 'Miami Blue', hex: '#009FE3', price: 2200 },
];

const wheelOptions = [
    { name: '20" 911 Turbo', size: '20"', style: 'Multi-spoke forged alloy', weight: '9.2 kg', price: 0 },
    { name: '20"/21" RS Spyder Design', size: '20"/21"', style: 'Centre-lock lightweight forged', weight: '8.4 kg', price: 4200 },
    { name: '20"/21" Weissach Magnesium', size: '20"/21"', style: 'Magnesium forged, satin black', weight: '6.8 kg', price: 12800 },
    { name: '21" Mission E Design', size: '21"', style: 'Aero-optimised, gloss black', weight: '10.1 kg', price: 3400 },
];

const interiorOptions = [
    { name: 'Black Leather', material: 'Smooth-finish leather', accent: 'Brushed aluminium', hex: '#1a1a1a', price: 0 },
    { name: 'Bordeaux Red Leather', material: 'Extended leather package', accent: 'Carbon fibre', hex: '#4a1520', price: 4800 },
    { name: 'Slate Grey / Chalk', material: 'Two-tone leather combination', accent: 'Dark silver', hex: '#4a4a4a', price: 3600 },
    { name: 'Black Alcantara', material: 'Race-Tex microfibre', accent: 'Satin carbon', hex: '#111111', price: 6200 },
    { name: 'Cognac Leather', material: 'Club leather, natural grain', accent: 'Dark wood', hex: '#6b3a1f', price: 5400 },
];

const performancePackages = [
    { name: 'Standard', desc: 'Factory specification', hpBoost: 0, price: 0 },
    { name: 'Sport Chrono Package', desc: 'Model-specific mode switch, launch control, dynamic engine mounts', hpBoost: 0, price: 2900 },
    { name: 'Lightweight Package', desc: 'Carbon bucket seats, lightweight glass, reduced insulation', hpBoost: 0, price: 8900 },
    { name: 'Weissach Package', desc: 'Carbon roof, anti-roll bars, magnesium wheels, +15 PS calibration', hpBoost: 15, price: 28000 },
];

type TabKey = 'exterior' | 'wheels' | 'interior' | 'performance';
const tabs: { key: TabKey; label: string }[] = [
    { key: 'exterior', label: 'Exterior' },
    { key: 'wheels', label: 'Wheels' },
    { key: 'interior', label: 'Interior' },
    { key: 'performance', label: 'Performance' },
];

/* ===== Option Card (for wheels, interior, performance) ===== */
function OptionCard({ selected, onClick, title, detail, price, accent, children }: {
    selected: boolean; onClick: () => void; title: string; detail: string; price: number; accent?: React.ReactNode; children?: React.ReactNode;
}) {
    return (
        <button
            className={`w-full p-6 text-left border transition-all duration-400 ${selected
                ? 'border-[var(--porsche-red)] bg-[var(--porsche-red)]/5'
                : 'border-[var(--porsche-steel)]/12 hover:border-[var(--porsche-steel)]/30'}`}
            onClick={onClick}>
            <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                        {accent}
                        <p className="text-[15px] font-bold text-[var(--porsche-white)]"
                            style={{ fontFamily: 'var(--font-display)' }}>{title}</p>
                    </div>
                    <p className="text-[12px] text-[var(--porsche-white)]/50 mt-2 leading-relaxed">{detail}</p>
                    {children}
                </div>
                <span className="text-[12px] text-[var(--porsche-silver)]/60 whitespace-nowrap pt-0.5">
                    {price > 0 ? `+€${price.toLocaleString()}` : 'Included'}
                </span>
            </div>
            {/* Selection indicator */}
            {selected && (
                <motion.div className="mt-3 h-[2px] bg-gradient-to-r from-[var(--porsche-red)] to-transparent"
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: 'left' }} />
            )}
        </button>
    );
}

/* ===== Model Selection Screen ===== */
function ModelSelection({ onSelect }: { onSelect: (index: number) => void }) {
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    return (
        <>
            <section ref={heroRef} className="pt-32 pb-10 bg-[var(--porsche-black)]">
                <div className="max-w-[1200px] mx-auto px-6 md:px-10">
                    <AnimatedText text="SELECT YOUR PORSCHE" as="h1"
                        className="text-[clamp(2rem,5.5vw,4.5rem)] font-black tracking-[-0.02em]" delay={0.4} />
                    <motion.p className="text-[14px] text-[var(--porsche-white)]/50 mt-4 max-w-md leading-[1.7]"
                        style={{ fontFamily: 'var(--font-body)' }}
                        initial={{ opacity: 0, y: 10 }} animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.8 }}>
                        Choose a model to begin your configuration.
                    </motion.p>
                </div>
            </section>

            <section className="pb-24 bg-[var(--porsche-black)]">
                <div className="max-w-[1200px] mx-auto px-6 md:px-10">
                    <div className="grid md:grid-cols-3 gap-5">
                        {models.map((model, i) => (
                            <motion.button key={model.id}
                                className="group relative text-left overflow-hidden bg-[var(--porsche-carbon)] border border-[var(--porsche-steel)]/8 hover:border-[var(--porsche-red)]/40 transition-colors duration-500"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                                onClick={() => onSelect(i)}
                            >
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <img src={model.image} alt={model.name}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--porsche-carbon)] via-transparent to-transparent" />
                                </div>
                                <div className="p-6 pt-3">
                                    <p className="text-[8px] tracking-[0.4em] text-[var(--porsche-red)] uppercase mb-2"
                                        style={{ fontFamily: 'var(--font-display)' }}>{model.tagline}</p>
                                    <h3 className="text-[18px] font-black text-[var(--porsche-white)] mb-4"
                                        style={{ fontFamily: 'var(--font-display)' }}>{model.name}</h3>
                                    <div className="flex gap-5 mb-5">
                                        {[
                                            { val: `${model.specs.hp}`, unit: 'PS' },
                                            { val: model.specs.accel, unit: 's' },
                                            { val: `${model.specs.topSpeed}`, unit: 'km/h' },
                                        ].map((s) => (
                                            <div key={s.unit}>
                                                <span className="text-[14px] font-bold text-[var(--porsche-white)]" style={{ fontFamily: 'var(--font-display)' }}>{s.val}</span>
                                                <span className="text-[9px] text-[var(--porsche-red)] font-bold ml-0.5">{s.unit}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[13px] font-bold text-[var(--porsche-white)]/70"
                                            style={{ fontFamily: 'var(--font-display)' }}>From €{model.basePrice.toLocaleString()}</span>
                                        <span className="text-[9px] tracking-[0.25em] text-[var(--porsche-red)] uppercase font-medium group-hover:tracking-[0.35em] transition-all duration-500"
                                            style={{ fontFamily: 'var(--font-display)' }}>Configure →</span>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

/* ===== Configuration Panel ===== */
function ConfigPanel({ modelIndex, onBack }: { modelIndex: number; onBack: () => void }) {
    const model = models[modelIndex];
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedWheel, setSelectedWheel] = useState(0);
    const [selectedInterior, setSelectedInterior] = useState(0);
    const [selectedPackage, setSelectedPackage] = useState(0);
    const [activeTab, setActiveTab] = useState<TabKey>('exterior');
    const navigate = useNavigate();
    const { playClick, playRevCue, playConfirm } = useAudio();

    const sketchfabRef = useRef(null);
    const isSketchfabInView = useInView(sketchfabRef, { once: true, margin: '-5%' });

    const totalPrice =
        model.basePrice +
        exteriorColors[selectedColor].price +
        wheelOptions[selectedWheel].price +
        interiorOptions[selectedInterior].price +
        performancePackages[selectedPackage].price;

    const handleReview = useCallback(() => {
        playConfirm();
        const config = {
            model: model.name,
            color: exteriorColors[selectedColor],
            wheel: wheelOptions[selectedWheel],
            interior: interiorOptions[selectedInterior],
            package: {
                name: performancePackages[selectedPackage].name,
                hp: model.specs.hp + performancePackages[selectedPackage].hpBoost,
                torque: 470,
                accel: model.specs.accel,
                topSpeed: model.specs.topSpeed,
                price: performancePackages[selectedPackage].price,
            },
            totalPrice,
            id: Date.now().toString(36),
        };
        localStorage.setItem('porsche-current-config', JSON.stringify(config));
        const saved = JSON.parse(localStorage.getItem('porsche-configs') || '[]');
        saved.push(config);
        localStorage.setItem('porsche-configs', JSON.stringify(saved));
        navigate('/buying');
    }, [model, selectedColor, selectedWheel, selectedInterior, selectedPackage, totalPrice, navigate, playConfirm]);

    return (
        <>
            {/* Header with back */}
            <section className="pt-28 pb-6 bg-[var(--porsche-black)]">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <motion.button onClick={onBack}
                        className="flex items-center gap-2 mb-5 group"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                        <span className="text-[var(--porsche-silver)]/50 group-hover:text-[var(--porsche-white)] transition-colors text-sm">←</span>
                        <span className="text-[10px] tracking-[0.2em] text-[var(--porsche-silver)]/50 group-hover:text-[var(--porsche-white)] transition-colors uppercase"
                            style={{ fontFamily: 'var(--font-display)' }}>All Models</span>
                    </motion.button>

                    <AnimatedText text={model.name} as="h1"
                        className="text-[clamp(1.8rem,5vw,4rem)] font-black tracking-[-0.02em]" delay={0.4} />
                </div>
            </section>

            {/* 3D Preview */}
            <section ref={sketchfabRef} className="bg-[var(--porsche-black)]">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <motion.div className="relative w-full aspect-[16/9] overflow-hidden glass-light"
                        initial={{ opacity: 0, y: 30 }} animate={isSketchfabInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                        <iframe
                            title={`${model.name} — 3D Preview`}
                            src={model.sketchfab}
                            className="w-full h-full border-0"
                            allow="autoplay; fullscreen; xr-spatial-tracking"
                            allowFullScreen
                        />
                    </motion.div>
                    <p className="mt-3 text-[9px] tracking-[0.2em] text-[var(--porsche-silver)]/40 uppercase text-center">
                        3D Vehicle Preview (Prototype) — Not an official Porsche CAD model
                    </p>
                </div>
            </section>

            {/* Config options */}
            <section className="py-16 bg-[var(--porsche-black)]">
                <div className="max-w-[800px] mx-auto px-6 md:px-12">
                    {/* Tabs */}
                    <div className="flex gap-1 mb-12 border-b border-[var(--porsche-steel)]/15 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button key={tab.key}
                                className={`px-6 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 relative whitespace-nowrap ${activeTab === tab.key ? 'text-[var(--porsche-white)]' : 'text-[var(--porsche-silver)]/60 hover:text-[var(--porsche-silver)]'}`}
                                style={{ fontFamily: 'var(--font-display)' }}
                                onClick={() => { setActiveTab(tab.key); playClick(); }}>
                                {tab.label}
                                {activeTab === tab.key && (
                                    <motion.div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--porsche-red)]"
                                        layoutId="config-tab" transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} />
                                )}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {/* ── Exterior ── */}
                        {activeTab === 'exterior' && (
                            <motion.div key="exterior"
                                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.3 }}>
                                <p className="text-[12px] tracking-[0.25em] text-[var(--porsche-white)]/45 uppercase mb-6"
                                    style={{ fontFamily: 'var(--font-display)' }}>Exterior Colour</p>
                                <div className="flex gap-3 flex-wrap">
                                    {exteriorColors.map((color, i) => (
                                        <button key={color.name}
                                            className={`relative w-14 h-14 rounded-sm border-2 transition-all duration-300 ${selectedColor === i
                                                ? 'border-[var(--porsche-red)] scale-110'
                                                : 'border-[var(--porsche-steel)]/15 hover:border-[var(--porsche-steel)]/40'}`}
                                            style={{ background: color.hex }}
                                            onClick={() => { setSelectedColor(i); playClick(); }}
                                            title={color.name}
                                        >
                                            {selectedColor === i && (
                                                <motion.div className="absolute inset-0 border-2 border-[var(--porsche-red)] rounded-sm"
                                                    layoutId="color-ring" transition={{ duration: 0.2 }} />
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-6 flex justify-between items-center">
                                    <span className="text-[14px] font-medium text-[var(--porsche-white)]">{exteriorColors[selectedColor].name}</span>
                                    <span className="text-[13px] text-[var(--porsche-silver)]/60">
                                        {exteriorColors[selectedColor].price > 0 ? `+€${exteriorColors[selectedColor].price.toLocaleString()}` : 'Included'}
                                    </span>
                                </div>
                            </motion.div>
                        )}

                        {/* ── Wheels ── */}
                        {activeTab === 'wheels' && (
                            <motion.div key="wheels"
                                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.3 }}>
                                <p className="text-[12px] tracking-[0.25em] text-[var(--porsche-white)]/45 uppercase mb-6"
                                    style={{ fontFamily: 'var(--font-display)' }}>Wheel Design</p>
                                <div className="flex flex-col gap-4">
                                    {wheelOptions.map((wheel, i) => (
                                        <OptionCard key={wheel.name}
                                            selected={selectedWheel === i}
                                            onClick={() => { setSelectedWheel(i); playClick(); }}
                                            title={wheel.name}
                                            detail={wheel.style}
                                            price={wheel.price}>
                                            <div className="flex gap-4 mt-2">
                                                <span className="text-[11px] text-[var(--porsche-white)]/35">Size: {wheel.size}</span>
                                                <span className="text-[11px] text-[var(--porsche-white)]/35">Weight: {wheel.weight}</span>
                                            </div>
                                        </OptionCard>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* ── Interior ── */}
                        {activeTab === 'interior' && (
                            <motion.div key="interior"
                                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.3 }}>
                                <p className="text-[12px] tracking-[0.25em] text-[var(--porsche-white)]/45 uppercase mb-6"
                                    style={{ fontFamily: 'var(--font-display)' }}>Interior Trim</p>
                                <div className="flex flex-col gap-4">
                                    {interiorOptions.map((interior, i) => (
                                        <OptionCard key={interior.name}
                                            selected={selectedInterior === i}
                                            onClick={() => { setSelectedInterior(i); playClick(); }}
                                            title={interior.name}
                                            detail={interior.material}
                                            price={interior.price}
                                            accent={
                                                <div className="w-5 h-5 rounded-full border border-[var(--porsche-steel)]/20 flex-shrink-0"
                                                    style={{ background: interior.hex }} />
                                            }>
                                            <span className="text-[11px] text-[var(--porsche-white)]/35 mt-1 block">Trim: {interior.accent}</span>
                                        </OptionCard>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* ── Performance ── */}
                        {activeTab === 'performance' && (
                            <motion.div key="performance"
                                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.3 }}>
                                <p className="text-[12px] tracking-[0.25em] text-[var(--porsche-white)]/45 uppercase mb-6"
                                    style={{ fontFamily: 'var(--font-display)' }}>Performance Packages</p>
                                <div className="flex flex-col gap-4">
                                    {performancePackages.map((pkg, i) => (
                                        <OptionCard key={pkg.name}
                                            selected={selectedPackage === i}
                                            onClick={() => { setSelectedPackage(i); i > 0 ? playRevCue() : playClick(); }}
                                            title={pkg.name}
                                            detail={pkg.desc}
                                            price={pkg.price}>
                                            {pkg.hpBoost > 0 && (
                                                <span className="inline-block mt-2 text-[11px] font-bold text-[var(--porsche-red)]">+{pkg.hpBoost} PS</span>
                                            )}
                                        </OptionCard>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── Summary bar ── */}
                    <div className="mt-14 pt-8 border-t border-[var(--porsche-steel)]/15">
                        {/* Selected options summary */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                            {[
                                { label: 'Colour', value: exteriorColors[selectedColor].name },
                                { label: 'Wheels', value: wheelOptions[selectedWheel].name },
                                { label: 'Interior', value: interiorOptions[selectedInterior].name },
                                { label: 'Package', value: performancePackages[selectedPackage].name },
                            ].map((item) => (
                                <div key={item.label}>
                                    <p className="text-[10px] tracking-[0.25em] text-[var(--porsche-white)]/35 uppercase mb-1.5"
                                        style={{ fontFamily: 'var(--font-display)' }}>{item.label}</p>
                                    <p className="text-[13px] text-[var(--porsche-white)]/80 truncate">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Price + CTA */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] tracking-[0.25em] text-[var(--porsche-silver)] uppercase">Total Configuration</p>
                                <p className="text-2xl font-black text-[var(--porsche-white)]"
                                    style={{ fontFamily: 'var(--font-display)' }}>€{totalPrice.toLocaleString()}</p>
                            </div>
                            <MagneticButton
                                className="group relative px-8 py-3.5 border border-[var(--porsche-red)] bg-transparent overflow-hidden"
                                onClick={handleReview} strength={0.15}>
                                <span className="absolute inset-0 bg-[var(--porsche-red)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                <span className="relative z-10 text-[10px] font-semibold tracking-[0.3em] text-[var(--porsche-white)] uppercase"
                                    style={{ fontFamily: 'var(--font-display)' }}>Begin Ownership</span>
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

/* ===== Main Configurator ===== */
export function Configurator() {
    const [selectedModel, setSelectedModel] = useState<number | null>(null);

    return (
        <main className="noise-overlay">
            <AnimatePresence mode="wait">
                {selectedModel === null ? (
                    <motion.div key="selection"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                        <ModelSelection onSelect={(i) => setSelectedModel(i)} />
                    </motion.div>
                ) : (
                    <motion.div key="config"
                        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                        <ConfigPanel modelIndex={selectedModel} onBack={() => setSelectedModel(null)} />
                    </motion.div>
                )}
            </AnimatePresence>
            <Footer />
        </main>
    );
}

export default Configurator;
