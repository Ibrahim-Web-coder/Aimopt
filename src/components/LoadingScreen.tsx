import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const bootMessages = [
  { text: 'Initializing System...', delay: 0 },
  { text: 'Loading Modules...', delay: 0.6 },
  { text: 'Calibrating Performance Engine...', delay: 1.2 },
  { text: 'Optimizing FPS Configuration...', delay: 1.8 },
  { text: 'Initializing Performance...', delay: 2.2 },
  { text: 'System Ready.', delay: 2.6 },
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 600);
          }, 400);
          return 100;
        }
        return prev + 1.4;
      });
    }, 35);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center text-center"
          style={{ background: '#050505' }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 grid-bg opacity-30 text-center" />

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 text-center">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-500 text-center" />
          </div>
          <div className="absolute top-8 right-8 w-16 h-16 text-center">
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-500 text-center" />
          </div>
          <div className="absolute bottom-8 left-8 text-center">
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-red-500 text-center" />
          </div>
          <div className="absolute bottom-8 right-8 text-center">
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-500 text-center" />
          </div>

          {/* Glow orb */}
          <div
            className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse-glow text-center"
            style={{ background: 'radial-gradient(circle, rgba(255,43,43,0.6) 0%, transparent 70%)' }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
            className="mb-12 text-center text-center"
          >
            <h1
              className="font-orbitron text-5xl md:text-7xl font-black tracking-widest glow-text-red animate-flicker text-center"
              style={{ color: '#ff2b2b' }}
            >
              AIMOPT
            </h1>
            <p className="font-inter text-gray-500 text-lg tracking-[0.4em] mt-2 uppercase text-center">
              Performance · Precision · Dominance
            </p>
          </motion.div>

          {/* Boot messages */}
          <div className="mb-10 font-mono text-lg space-y-1.5 min-h-[140px] flex flex-col justify-end text-center">
            {bootMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: msg.delay, duration: 0.4 }}
                className="flex items-center gap-3 text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: msg.delay + 0.2, duration: 0.3 }}
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 text-center"
                  style={{ background: '#ff2b2b', boxShadow: '0 0 6px rgba(255,43,43,0.8)' }}
                />
                <span style={{ color: i === bootMessages.length - 1 ? '#ff2b2b' : '#6b7280' }}>
                  {msg.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Progress bar container */}
          <div className="w-64 md:w-80 text-center">
            <div className="flex justify-between items-center mb-2 text-center">
              <span className="font-mono text-xs text-gray-600 tracking-widest uppercase text-center">Loading</span>
              <span className="font-mono text-xs font-bold text-center" style={{ color: '#ff2b2b' }}>
                {Math.round(Math.min(progress, 100))}%
              </span>
            </div>
            <div
              className="w-full h-1 rounded-full overflow-hidden text-center"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,43,43,0.2)' }}
            >
              <motion.div
                className="h-full rounded-full loading-bar text-center"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* Bottom text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 font-mono text-xs text-gray-700 tracking-widest text-center"
          >
            AIMOPT v2.6.0 — ELITE GAMING PERFORMANCE
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
