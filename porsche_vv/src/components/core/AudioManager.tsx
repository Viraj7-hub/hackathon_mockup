import { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';

interface AudioContextType {
    isMuted: boolean;
    toggleMute: () => void;
    playClick: () => void;
    playRevCue: () => void;
    playConfirm: () => void;
    setEngineIdle: (active: boolean) => void;
}

const AudioCtx = createContext<AudioContextType>({
    isMuted: true,
    toggleMute: () => { },
    playClick: () => { },
    playRevCue: () => { },
    playConfirm: () => { },
    setEngineIdle: () => { },
});

export function useAudio() {
    return useContext(AudioCtx);
}

export function AudioManager({ children }: { children: React.ReactNode }) {
    const [isMuted, setIsMuted] = useState(true);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const idleOscRef = useRef<OscillatorNode | null>(null);
    const idleGainRef = useRef<GainNode | null>(null);

    const getAudioCtx = useCallback(() => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new AudioContext();
        }
        return audioCtxRef.current;
    }, []);

    const toggleMute = useCallback(() => {
        setIsMuted((prev) => {
            const next = !prev;
            if (!next) {
                getAudioCtx(); // Ensure context is created on unmute (user gesture)
            }
            return next;
        });
    }, [getAudioCtx]);

    const playTone = useCallback((freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.04) => {
        if (isMuted) return;
        try {
            const ctx = getAudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            gain.gain.value = volume;
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch { /* audio failures are non-critical */ }
    }, [isMuted, getAudioCtx]);

    const playClick = useCallback(() => {
        playTone(800, 0.05, 'square', 0.02);
    }, [playTone]);

    const playRevCue = useCallback(() => {
        if (isMuted) return;
        try {
            const ctx = getAudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.value = 120;
            osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.3);
            gain.gain.value = 0.04;
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.5);
        } catch { /* */ }
    }, [isMuted, getAudioCtx]);

    const playConfirm = useCallback(() => {
        playTone(600, 0.08, 'sine', 0.03);
        setTimeout(() => playTone(900, 0.1, 'sine', 0.03), 80);
    }, [playTone]);

    const setEngineIdle = useCallback((active: boolean) => {
        if (active && !isMuted && !idleOscRef.current) {
            try {
                const ctx = getAudioCtx();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.value = 55;
                gain.gain.value = 0.015;
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                idleOscRef.current = osc;
                idleGainRef.current = gain;
            } catch { /* */ }
        } else if (!active && idleOscRef.current) {
            try {
                idleOscRef.current.stop();
            } catch { /* */ }
            idleOscRef.current = null;
            idleGainRef.current = null;
        }
    }, [isMuted, getAudioCtx]);

    useEffect(() => {
        return () => {
            if (idleOscRef.current) {
                try { idleOscRef.current.stop(); } catch { /* */ }
            }
            if (audioCtxRef.current) {
                try { audioCtxRef.current.close(); } catch { /* */ }
            }
        };
    }, []);

    // Stop idle on mute
    useEffect(() => {
        if (isMuted && idleOscRef.current) {
            try { idleOscRef.current.stop(); } catch { /* */ }
            idleOscRef.current = null;
            idleGainRef.current = null;
        }
    }, [isMuted]);

    return (
        <AudioCtx.Provider value={{ isMuted, toggleMute, playClick, playRevCue, playConfirm, setEngineIdle }}>
            {children}
            {/* Mute/Unmute button — fixed bottom right */}
            <motion.button
                className="fixed bottom-6 right-6 z-[9995] w-10 h-10 flex items-center justify-center glass-light hover:border-[var(--porsche-red)]/30 transition-all duration-300 rounded-full"
                onClick={toggleMute}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4, duration: 0.6 }}
                data-cursor="pointer"
                title={isMuted ? 'Enable sound' : 'Mute sound'}
            >
                {isMuted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--porsche-silver)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--porsche-red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                )}
            </motion.button>
        </AudioCtx.Provider>
    );
}

export default AudioManager;
