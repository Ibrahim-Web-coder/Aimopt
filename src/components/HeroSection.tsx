import { motion } from 'framer-motion';
import { Zap, ChevronRight, Shield, Target, Cpu } from 'lucide-react';

interface HeroSectionProps {
  onBuyNow: () => void;
}

const floatingStats = [
  { icon: <Target size={14} />, text: 'FPS Boosted', value: '+47%' },
  { icon: <Zap size={14} />, text: 'Input Lag', value: '-22ms' },
  { icon: <Shield size={14} />, text: 'Stability', value: '99.9%' },
];

export default function HeroSection({ onBuyNow }: HeroSectionProps) {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient grid-bg text-center"
    >
      {/* Background glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 animate-pulse-glow text-center"
        style={{ background: 'radial-gradient(circle, rgba(255,43,43,0.8) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 animate-pulse-glow text-center"
        style={{ background: 'radial-gradient(circle, rgba(255,43,43,0.6) 0%, transparent 70%)', animationDelay: '1.5s' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center text-center">
          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left text-center"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start mb-6 text-center">
              <span className="badge-glow font-inter text-xs font-semibold text-red-400 px-4 py-2 rounded-full tracking-widest uppercase flex items-center gap-2 text-center">
                <span
                  className="w-2 h-2 rounded-full bg-red-500 animate-pulse text-center"
                  style={{ boxShadow: '0 0 6px rgba(255,43,43,1)' }}
                />
                #1 Gaming Optimization Tool
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1 variants={itemVariants} className="font-orbitron font-black leading-none mb-6 text-center">
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white text-center">
                DOMINATE
              </span>
              <span
                className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl glow-text-red animate-flicker text-center"
                style={{ color: '#ff2b2b' }}
              >
                EVERY
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white text-center">
                MATCH
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="font-inter text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 text-center"
            >
              Boost FPS, improve precision, eliminate input lag — gain the competitive edge your opponents don't have.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,43,43,0.7)' }}
                whileTap={{ scale: 0.97 }}
                onClick={onBuyNow}
                className="btn-primary font-orbitron font-bold text-white px-8 py-4 rounded-xl tracking-widest uppercase text-lg flex items-center justify-center gap-2 group text-center"
              >
                <Zap size={16} fill="white" />
                Buy Now
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform text-center" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={onBuyNow}
                className="btn-secondary font-orbitron font-bold text-red-400 px-8 py-4 rounded-xl tracking-widest uppercase text-lg flex items-center justify-center gap-2 text-center"
              >
                Get Instant Access
              </motion.button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-lg text-gray-500 text-center"
            >
              {['✓ Instant Delivery', '✓ Safe & Trusted', '✓ 24/7 Support'].map((item) => (
                <span key={item} className="font-inter text-center">{item}</span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Gaming UI Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
            className="relative flex items-center justify-center text-center"
          >
            {/* Main mockup card */}
            <div className="relative animate-float text-center">
              {/* Outer glow */}
              <div
                className="absolute inset-0 rounded-3xl blur-xl opacity-40 text-center"
                style={{ background: 'radial-gradient(circle, rgba(255,43,43,0.6) 0%, transparent 70%)' }}
              />

              {/* Main panel */}
              <div
                className="relative rounded-3xl p-1 w-[340px] sm:w-[420px] text-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,43,43,0.3), rgba(255,43,43,0.05), rgba(255,43,43,0.2))',
                }}
              >
                <div
                  className="rounded-[22px] p-6 relative overflow-hidden text-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(15,15,15,0.98) 0%, rgba(10,10,10,0.99) 100%)',
                    border: '1px solid rgba(255,43,43,0.15)',
                  }}
                >
                  {/* Header bar */}
                  <div className="flex items-center justify-between mb-6 text-center">
                    <div className="flex items-center gap-2 text-center">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse text-center" style={{ boxShadow: '0 0 6px #ff2b2b' }} />
                      <span className="font-orbitron text-xs text-red-500 tracking-widest text-center">AIMOPT ACTIVE</span>
                    </div>
                    <div className="flex gap-1.5 text-center">
                      <div className="w-3 h-3 rounded-full bg-red-500/70 text-center" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70 text-center" />
                      <div className="w-3 h-3 rounded-full bg-green-500/70 text-center" />
                    </div>
                  </div>

                  {/* FPS Display */}
                  <div className="text-center mb-6 text-center">
                    <div className="font-orbitron text-7xl font-black text-center" style={{ color: '#ff2b2b', textShadow: '0 0 30px rgba(255,43,43,0.7)' }}>
                      247
                    </div>
                    <div className="font-inter text-gray-500 text-lg tracking-widest text-center">FPS — OPTIMIZED</div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                    {[
                      { label: 'Ping', value: '4ms', good: true },
                      { label: 'Input Lag', value: '1.2ms', good: true },
                      { label: 'Frame Time', value: '4.0ms', good: true },
                    ].map((m) => (
                      <div
                        key={m.label}
                        className="rounded-xl p-3 text-center text-center"
                        style={{ background: 'rgba(255,43,43,0.06)', border: '1px solid rgba(255,43,43,0.12)' }}
                      >
                        <div className="font-orbitron font-bold text-lg text-center" style={{ color: '#ff2b2b' }}>{m.value}</div>
                        <div className="font-inter text-gray-600 text-xs mt-0.5 text-center">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Progress bars */}
                  {[
                    { label: 'CPU Optimized', value: 94 },
                    { label: 'GPU Boosted', value: 89 },
                    { label: 'RAM Cleared', value: 97 },
                  ].map((bar) => (
                    <div key={bar.label} className="mb-3 text-center">
                      <div className="flex justify-between mb-1 text-center">
                        <span className="font-inter text-xs text-gray-500 text-center">{bar.label}</span>
                        <span className="font-orbitron text-xs text-red-500 text-center">{bar.value}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden text-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${bar.value}%` }}
                          transition={{ duration: 1.5, delay: 1.2, ease: 'easeOut' }}
                          className="h-full rounded-full text-center"
                          style={{
                            background: 'linear-gradient(90deg, #ff2b2b, #ff6666)',
                            boxShadow: '0 0 8px rgba(255,43,43,0.6)',
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  {/* Scan line effect */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-[22px] opacity-5 text-center"
                    style={{
                      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
                    }}
                  />
                </div>
              </div>

              {/* Floating stats */}
              {floatingStats.map((stat, i) => (
                <motion.div
                  key={stat.text}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + i * 0.2, duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
                  className="absolute glass-card rounded-xl px-3 py-2 flex items-center gap-2 text-center"
                  style={{
                    border: '1px solid rgba(255,43,43,0.2)',
                    boxShadow: '0 0 15px rgba(255,43,43,0.1)',
                    ...(i === 0 ? { top: -20, right: -20 } : i === 1 ? { bottom: 60, left: -30 } : { bottom: -20, right: 40 }),
                  }}
                >
                  <span style={{ color: '#ff2b2b' }}>{stat.icon}</span>
                  <div>
                    <div className="font-orbitron text-xs font-bold text-white text-center">{stat.value}</div>
                    <div className="font-inter text-gray-600 text-xs text-center">{stat.text}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Background circuit lines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-20 text-center">
              <Cpu size={400} className="absolute -bottom-20 -right-20 text-red-900 text-center" strokeWidth={0.3} />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-center"
        >
          <span className="font-inter text-xs text-gray-600 tracking-widest uppercase text-center">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-gray-700 flex items-start justify-center pt-1.5 text-center"
          >
            <div className="w-1 h-2 rounded-full bg-red-500 text-center" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
